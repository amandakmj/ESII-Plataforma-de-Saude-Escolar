from app.utils.database import connect_db
from fastapi import HTTPException

"""
Adiciona as especialidades aos usuários do tipo "health_professional"
@JvReis
"""
def gen_report_ind_aluno(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        # Consulta a VIEW
        cur.execute("SELECT * FROM relatorio_individual_aluno WHERE aluno_id = %s", (aluno_id,))
        resultado = cur.fetchone()

        if not resultado:
            raise HTTPException(status_code=404, detail="Nenhum dado encontrado para o aluno")

        print(resultado)  # Debug: veja o que está retornando

        relatorio = {
            "matricula": resultado[1],
            "data_nascimento": resultado[2],
            "altura": resultado[3],
            "peso": resultado[4],
            "imc": resultado[5],
            "alergias": resultado[6],
            "atividade_fisica": resultado[7],
            "doencas_cronicas": resultado[8],
            "medicamentos_continuos": resultado[9],
            "cirugiais_internacoes": resultado[10],
            "vacinas": resultado[11],
            "deficiencias_necessidades": resultado[12],
            "plano_saude": resultado[13]
        }

        cur.close()
        conn.close()

        return relatorio

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao gerar relatório de saúde: {e}")

"""
Adiciona as especialidades aos usuários do tipo "health_professional"
@JvReis
"""
def gen_report_total():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        cur.execute("SELECT * FROM relatorio_geral")
        resultado = cur.fetchone()

        if not resultado:
            raise   HTTPException(status_code=404, detail="Nenhum dado encontrado")
        
        relatorio ={
            "media_altura": resultado[0],
            "media_peso": resultado[1],
            "media_imc": resultado[2],
            "alergias": resultado[3],
            "doencas_cronicas": resultado[4],
            "deficiencias_necessidades": resultado[5]
        }

        cur.close()
        conn.close()

        return relatorio

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao gerar relatório estatístico: {e}")
