from fastapi import APIRouter, Depends
from app.services.class_services import create_class, get_class, get_class_by_id, update_class_id, delete_class_id
from app.core.security import get_current_user

router = APIRouter(prefix="/turmas")


"""
Endpointss para as rotas de acesso as turmas
@JvReis
"""
@router.post("/", dependencies=[Depends(get_current_user)])
def criar_turma(codigo: str, serie: str):
    return create_class(codigo, serie)

@router.get("/", dependencies=[Depends(get_current_user)])
def pegar_turmas():
    return get_class()

@router.get("/{turma_id}", dependencies=[Depends(get_current_user)])
def pegar_turma_id(turma_id: int):
    return get_class_by_id(turma_id)

@router.put("/{turma_id}", dependencies=[Depends(get_current_user)])
def atualizar_turma_id(turma_id: int, codigo: str, serie: str):
    return update_class_id(turma_id, codigo, serie)

@router.delete("/{turma_id}",dependencies=[Depends(get_current_user)])
def deletar_turma_id(turma_id: int):
    return delete_class_id(turma_id)
