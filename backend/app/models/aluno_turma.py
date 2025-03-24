from sqlalchemy import Column, Integer, ForeignKey
from app.models.base import Base

class TurmaAluno(Base):
    __tablename__ = "turma_aluno"

    id = Column(Integer, primary_key=True, index=True)
    turma_id = Column(Integer, ForeignKey("turma.id", ondelete="CASCADE"), nullable=False)
    aluno_id = Column(Integer, ForeignKey("aluno.id", ondelete="CASCADE"), nullable=False)
