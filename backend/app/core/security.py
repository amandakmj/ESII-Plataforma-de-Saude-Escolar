from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Depends
from app.utils.database import connect_db
import jwt
from fastapi.security import OAuth2PasswordBearer

# Configuração do algoritmo de criptografia das senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/site/login")

SECRET_KEY = "chave"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

"""
Função para encriptar a senha
@JvReis
"""
def hash_senha(senha: str):
    return pwd_context.hash(senha)

""""
Função para verificar se a senha digitada está correta
@AnotherOne07
"""
def check_password(password: str, hashed_password: str)->bool:
    return pwd_context.verify(password, hashed_password)

"""
Função para criar um JWT
@AnotherOne07   
"""
def create_jwt_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

"""
Função para verificar se token é válido
@AnotherOne07
"""
def verify_token_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro durante verificação de token {e}")
    
"""
Função para obter o usuário atual
@AnotherOne07
"""
def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token_jwt(token)
    usuario_id = payload.get("sub")

    if usuario_id is None:
        raise HTTPException(status_code=401, detail="Usuário não autenticado")
    
    conn = connect_db()
    
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados")
    
    try:
        cur = conn.cursor()
        query = "SELECT id, nome, email, tipo_usuario FROM usuario WHERE id = %s"
        cur.execute(query, (usuario_id,))
        usuario = cur.fetchone()

        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao identificar usuário: {e}")
    finally:
        cur.close()
        conn.close()
