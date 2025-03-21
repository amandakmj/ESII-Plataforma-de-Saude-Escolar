from fastapi import APIRouter, HTTPException, Depends
from app.schemas.aluno import AlunoCreate, AlunoUpdate, AlunoBase
from app.services.student_service import create_aluno, get_aluno_id, update_aluno_id, delete_aluno_id


router = APIRouter()

#Rota para criação do aluno
@router.post("/create_alunos")
def criar_novo_aluno(aluno: AlunoCreate):
    return create_aluno(
        usuario_id=aluno.usuario_id,
        matricula=aluno.matricula,
        data_nascimento=aluno.data_nascimento
    )

#Rota para exibição de determinado aluno
@router.get("/get_aluno/{aluno_id}")
def pegar_aluno_id(aluno_id):
    return get_aluno_id(aluno_id)

#Rota para update de um determinado aluno
@router.put("/update_aluno/{aluno_id}")
def atualizar_aluno_id(aluno_id, aluno: AlunoBase):
    return update_aluno_id

@router.delete("/delete_aluno/{aluno_id}")
def remover_aluno_id(aluno_id):
    return delete_aluno_id(aluno_id)

