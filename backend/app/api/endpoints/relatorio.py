from fastapi import APIRouter, HTTPException
from app.services.report_services import gen_report_ind_aluno, gen_report_total

router = APIRouter()

"""
Endpointss para as rotas de acesso aos relatórios
@JvReis
"""
@router.get("/relatorio/saude{aluno_id}")
def relatorio_individual_aluno(aluno_id: int):
    return gen_report_ind_aluno(aluno_id)


@router.get("/relatorios/estatisticas")
def relatorio_estatistico_total():
    return gen_report_total()
