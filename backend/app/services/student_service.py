from fastapi import HTTPException
from app.utils.database import connect_db
from datetime import date
from app.schemas.aluno import AlunoBase, AlunoCreate, AlunoResponse, AlunoUpdate

"""
Função de criação do aluno
@JvReis
"""
def create_aluno(aluno: AlunoCreate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()
        # Verificar se o usuário existe e se é um responsável (parent)
        cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (aluno.usuario_id,))
        tipo_usuario = cur.fetchone()

        if not tipo_usuario or tipo_usuario[0] != 'parent':
            cur.close()
            raise HTTPException(status_code=400, detail="O usuário não é um responsável")

        # Inserir aluno na tabela aluno
        query = """
            INSERT INTO aluno (nome, altura, peso, endereco, matricula, data_nascimento, 
                               serie_atual, responsavel_id, termo_medicamento_escola, 
                               termo_atendimento_medico, termo_compartilhamento_dados)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """
        values = (
            aluno.nome,
            aluno.altura,
            aluno.peso,
            aluno.endereco,
            aluno.matricula,
            aluno.data_nascimento,
            aluno.serie_atual,
            aluno.usuario_id,
            aluno.termo_medicamento_escola,
            aluno.termo_atendimento_medico,
            aluno.termo_compartilhamento_dados,
        )

        # Executando o comando no banco de dados
        cur.execute(query, values)

        aluno_id = cur.fetchone()[0]

        conn.commit()
        return {"message": "Aluno adicionado com sucesso!", "aluno_id": aluno_id}

    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar aluno: {e}")
    finally:
        cur.close()
        conn.close()

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
        cur.execute("""
            SELECT id, nome, altura, peso, endereco, matricula, data_nascimento, serie_atual, 
                   responsavel_id, termo_medicamento_escola, termo_atendimento_medico, termo_compartilhamento_dados
            FROM aluno 
            WHERE id = %s;
        """, (aluno_id,))
        aluno = cur.fetchone()

        if aluno:
            return {
                "id": aluno[0],
                "nome": aluno[1],
                "altura": aluno[2],
                "peso": aluno[3],
                "endereco": aluno[4],
                "matricula": aluno[5],
                "data_nascimento": aluno[6],
                "serie_atual": aluno[7],
                "responsavel_id": aluno[8],
                "termo_medicamento_escola": aluno[9],
                "termo_atendimento_medico": aluno[10],
                "termo_compartilhamento_dados": aluno[11]
            }
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar aluno: {e}")
    finally:
        cur.close()
        conn.close()

"""
Função para atualização do registro do aluno
@JvReis
"""
def update_aluno_id(aluno: AlunoUpdate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        query = """
            UPDATE aluno 
            SET nome = %s, altura = %s, peso = %s, endereco = %s, matricula = %s, 
                data_nascimento = %s, serie_atual = %s, responsavel_id = %s, 
                termo_medicamento_escola = %s, termo_atendimento_medico = %s, 
                termo_compartilhamento_dados = %s 
            WHERE id = %s
            RETURNING *; -- RETORNA SO DADOS ATUALIZADOS
        """
        values = (
            aluno.nome,
            aluno.altura,
            aluno.peso,
            aluno.endereco,
            aluno.matricula,
            aluno.data_nascimento,
            aluno.serie_atual,
            aluno.responsavel_id,
            aluno.termo_medicamento_escola,
            aluno.termo_atendimento_medico,
            aluno.termo_compartilhamento_dados,
            aluno.id,
        )

        cur.execute(query, tuple(values))
        aluno_atualizado = cur.fetchone()

        conn.commit()
        if aluno_atualizado:
            return {
                "id": aluno_atualizado[0],
                "nome": aluno_atualizado[1],
                "altura": aluno_atualizado[2],
                "peso": aluno_atualizado[3],
                "endereco": aluno_atualizado[4],
                "matricula": aluno_atualizado[5],
                "data_nascimento": aluno_atualizado[6],
                "serie_atual": aluno_atualizado[7],
                "responsavel_id": aluno_atualizado[8],
                "termo_medicamento_escola": aluno_atualizado[9],
                "termo_atendimento_medico": aluno_atualizado[10],
                "termo_compartilhamento_dados": aluno_atualizado[11]
            }
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar aluno: {e}")
    finally:
        cur.close()
        conn.close()

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

        if aluno_deletado:
            return {"message": "Aluno removido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir aluno: {e}")
    finally:
        cur.close()
        conn.close()
