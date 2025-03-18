from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.usuario import UserCreate, UserResponse
from app.services.user_services import create_user, get_users
from typing import List

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def criar_novo_usuario(user: UserCreate, db: AsyncSession = Depends(get_db)):
    return await create_user(db, user)

@router.get("/listar_usuarios/", response_model=List[UserResponse])
async def listar_todos_usuarios(db: AsyncSession = Depends(get_db)):
    return await get_users(db)