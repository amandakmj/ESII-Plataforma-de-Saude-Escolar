from sqlalchemy.ext.asyncio import AsyncSession
from app.models.usuario import Usuario
from app.schemas.usuario import UserCreate
from fastapi import HTTPException
from app.utils.database import connect_db
from app.core.security import hash_senha
from sqlalchemy.future import select

# insere um novo usuário no banco
def criar_usuario(usuario):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    senha_hash = hash_senha(usuario.segredo)

    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO usuario (nome, email, senha, tipo_usuario) 
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (usuario.nome, usuario.email, senha_hash, usuario.tipo_usuario))

        usuario_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return {"id": usuario_id, "nome": usuario.nome, "email": usuario.email, "tipo_usuario": usuario.tipo_usuario}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Erro ao criar usuário: {e}")

# retorna todos os usuário cadastrados
# def get_users(db: AsyncSession):
#     result = db.execute(select(Usuario))
#     return result.scalars().all()