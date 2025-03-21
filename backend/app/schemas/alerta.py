from pydantic import BaseModel
from datetime import date

class AlertBase(BaseModel):
    mensagem: str
    responsavel_id: int
    visualizado: int
    remetente: int

class AlertCreate(AlertBase):
    pass

class AlertReponse(AlertBase):
    id: int

    class Config:
        orm_mode = True