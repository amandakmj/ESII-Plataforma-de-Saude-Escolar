from app.utils.database import connect_db
from fastapi import HTTPException
from typing import List

"""
Cria uma turma
@JvReis
"""
def create_class(codigo: str, serie: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO turma (codigo, serie) VALUES (%s, %s) RETURNING id", (codigo, serie))
        turma_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"id": turma_id, "codigo": codigo, "serie": serie}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao criar turma: {e}")

"""
Pega as turmas
@JvReis
"""
def get_class():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, codigo, serie FROM turma")
        turmas = cur.fetchall()
        cur.close()
        conn.close()

        return [{"id": t[0], "codigo": t[1], "serie": t[2]} for t in turmas]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter turmas: {e}")

"""
Pega uma turma pelo id
@JvReis
"""
def get_class_by_id(turma_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, codigo, serie FROM turma WHERE id = %s", (turma_id,))
        turma = cur.fetchone()
        cur.close()
        conn.close()

        if not turma:
            raise HTTPException(status_code=404, detail="Turma não encontrada")

        return {"id": turma[0], "codigo": turma[1], "serie": turma[2]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter turma: {e}")

"""
Atualiza uma turma
@JvReis
"""
def update_class_id(turma_id: int, codigo: str, serie: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("UPDATE turma SET codigo = %s, serie = %s WHERE id = %s RETURNING id", (codigo, serie, turma_id))
        updated_id = cur.fetchone()

        if not updated_id:
            raise HTTPException(status_code=404, detail="Turma não encontrada")

        conn.commit()
        cur.close()
        conn.close()
        return {"id": turma_id, "codigo": codigo, "serie": serie}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar turma: {e}")

"""
Deleta uma turma
@JvReis
"""
def delete_class_id(turma_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM turma WHERE id = %s RETURNING id", (turma_id,))
        deleted_id = cur.fetchone()

        if not deleted_id:
            raise HTTPException(status_code=404, detail="Turma não encontrada")

        conn.commit()
        cur.close()
        conn.close()
        return {"message": "Turma deletada com sucesso"}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao deletar turma: {e}")
