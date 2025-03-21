# schemas/profissional_saude.py

from pydantic import BaseModel

class ProfissionalSaudeBase(BaseModel):
    especialidade: str

    class Config:
        orm_mode = True  # Isso permite que o Pydantic trabalhe com objetos SQLAlchemy diretamente

class ProfissionalSaudeCreate(ProfissionalSaudeBase):
    pass  # Se houver algum outro campo específico para criação, adicione aqui

class ProfissionalSaudeResponse(BaseModel):
    usuario_id: int
    especialidade: str

    class Config:
        orm_mode = True

