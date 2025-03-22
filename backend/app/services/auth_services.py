from fastapi import HTTPException
from fastapi import JSONResponses
from fastapi.security import OAuth2PasswordBearer
from app.schemas.auth import TokenData
from app.utils.database import connect_db
from app.core.security import verificar_token_jwt, check_password
import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

"""
Autentica usuário no sistema
@AnotherOne07
"""
def authenticate_user(email: str, segredo: str):
    conn = connect_db()

    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        query = "SELECT * FROM usuario WHERE email = %s"
        cur.execute(query, email)
        
        usuario = cur.fetchone()
        
        if not usuario  or not check_password(segredo, usuario[3]):
            return None
        return usuario
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao autenticar:{e}")
    finally:
        cur.close()
        conn.close()

