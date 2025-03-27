from fastapi import APIRouter, Depends
from app.schemas.responsavel import ResponsavelBase, ResponsavelCreate, ResponsavelResponse, ResponsavelUpdate
from app.services.guardian_services import create_responsavel, get_guardian_id, update_guardian
from app.core.security import get_current_user


router = APIRouter()

"""
Endpoint destinado a criar um novo registro de responsável
@AnotherOne07
"""
@router.post("/create", dependencies=[Depends(get_current_user)])
def criar_novo_responsavel(responsavel: ResponsavelCreate):
    return create_responsavel(responsavel)

"""
Endpoint destinado a retornar um responsavel a partir de um id
@AnotherOne07
"""
@router.get("/get_guardian/{reponsavel_id}", dependencies=[Depends(get_current_user)])
def get_responsavel_id(responsavel_id: int):
    return get_guardian_id(responsavel_id)

"""
Endpoint destinado a atualizar um responsavel a partir de um id
@AnotherOne07
"""
@router.put("/update_guardian/{responsavel_id}", dependencies=[Depends(get_current_user)])
def atualizar_responsavel(responsavel_id , responsavel: ResponsavelUpdate):
    return update_guardian(responsavel_id, responsavel)