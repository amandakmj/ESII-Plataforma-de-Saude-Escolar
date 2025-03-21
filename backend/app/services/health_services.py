from fastapi import HTTPException
from app.utils.database import connect_db
from datetime import date


def create_saude_student(usuario_id: int, matricula: str, altura: float, peso: float, alergias: str, atividade_fisica: str,  doencasCronicas: str, medicamentosContinuos: str, cirugiaisInternacoes: str, vacinas: str, deficienciasNecessidades: str, planoSaude: str):
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
            INSERT INTO saude (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ) RETURNING id;
        """, (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude ))

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


def get_saude_id(saude_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, "
        "medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude  FROM saude WHERE id = %s;", (saude_id,))
        saude = cur.fetchall()
        cur.close()
        conn.close()

        if saude:
            return [{"altura": s[1], "peso": s[2], "imc": s[3], "alergias": s[4], "atividade_fisica": s[5]
                     , "doencasCronicas": s[6], "medicamentosContinuos": s[7], "cirugiaisInternacoes": s[8]
                      , "vacinas": s[9], "deficienciasNecessidades": s[10], "planoSaude": s[11]} for s in saude]
        else:
            raise HTTPException(status_code=404, detail="Dados de saúde do aluno não encontrados")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados de saúde: {e}")


def update_saude_id(saude_id: int, altura: float, peso: float, alergias: str, atividade_fisica: str,  doencasCronicas: str, medicamentosContinuos: str, cirugiaisInternacoes: str, vacinas: str, deficienciasNecessidades: str, planoSaude: str):
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
        if doencasCronicas:
            updates.append("doencasCronicas = %s")
            valores.append(doencasCronicas)
        if medicamentosContinuos:
            updates.append("medicamentosContinuos = %s")
            valores.append(medicamentosContinuos)
        if cirugiaisInternacoes:
            updates.append("cirugiaisInternacoes = %s")
            valores.append(cirugiaisInternacoes)
        if vacinas:
            updates.append("vacinas = %s")
            valores.append(vacinas)
        if deficienciasNecessidades:
            updates.append("deficienciasNecessidades = %s")
            valores.append(deficienciasNecessidades)
        if planoSaude:
            updates.append("planoSaude = %s")
            valores.append(planoSaude)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(saude_id)
        query = f"UPDATE saude SET {', '.join(updates)} WHERE saude_id = %s RETURNING id, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude  ;"
        cur.execute(query, tuple(valores))
        saude_atualizada = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if saude_atualizada:
            return {"id": saude_atualizada[0], "altura": saude_atualizada[1], "peso": saude_atualizada[2], "imc": saude_atualizada[3], "alergias": saude_atualizada[4], "atividade_fisica": saude_atualizada[5]
                    , "doencasCronicas": saude_atualizada[6], "medicamentosContinuos": saude_atualizada[7], "cirugiaisInternacoes": saude_atualizada[8]
                    , "vacinas": saude_atualizada[9], "deficienciasNecessidades": saude_atualizada[10]
                    , "planoSaude": saude_atualizada[11]}
        else:
            raise HTTPException(status_code=404, detail="Saúde do aluno não encontrada")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar dados de saúde: {e}")


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
