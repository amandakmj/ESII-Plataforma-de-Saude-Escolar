from fastapi import APIRouter
from app.services.add_student_in_class_services import (
    add_student_to_class, delete_student_from_class, list_students_by_class
)

router = APIRouter(prefix="/turmas")

@router.post("/{turma_id}/alunos/{aluno_id}")
def adicionar_aluno(turma_id: int, aluno_id: int):
    return add_student_to_class(aluno_id, turma_id)

@router.delete("/{turma_id}/alunos/{aluno_id}")
def remover_aluno(turma_id: int, aluno_id: int):
    return delete_student_from_class(aluno_id, turma_id)

@router.get("/{turma_id}/alunos")
def listar_alunos(turma_id: int):
    return list_students_by_class(turma_id)
