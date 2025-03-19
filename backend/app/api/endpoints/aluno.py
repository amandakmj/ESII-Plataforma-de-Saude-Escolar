from fastapi import APIRouter, HTTPException, Depends
from app.schemas.aluno import AlunoCreate, AlunoUpdate
from app.services.student_service import create_aluno


router = APIRouter()

@router.post("/create_alunos")
def criar_novo_aluno(aluno: AlunoCreate):
    return create_aluno(
        usuario_id=aluno.usuario_id,
        matricula=aluno.matricula,
        data_nascimento=aluno.data_nascimento
    )