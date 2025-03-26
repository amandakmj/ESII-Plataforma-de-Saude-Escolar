from pydantic import BaseModel
from typing import Optional

class SchoolBase(BaseModel):
    nome: str
    endereco: str
    cnpj: str
    telefone: str

class SchoolCreate(SchoolBase):
    pass

class SchoolUpdate(BaseModel):
    id: int
    nome: Optional[str] = None
    endereco: Optional[str] = None
    cnpj: Optional[str] = None
    telefone: Optional[str] = None

class EscolaResponse(SchoolBase):
    id: int

    class Config:
        orm_mode = True  # Permite retornar modelos SQLAlchemy como dict
