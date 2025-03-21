from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class AlunoBase(BaseModel):
    matricula: str
    data_nascimento: date

class AlunoCreate(AlunoBase):
    usuario_id: int  # referência ao id do usuário (caso haja um usuário relacionado)
    
class AlunoUpdate(BaseModel):
    matricula: Optional[str] = None
    data_nascimento: Optional[date] = None

class AlunoResponse(AlunoBase):
    id: int

    class Config:
        orm_mode = True  # Permite retornar modelos SQLAlchemy como dict
