from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base

class ProfissionalSaude(Base):
    __tablename__ = "profissional_saude"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False, unique=True)
    especialidade = Column(String(100), nullable=False)

    # Relacionamento com a tabela usuario
    usuario = relationship("Usuario", back_populates="profissional_saude")