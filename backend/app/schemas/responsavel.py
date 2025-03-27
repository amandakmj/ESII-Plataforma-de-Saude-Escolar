from pydantic import BaseModel, constr
from typing import Optional

class ResponsavelBase(BaseModel):
    usuario_id: int
    telefone: Optional[constr(max_length=20)] = None
    parentesco: Optional[constr(max_length=50)] = None

class ResponsavelCreate(ResponsavelBase):
    pass

class ResponsavelUpdate(BaseModel):
    telefone: Optional[constr(max_length=20)] = None
    parentesco: Optional[constr(max_length=50)] = None

class ResponsavelResponse(ResponsavelBase):
    id: int

    class Config:
        from_attributes = True
