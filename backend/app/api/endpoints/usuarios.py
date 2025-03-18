from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.usuario import UserCreate, UserResponse
from app.services.user_services import criar_usuario, listar_usuarios
from typing import List

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def criar_novo_usuario(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await criar_usuario(db, user)

@router.get("/", response_model=List[UserResponse])
async def listar_usuarios(db: AsyncSession = Depends(get_db)):
    return await listar_usuarios(db)