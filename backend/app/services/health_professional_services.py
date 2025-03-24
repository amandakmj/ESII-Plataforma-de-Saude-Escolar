from fastapi import HTTPException
from app.utils.database import connect_db  

"""
Adiciona as especialidades aos usuários do tipo "health_professional"
@JvReis
"""
def update_especialidade(usuario_id: int, especialidade: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        # Verifica se o profissional de saúde já existe na tabela profissional_saude
        cur.execute("SELECT id FROM profissional_saude WHERE usuario_id = %s", (usuario_id,))
        existing_professional = cur.fetchone()

        if existing_professional:
            # Se já existir, atualiza a especialidade
            cur.execute("UPDATE profissional_saude SET especialidade = %s WHERE usuario_id = %s RETURNING id, especialidade;",
                        (especialidade, usuario_id))
        else:
            # Se não existir, insere o novo registro
            cur.execute("INSERT INTO profissional_saude (usuario_id, especialidade) VALUES (%s, %s) RETURNING id, especialidade;",
                        (usuario_id, especialidade))

        # Recupera o resultado
        updated_specialty = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if updated_specialty:
            return {"usuario_id": usuario_id, "especialidade": updated_specialty[1]}
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado ou não é um profissional de saúde")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar especialidade: {e}")
