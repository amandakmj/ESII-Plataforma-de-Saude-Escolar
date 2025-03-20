from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Saude(Base):
    __tablename__ = "saude"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    altura = Column(Float, nullable=False)
    peso = Column(Float, nullable=False)
    imc = Column(Float, nullable=False)
    alergias = Column(String(300), nullable=True)
    atividade_fisica = Column(String(200), nullable=True)
    doencas_cronicas = Column(String(100), nullable=True)
    medicamentos_continuos = Column(String(100), nullable=True)
    cirurgias_internacoes = Column(String(100), nullable=True)
    vacinas = Column(String(200), nullable=True)
    deficiencias_necessidades = Column(String(200), nullable=True)
    plano_saude = Column(String(100), nullable=True)

    aluno_id = Column(Integer, ForeignKey("aluno.id"), nullable=False)
    matricula = Column(String(15), ForeignKey("aluno.matricula"), nullable=True)

    # Relacionamento com Aluno (One-to-One)
    aluno = relationship("Aluno", back_populates="saude")
