from fastapi import HTTPException
from fastapi.responses import JSONResponses
from app.utils.database import connect_db

"""
@AnotherOne07
"""
def create_alert(alert):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar com o banco de dados")
    
    try:
        cur = conn.cursor()
    except:
        raise HTTPException(status_code=500, detail="Erro ao criar um novo alerta")
    
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

