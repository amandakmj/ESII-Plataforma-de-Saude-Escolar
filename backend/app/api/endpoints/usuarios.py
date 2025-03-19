from fastapi import APIRouter, HTTPException, Depends
from app.schemas.usuario import UserCreate
from app.services.user_services import criar_usuario

router = APIRouter()

@router.post("/create")
def criar_novo_usuario(user: UserCreate):
    return criar_usuario(user)