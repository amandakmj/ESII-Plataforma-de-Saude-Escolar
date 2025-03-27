from sqlalchemy import Column, Integer, String
from app.core.database import Base

class Turma(Base):
    __tablename__ = "turma"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String(10), nullable=False, unique=True)
    serie = Column(String(100))
