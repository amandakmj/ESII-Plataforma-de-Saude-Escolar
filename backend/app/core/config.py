from pydantic_settings import BaseSettings
from functools import lru_cache

# BaseSettings define um modelo de configuração com variáveis esperadas
class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    DEBUG: bool = False

    class Config:
        env_file = ".env"

# Otimiza a função get_settings() para evitar leituras repetidas
@lru_cache
def get_settings():
    return Settings()

""" 
Qualquer parte do código consegue acessar a partir de : 

from core.config import get_settings
settings = get_settings()

"""