from fastapi import HTTPException
from fastapi.responses import JSONResponse
from datetime import datetime
from app.utils.database import connect_db
from app.schemas.alerta import AlertCreate

"""
Cria um novo alerta para um responsável  
@AnotherOne07
"""
def create_alert(alert: AlertCreate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados")
    
    try:
        cur = conn.cursor()
        params = []
        params.append(alert.mensagem)
        params.append(datetime.now)
        params.append(alert.responsavel_id)
        params.append(alert.visualizado)
        params.append(alert.remetente)

        query = "INSERTO INTO alerta(mensagem, data_criacao, responsavel_id, visualizado, remetente) VALUES(%s, %s, %s, %s, %s)"
        cur.execute(query, params)
        conn.commit()

        return JSONResponse(
            content={"message": "Alerta salvo com sucesso!"}, 
            status_code=200)
    except:
        raise HTTPException(status_code=500, detail="Erro ao criar um novo alerta")
    
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()


"""
Retorna a lista de alertas enviados e recebidos de um responsável
@AnotherOne07
"""
def get_alerts(responsavel_id):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados")
    
    try:
        cur = conn.cursor()
        query = "SELECT * FROM alerta WHERE responsavel_id = %s"
        cur.execute(query, responsavel_id)
        alerts = [{
            "id": alert[0],
            "mensagem": alert[1],
            "data_criacao": alert[2],
            "responsavel_id": alert[3],
            "visualizado": alert[4],
            "remetente": alert[5],
        } for alert in cur.fetchall()]

        return JSONResponse(
            content={"alerts": alerts},
            status_code=200
        )
    except:
        raise HTTPException(status_code=500, detail="Erro ao criar um novo alerta")
    
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

# def get_alerts(responsavel_id):
#     conn = connect_db()
#     if not conn:
#         raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados")
    
#     try:
#         cur = conn.cursor()

#         return JSONResponse(
#             content={},
#             status_code=200
#         )
#     except:
#         raise HTTPException(status_code=500, detail="Erro ao criar um novo alerta")
    
#     finally:
#         if cur:
#             cur.close()
#         if conn:
#             conn.close()
