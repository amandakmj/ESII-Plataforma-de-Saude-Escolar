from pydantic import BaseModel
from typing import Optional

class TurmaBase(BaseModel):
    codigo: str
    serie: Optional[str] = None

class TurmaCreate(TurmaBase):
    pass

class TurmaUpdate(TurmaBase):
    pass

class TurmaResponse(TurmaBase):
    id: int

    class Config:
        from_attributes = True
