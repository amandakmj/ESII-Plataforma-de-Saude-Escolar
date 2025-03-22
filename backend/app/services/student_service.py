from fastapi import HTTPException
from app.utils.database import connect_db
from datetime import date

"""
Função de criação do aluno
@JvReis
"""
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

"""
Função para pegar/listar os dados do estudanto de acordo com o id
@JvReis
"""
def get_aluno_id(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, matricula, data_nascimento FROM aluno WHERE id = %s;", (aluno_id,))
        aluno = cur.fetchone()
        cur.close()
        conn.close()

        if aluno:
            return {"id": aluno[0], "matricula": aluno[1], "data_nascimento": aluno[2]}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar aluno: {e}")

"""
Função para atualização do registro do aluno
@JvReis
"""
def update_aluno_id(aluno_id: int, matricula: str = None, data_nascimento: date = None):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        updates = []
        valores = []
        if matricula:
            updates.append("matricula = %s")
            valores.append(matricula)
        if data_nascimento:
            updates.append("data_nascimento = %s")
            valores.append(data_nascimento)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(aluno_id)
        query = f"UPDATE aluno SET {', '.join(updates)} WHERE id = %s RETURNING id, matricula, data_nascimento;"
        cur.execute(query, tuple(valores))
        aluno_atualizado = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if aluno_atualizado:
            return {"id": aluno_atualizado[0], "matricula": aluno_atualizado[1], "data_nascimento": aluno_atualizado[2]}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar aluno: {e}")

"""
Função para deletar o registro do aluno
@JvReis
"""
def delete_aluno_id(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM aluno WHERE id = %s RETURNING id;", (aluno_id,))
        aluno_deletado = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if aluno_deletado:
            return {"message": "Aluno removido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir aluno: {e}")
