from app.utils.database import connect_db
from fastapi import HTTPException
from typing import List


"""
Adiciona o estudante a uma turma
@JvReis
"""
def add_student_to_class(aluno_id: int, turma_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        # Verifica se a relação já existe
        cur.execute("SELECT 1 FROM aluno_turma WHERE aluno_id = %s AND turma_id = %s", (aluno_id, turma_id))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Aluno já está nesta turma")

        # Adiciona o aluno à turma
        cur.execute("INSERT INTO aluno_turma (aluno_id, turma_id) VALUES (%s, %s)", (aluno_id, turma_id))
        conn.commit()

        cur.close()
        conn.close()
        return {"message": "Aluno adicionado à turma com sucesso"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar aluno à turma: {e}")

"""
Deleta o estudante de uma turma
@JvReis
"""
def delete_student_from_class(aluno_id: int, turma_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        # Verifica se o aluno está na turma
        cur.execute("SELECT 1 FROM aluno_turma WHERE aluno_id = %s AND turma_id = %s", (aluno_id, turma_id))
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail="Aluno não encontrado nesta turma")

        # Remove o aluno da turma
        cur.execute("DELETE FROM aluno_turma WHERE aluno_id = %s AND turma_id = %s", (aluno_id, turma_id))
        conn.commit()

        cur.close()
        conn.close()
        return {"message": "Aluno removido da turma com sucesso"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao remover aluno da turma: {e}")

"""
Lista um  estudante de uma turma
@JvReis
"""
def list_students_by_class(turma_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT a.id, a.matricula, a.data_nascimento
            FROM aluno a
            JOIN aluno_turma at ON a.id = at.aluno_id
            WHERE at.turma_id = %s
        """, (turma_id,))
        
        alunos = cur.fetchall()
        cur.close()
        conn.close()

        return [{"id": a[0], "matricula": a[1], "data_nascimento": a[2]} for a in alunos]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao listar alunos da turma: {e}")

