from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
import jwt

# Configuração do algoritmo de criptografia das senhas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

def verificar_token_jwt(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception as e:
        return None