from fastapi import APIRouter, HTTPException, Depends
from app.schemas.saude import SaudeCreate, SaudeUpdate
from app.services.health_services import create_saude_student, get_saude_id, update_saude_id, delete_saude_id

router = APIRouter()

"""
Endpoint destinado a criação da "saude" de um aluno
@JvReis
"""
#Rota para criar a saúde de um aluno
@router.post("/create")
def criar_novo_saude_aluno(usuario_id: int, dados_saude: SaudeCreate):
     return create_saude_student(
        usuario_id=usuario_id,
        matricula=dados_saude.matricula,
        altura=dados_saude.altura,
        peso=dados_saude.peso,
        alergias=dados_saude.alergias,
        atividade_fisica=dados_saude.atividade_fisica,
        doencasCronicas=dados_saude.doencas_cronicas,
        medicamentosContinuos=dados_saude.medicamentos_continuos,
        cirugiaisInternacoes=dados_saude.cirurgias_internacoes,
        vacinas=dados_saude.vacinas,
        deficienciasNecessidades=dados_saude.deficiencias_necessidades,
        planoSaude=dados_saude.plano_saude
    )

"""
Endpoint destinado a retornar dados de saude de um aluno
@JvReis
"""
@router.get("/get_saude_id/{saude_id}")
def pegar_saude_id (saude_id):
     return get_saude_id(saude_id)

"""
Endpoint destinado a atualizar dados de saude de um usuário
@JvReis
"""
@router.put("/update_aluno_id/{saude_id}")
def atualizar_aluno_id(matricula: str, dados_saude: SaudeUpdate):
     return update_saude_id(matricula=matricula,
        altura=dados_saude.altura,
        peso=dados_saude.peso,
        alergias=dados_saude.alergias,
        atividade_fisica=dados_saude.atividade_fisica,
        doencasCronicas=dados_saude.doencas_cronicas,
        medicamentosContinuos=dados_saude.medicamentos_continuos,
        cirugiaisInternacoes=dados_saude.cirurgias_internacoes,
        vacinas=dados_saude.vacinas,
        deficienciasNecessidades=dados_saude.deficiencias_necessidades,
        planoSaude=dados_saude.plano_saude
        )

"""
Endpoint destinado a deletar dados de saude de um aluno
@JvReis
"""
@router.delete("/delete_saude_id/{saude_id}")
def deletar_saude_id(saude_id):
     return delete_saude_id(saude_id)
