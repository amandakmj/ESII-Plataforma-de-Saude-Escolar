from sqlalchemy.ext.asyncio import AsyncSession
from app.models.usuario import Usuario
from app.schemas.usuario import UserCreate
from sqlalchemy.future import select

# insere um novo usuário no banco
async def criar_usuario(db: AsyncSession, user: UserCreate):
    new_user = Usuario(nome=user.nome, email=user.email, tipo_usuario=user.tipo_usuario, segredo=user.segredo)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user

# retorna todos os usuário cadastrados
async def listar_usuarios(db: AsyncSession):
    result = await db.execute(select(User))
    return result.scalars().all()