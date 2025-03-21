from fastapi import APIRouter
from app.schemas.alerta import AlertCreate
from app.services.alert_services import create_alert

router = APIRouter()

"""
Endpoint destinado a criação de um novo alerta
@AnotherOne07
"""
@router.post("/create")
def criar_novo_alerta(alert: AlertCreate):
    return create_alert(alert)


@router.post("/getAlerts/{responsavel_id}")
def listar_alertas(responsavel_id):
    return get_alerts(responsavel_id)