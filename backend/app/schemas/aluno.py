from pydantic import BaseModel
from typing import Optional
from datetime import date

class AlunoBase(BaseModel):
    nome: str
    altura: Optional[str] = None
    peso: Optional[str] = None
    endereco: Optional[str] = None
    matricula: str
    data_nascimento: date
    serie_atual: Optional[str] = None  
    responsavel_id: int  # ID do usuário do responsável, podendo ser nulo
    termo_medicamento_escola: Optional[int] = None  # 0 ou 1 (valor booleano representado como smallint)
    termo_atendimento_medico: Optional[int] = None  # 0 ou 1 (valor booleano representado como smallint)
    termo_compartilhamento_dados: Optional[int] = None  # 0 ou 1 (valor booleano representado como smallint)

    class Config:
        orm_mode = True  # Permite que a resposta seja convertida para um dict

class AlunoCreate(AlunoBase):
    usuario_id: int  # Referência ao id do usuário, obrigatório ao criar
    
class AlunoUpdate(BaseModel):
    id: Optional[int] = None 
    nome: Optional[str] = None
    altura: Optional[str] = None
    peso: Optional[str] = None
    endereco: Optional[str] = None
    matricula: Optional[str] = None
    data_nascimento: Optional[date] = None
    serie_atual: Optional[int] = None
    responsavel_id: Optional[int] = None
    termo_medicamento_escola: Optional[int] = None
    termo_atendimento_medico: Optional[int] = None
    termo_compartilhamento_dados: Optional[int] = None

class AlunoResponse(AlunoBase):
    int: int
