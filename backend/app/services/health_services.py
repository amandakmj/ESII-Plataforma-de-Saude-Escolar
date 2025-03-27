from fastapi import HTTPException
from app.utils.database import connect_db
from datetime import date

"""
Função de criação do registro de saudo do aluno
@JvReis
"""
def create_saude_student(usuario_id: int, matricula: str, altura: float, peso: float, alergias: str, atividade_fisica: str,  doencas_cronicas: str, medicamentos_continuos: str, cirugiais_internacoes: str, vacinas: str, deficiencias_necessidades: str, plano_saude: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()
        # Verificar se o usuário é um responsável (parent)
        cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
        tipo_usuario = cur.fetchone()

        if not tipo_usuario or tipo_usuario[0] != 'parent':
            cur.close()
            conn.close()
            raise HTTPException(status_code=400, detail="O usuário não é um responsável")

        # Buscar o ID do aluno pela matrícula
        cur.execute("SELECT id FROM aluno WHERE matricula = %s;", (matricula,))
        aluno = cur.fetchone()

        if not aluno:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

        aluno_id = aluno[0]

        # Verificar se os dados de altura e peso são válidos
        if altura <= 0 or peso <= 0:
            raise HTTPException(status_code=400, detail="Altura e peso devem ser valores positivos")

        # Calcular IMC se altura for maior que zero
        imc = peso / (altura ** 2)

        # Inserir dados de saúde vinculados ao aluno
        cur.execute("""
            INSERT INTO saude (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencas_cronicas, medicamentos_continuos, cirugiais_internacoes, vacinas, deficiencias_necessidades, plano_saude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ) RETURNING id;
        """, (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencas_cronicas, medicamentos_continuos, cirugiais_internacoes, vacinas, deficiencias_necessidades, plano_saude ))

        saude_id = cur.fetchone()[0]

        conn.commit()
        
        return {"message": "Dados de saúde do aluno adicionados com sucesso!", "saude_id": saude_id}

    except Exception as e:
        if conn:
            conn.rollback()  # Garante o rollback se ocorrer algum erro
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar dados de saúde do aluno: {e}")
    finally:
        # Fecha a conexão e o cursor, independentemente do sucesso ou erro
        if cur:
            cur.close()
        if conn:
            conn.close()


"""
Função para pegar/listar o registro de saúde do aluno de acordo com o id
@JvReis
"""
def get_saude_id(saude_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, altura, peso, imc, alergias, atividade_fisica, doencas_cronicas, "
        "medicamentos_continuos, cirugiais_internacoes, vacinas, deficiencias_necessidades, plano_saude  FROM saude WHERE id = %s;", (saude_id,))
        saude = cur.fetchall()
        cur.close()
        conn.close()

        if saude:
            return [{"altura": s[1], "peso": s[2], "imc": s[3], "alergias": s[4], "atividade_fisica": s[5]
                     , "doencas_cronicas": s[6], "medicamentos_continuos": s[7], "cirugiais_internacoes": s[8]
                      , "vacinas": s[9], "deficiencias_necessidades": s[10], "plano_saude": s[11]} for s in saude]
        else:
            raise HTTPException(status_code=404, detail="Dados de saúde do aluno não encontrados")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados de saúde: {e}")

"""
Função para autalização do registro de saude do aluno
@JvReis
"""
def update_saude_id(saude_id: int, altura: float, peso: float, alergias: str, atividade_fisica: str,  doencas_cronicas: str, medicamentos_continuos: str, cirugiais_internacoes: str, vacinas: str, deficiencias_necessidades: str, plano_saude: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        
        # Verificar se os dados de altura e peso são válidos
        if altura <= 0 or peso <= 0:
            raise HTTPException(status_code=400, detail="Altura e peso devem ser valores positivos")

        # Calcular IMC se altura for maior que zero
        imc = peso / (altura ** 2)
        
        updates = []
        valores = []
        if altura:
            updates.append("altura = %s")
            valores.append(altura)
        if peso:
            updates.append("peso = %s")
            valores.append(peso)
        if imc:
            updates.append("imc = %s")
            valores.append(imc)
        if alergias:
            updates.append("alergias = %s")
            valores.append(alergias)
        if atividade_fisica:
            updates.append("atividade_fisica = %s")
            valores.append(atividade_fisica)
        if doencas_cronicas:
            updates.append("doencas_cronicas = %s")
            valores.append(doencas_cronicas)
        if medicamentos_continuos:
            updates.append("medicamentos_continuos = %s")
            valores.append(medicamentos_continuos)
        if cirugiais_internacoes:
            updates.append("cirugiais_internacoes = %s")
            valores.append(cirugiais_internacoes)
        if vacinas:
            updates.append("vacinas = %s")
            valores.append(vacinas)
        if deficiencias_necessidades:
            updates.append("deficiencias_necessidades = %s")
            valores.append(deficiencias_necessidades)
        if plano_saude:
            updates.append("plano_saude = %s")
            valores.append(plano_saude)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(saude_id)
        query = f"UPDATE saude SET {', '.join(updates)} WHERE saude_id = %s RETURNING id, altura, peso, imc, alergias, atividade_fisica, doencas_cronicas, medicamentos_continuos, cirugiais_internacoes, vacinas, deficiencias_necessidades, plano_saude  ;"
        cur.execute(query, tuple(valores))
        saude_atualizada = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if saude_atualizada:
            return {"id": saude_atualizada[0], "altura": saude_atualizada[1], "peso": saude_atualizada[2], "imc": saude_atualizada[3], "alergias": saude_atualizada[4], "atividade_fisica": saude_atualizada[5]
                    , "doencas_cronicas": saude_atualizada[6], "medicamentos_continuos": saude_atualizada[7], "cirugiais_internacoes": saude_atualizada[8]
                    , "vacinas": saude_atualizada[9], "deficiencias_necessidades": saude_atualizada[10]
                    , "plano_saude": saude_atualizada[11]}
        else:
            raise HTTPException(status_code=404, detail="Saúde do aluno não encontrada")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar dados de saúde: {e}")

"""
Função para deletar o registro de saúde do aluno
@JvReis
"""
def delete_saude_id(saude_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM saude WHERE id = %s RETURNING id;", (saude_id,))
        saude_deletada = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if saude_deletada:
            return {"message": "Dados de saúde do aluno removidos com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Dados de saúde não encontrados")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir dados de saúde: {e}")
