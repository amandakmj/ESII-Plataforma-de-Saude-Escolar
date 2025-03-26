from fastapi import APIRouter, Depends
from app.schemas.escola import SchoolBase, SchoolCreate, SchoolUpdate
from app.services.school_services import create_school, get_school, get_school_id, update_school
from app.core.security import get_current_user

router = APIRouter()

"""
Endpoint destinado a criação de uma escola
@AnotherOne07
"""
@router.post("create", dependencies=[Depends(get_current_user)])
def criar_nova_escola(school: SchoolCreate):
    return create_school(school)

"""
Endpoint para listar todas as escolas
@AnotherOne07
"""
@router.get("/", dependencies=[Depends(get_current_user)])
def listar_escolas():
    return get_school()

"""
Endpoint para obter detalhes de uma escola pelo ID
@AnotherOne07
"""
@router.get("/get/{escola_id}", dependencies=[Depends(get_current_user)])
def pegar_escola(escola_id: int):
    return get_school_id(escola_id)

"""
Endpoint para atualizar os dados de uma escola
"""
@router.post("/update", dependencies=[Depends(get_current_user)])
def atualizar_escola(escola: SchoolUpdate):
    return update_school(escola)