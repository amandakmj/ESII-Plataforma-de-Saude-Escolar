from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import get_settings

settings = get_settings()
DATABASE_URL = settings.DATABASE_URL

# Cria um motor assícrono para o banco do postgreSQL
# basicamente, evita que consultas ao banco bloqueiem a execução do código
engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

# fornece uma instancia da sessao para as dependencias do fastapi
async def get_db():
    async with SessionLocal() as session:
        yield session