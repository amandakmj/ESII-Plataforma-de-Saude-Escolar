from fastapi import APIRouter, HTTPException, Depends
from app.schemas.aluno import AlunoCreate, AlunoUpdate, AlunoBase
from app.services.student_service import create_aluno, get_aluno_id, update_aluno_id, delete_aluno_id
from app.core.security import get_current_user


router = APIRouter()

"""
Endpoint para criação do aluno
@JvReis
"""
@router.post("/create_alunos", dependencies=[Depends(get_current_user)])
def criar_novo_aluno(aluno: AlunoCreate):
    return create_aluno(aluno)

"""
Endpoint para retornar os dados de um aluno
@JvReis
"""
@router.get("/get_aluno/{aluno_id}", dependencies=[Depends(get_current_user)])
def pegar_aluno_id(aluno_id):
    return get_aluno_id(aluno_id)

"""
Endpoint para atualizar os dados de um aluno
@JvReis
"""
@router.put("/update_aluno/", dependencies=[Depends(get_current_user)])
def atualizar_aluno_id(aluno: AlunoUpdate):
    return update_aluno_id(aluno)

"""
Endpoint para deletar os dados de um aluno
@JvReis
"""
@router.delete("/delete_aluno/{aluno_id}", dependencies=[Depends(get_current_user)])
def remover_aluno_id(aluno_id):
    return delete_aluno_id(aluno_id)

