import psycopg2
from app.core.config import DB_CONFIG

def connect_db():
    try:
        return psycopg2.connect(**DB_CONFIG)
    except Exception as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None
