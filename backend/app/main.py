from fastapi import FastAPI
from app.api.api_router import api_router
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

app = FastAPI(title="Plataforma de Saúde Escolar")

app.include_router(api_router)