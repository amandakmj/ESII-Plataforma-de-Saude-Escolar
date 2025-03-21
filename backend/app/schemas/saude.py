from pydantic import BaseModel
from typing import Optional


# Classe base para os dados de saúde (todos os campos obrigatórios)
class SaudeBase(BaseModel):
    altura: float
    peso: float
    alergias: str
    atividade_fisica: str
    doencas_cronicas: str
    medicamentos_continuos: str
    cirurgias_internacoes: str
    vacinas: str
    deficiencias_necessidades: str
    plano_saude: str


# Schema para criação de um registro de saúde
class SaudeCreate(SaudeBase):
    aluno_id: int
    matricula: str


# Schema para atualização de dados de saúde (todos os campos opcionais)
class SaudeUpdate(BaseModel):
    altura: Optional[float] = None
    peso: Optional[float] = None
    alergias: Optional[str] = None
    atividade_fisica: Optional[str] = None
    doencas_cronicas: Optional[str] = None
    medicamentos_continuos: Optional[str] = None
    cirurgias_internacoes: Optional[str] = None
    vacinas: Optional[str] = None
    deficiencias_necessidades: Optional[str] = None
    plano_saude: Optional[str] = None


# Schema de resposta ao retornar um registro de saúde
class SaudeResponse(SaudeBase):
    id: int
    matricula: str
    imc: float  

    class Config:
        orm_mode = True  # Permite compatibilidade com SQLAlchemy
