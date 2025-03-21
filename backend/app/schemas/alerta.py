from pydantic import BaseModel

class AlertBase(BaseModel):
    mensagem: str
    data_criacao: date
    responsavel_id: int

class AlertCreate(AlertBase):
    pass

class AlertReponse(AlertBase):
    id: int

    class Config:
        orm_mode = True