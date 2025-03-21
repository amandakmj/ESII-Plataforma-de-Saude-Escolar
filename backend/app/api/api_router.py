from fastapi import APIRouter
from app.api.endpoints import relatorio, profissional_saude, usuarios, aluno, saude, alerta

api_router = APIRouter()

api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
# print("Rotas de usuarios inseridas com sucesso")

api_router.include_router(aluno.router, prefix="/aluno", tags=["aluno"])
# print("Rotas de aluno inseridas com sucesso")

api_router.include_router(saude.router, prefix="/saude", tags=["saude"])
# print("Rotas de saude inseridas com sucesso")

api_router.include_router(alerta.router, prefix="/alerta", tags=["alerta"])
# print("Rotas de saude inseridas com sucesso")

api_router.include_router(profissional_saude.router, prefix="/profissional_saude", tags=["profissional_saude"])
# print("Rotas de saude inseridas com sucesso")

api_router.include_router(relatorio.router, prefix="/relatorio", tags=["relatorio"])
# print("Rotas de saude inseridas com sucesso")
