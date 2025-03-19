from fastapi import HTTPException
from app.utils.database import connect_db
from datetime import date


def create_aluno(usuario_id: int, matricula: str, data_nascimento: date):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()
        # Verificar se o usuário existe e se é um responsável (parent)
        cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
        tipo_usuario = cur.fetchone()

        if not tipo_usuario or tipo_usuario[0] != 'parent':
            cur.close()
            conn.close()
            raise HTTPException(status_code=400, detail="O usuário não é um responsável")

        # Inserir aluno na tabela aluno
        cur.execute("""
            INSERT INTO aluno (matricula, data_nascimento)
            VALUES (%s, %s) RETURNING id;
        """, (matricula, data_nascimento))

        aluno_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()
        return {"message": "Aluno adicionado com sucesso!", "aluno_id": aluno_id}

    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar aluno: {e}")
