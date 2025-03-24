from fastapi import APIRouter
from app.services.class_services import create_class, get_class, get_class_by_id, update_class_id, delete_class_id

router = APIRouter(prefix="/turmas")

@router.post("/")
def criar_turma(codigo: str, serie: str):
    return create_class(codigo, serie)

@router.get("/")
def pegar_turmas():
    return get_class()

@router.get("/{turma_id}")
def pegar_turma_id(turma_id: int):
    return get_class_by_id(turma_id)

@router.put("/{turma_id}")
def atualizar_turma_id(turma_id: int, codigo: str, serie: str):
    return update_class_id(turma_id, codigo, serie)

@router.delete("/{turma_id}")
def deletar_turma_id(turma_id: int):
    return delete_class_id(turma_id)
