from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.services.auth_services import authenticate_user, generate_token_for_user
from app.schemas.auth import Token
from app.utils.database import connect_db

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    usuario = authenticate_user(form_data.username, form_data.password)
    if not usuario: 
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    
    token = generate_token_for_user(usuario)
    return {"access_token": token, "token_type": "bearer"}