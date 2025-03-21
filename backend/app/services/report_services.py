from app.utils.database import connect_db
from fastapi import HTTPException

def gerar_relatorio_individual_aluno(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        # Consulta as informações de saúde do aluno
        cur.execute("""
            SELECT 
                a.matricula,
                saude.altura,
                saude.peso,
                saude.imc,
                saude.alergias,
                saude.atividade_fisica,
                saude.doencasCronicas,
                saude.medicamentosContinuos,
                saude.cirugiaisInternacoes,
                saude.vacinas,
                saude.deficienciasNecessidades,
                saude.planoSaude
            FROM aluno a
            JOIN saude saude ON a.id = saude.aluno_id
            WHERE a.id = %s
        """, (aluno_id,))

        # Recupera os dados do aluno
        dados_aluno = cur.fetchone()

        if not dados_aluno:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

        # Processamento adicional, se necessário
        relatorio = {
            "matricula": dados_aluno[0],
            "altura": dados_aluno[1],
            "peso": dados_aluno[2],
            "imc": dados_aluno[3],
            "alergias": dados_aluno[4],
            "atividade_fisica": dados_aluno[5],
            "doencas_cronicas": dados_aluno[6],
            "medicamentos_continuos": dados_aluno[7],
            "cirurgias_internacoes": dados_aluno[8],
            "vacinas": dados_aluno[9],
            "deficiencias_necessidades": dados_aluno[10],
            "plano_saude": dados_aluno[11],
        }

        conn.commit()
        cur.close()
        conn.close()

        return relatorio
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao gerar relatório de saúde: {e}")
