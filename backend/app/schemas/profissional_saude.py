from pydantic import BaseModel

class ProfissionalSaudeBase(BaseModel):
    especialidade: str

    class Config:
        orm_mode = True  

class ProfissionalSaudeCreate(ProfissionalSaudeBase):
    pass  

class ProfissionalSaudeResponse(BaseModel):
    usuario_id: int
    especialidade: str

    class Config:
        orm_mode = True

