from fastapi import APIRouter
from app.schemas.alerta import AlertCreate
from app.services.alert_services import create_alert, get_alerts, view_alert

router = APIRouter()

"""
Endpoint destinado a criação de um novo alerta
@AnotherOne07
"""
@router.post("/create")
def criar_novo_alerta(alert: AlertCreate):
    return create_alert(alert)

"""
Endpoint destinado a listagem de todos os alertas enviados e recebidos por um responsável
@AnotherOne07
"""
@router.post("/getAlerts/{responsavel_id}")
def listar_alertas(responsavel_id):
    return get_alerts(responsavel_id)

"""
Endpoint destinado a marcar uma mensagem como lida
@AnotherOne07
"""
@router.post("/viewAlert/{alerta_id}")
def visualizar_alert(alerta_id):
    return view_alert(alerta_id)