from sqlalchemy import Column, Date, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base
from app.models.usuario import Usuario
from app.schemas.turma import TurmaSchema

class Aluno(Base):
    __tablename__ = "aluno"

    id = Column(Integer, primary_key=True, index=True)
    matricula = Column(String(15), nullable=False, unique=True)
    data_nascimento = Column(Date, nullable=False)

    saude = relationship("Saude", back_populates="aluno", uselist=False)
