from fastapi import APIRouter, HTTPException
from app.services.report_services import gerar_relatorio_individual_aluno

router = APIRouter()

"""
Endpoint para gerar relatório de saúde individual de um aluno
"""
@router.get("/relatorio/saude/aluno/{aluno_id}")
def relatorio_individual_aluno(aluno_id: int):
    try:
        relatorio = gerar_relatorio_individual_aluno(aluno_id)
        return {"relatorio": relatorio}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar relatório: {str(e)}")
