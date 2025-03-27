from fastapi import APIRouter
from app.api.endpoints import relatorio, profissional_saude, usuarios, aluno, saude, alerta, site, turma, aluno_turma, escola, responsavel

api_router = APIRouter()

api_router.include_router(site.router, prefix="/site", tags=["site"])

api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])

api_router.include_router(escola.router, prefix="/escola", tags=["escola"])

api_router.include_router(aluno.router, prefix="/aluno", tags=["aluno"])

api_router.include_router(saude.router, prefix="/saude", tags=["saude"])

api_router.include_router(alerta.router, prefix="/alerta", tags=["alerta"])

api_router.include_router(profissional_saude.router, prefix="/profissional_saude", tags=["profissional_saude"])

api_router.include_router(relatorio.router, prefix="/relatorio", tags=["relatorio"])

api_router.include_router(turma.router, prefix="/turma", tags=["turma"])

api_router.include_router(aluno_turma.router, prefix="/aluno_turma", tags=["aluno_turma"])

api_router.include_router(responsavel.router, prefix="/responsavel", tags=["responsavel"])
