from fastapi import APIRouter
from app.api.endpoints import usuarios, aluno, saude

api_router = APIRouter()

api_router.include_router(usuarios.router, prefix="/usuarios", tags=["usuarios"])
# print("Rotas de usuarios inseridas com sucesso")
api_router.include_router(aluno.router, prefix="/aluno", tags=["aluno"])
# print("Rotas de aluno inseridas com sucesso")
api_router.include_router(saude.router, prefix="/saude", tags=["saude"])
# print("Rotas de saude inseridas com sucesso")