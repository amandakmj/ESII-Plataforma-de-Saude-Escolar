from sqlalchemy import Column, Integer, String, Enum
from app.models.base import Base
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship #jv add

class UserType(PyEnum):
    MANAGER = "manager"
    INSTRUCTOR = "instructor"
    PARENT = "parent"
    HEALTH_PROFESSIONAL = "health_professional"

class AcessLevel(PyEnum):
    READER = "reader"
    ADMIN = "admin"
    EDTIRO = "editor"

class Usuario(Base):
    __tablename__ = "usuario"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True, nullable=False)
    email = Column(String, index=True, nullable=False, unique=True)
    segredo = Column(String, index=True, nullable=False)
    tipo_usuario = Column(Enum(UserType), nullable=False)

    alunos = relationship("Aluno", back_populates="usuario") #jv add
   