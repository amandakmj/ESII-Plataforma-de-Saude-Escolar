from fastapi import APIRouter, HTTPException, Depends
from app.schemas.profissional_saude import ProfissionalSaudeCreate, ProfissionalSaudeResponse
from app.services.health_professional_services import update_especialidade
from app.core.security import get_current_user

router = APIRouter()

"""
Endpoint para atualizar ou criar a especialidade do profissional de saúde
@JvReis
"""
@router.put("/update_especialidade/{usuario_id}", response_model=ProfissionalSaudeResponse, dependencies=[Depends(get_current_user)])
def atualizar_especialidade(usuario_id: int, dados_especialidade: ProfissionalSaudeCreate):
    # Chama a função que atualiza ou cria a especialidade no banco de dados
    return update_especialidade(usuario_id=usuario_id, especialidade=dados_especialidade.especialidade)
