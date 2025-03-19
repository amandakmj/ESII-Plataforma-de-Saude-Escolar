from pydantic import BaseModel, EmailStr
from enum import Enum
from app.models.usuario import UserType

class UserType(str, Enum):
    MANAGER = "manager"
    INSTRUCTOR = "instructor"
    PARENT = "parent"
    HEALTH_PROFESSIONAL = "health_professional"

class UserBase(BaseModel):
    nome: str
    email: EmailStr
    tipo_usuario: UserType

class UserCreate(UserBase):
    segredo: str # a senha será aplicada somente na criação

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True # Permite retornar modelos SQLAlchemy como dict