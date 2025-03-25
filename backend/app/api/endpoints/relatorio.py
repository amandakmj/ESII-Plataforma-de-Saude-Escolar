from fastapi import APIRouter, HTTPException, Depends
from app.services.report_services import gen_report_ind_aluno, gen_report_total, gen_report_saude_class
from app.core.security import get_current_user


router = APIRouter()

"""
Endpointss para as rotas de acesso aos relatórios
@JvReis
"""
@router.get("/relatorio/saude{aluno_id}", dependencies=[Depends(get_current_user)])
def relatorio_individual_aluno(aluno_id: int):
    return gen_report_ind_aluno(aluno_id)

@router.get("/relatorios/estatisticas", dependencies=[Depends(get_current_user)])
def relatorio_estatistico_total():
    return gen_report_total()

@router.get("/relatorio_saude/turma/{turma_id}", dependencies=[Depends(get_current_user)])
def get_relatorio_saude_turma(turma_id: int):
    return gen_report_saude_class(turma_id)