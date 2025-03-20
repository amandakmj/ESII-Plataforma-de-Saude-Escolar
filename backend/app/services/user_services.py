from sqlalchemy.ext.asyncio import AsyncSession
from app.models.usuario import Usuario
from app.schemas.usuario import UserCreate
from fastapi import HTTPException
from app.utils.database import connect_db
from app.core.security import hash_senha
from sqlalchemy.future import select

# insere um novo usuário no banco
def create_user(usuario):
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

#Pega todos os usuário do banco
def get_usuario():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, nome, email, tipo_usuario FROM usuario;")
        usuarios = [{"id": u[0], "nome": u[1], "email": u[2], "tipo_usuario": u[3]} for u in cur.fetchall()]
        cur.close()
        conn.close()
        return usuarios
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuários: {e}")

#pega o usuário que tem o id que foi passado
def get_usuario_id(usuario_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, nome, email, tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
        usuario = cur.fetchone()
        cur.close()
        conn.close()

        if usuario:
            return {"id": usuario[0], "nome": usuario[1], "email": usuario[2], "tipo_usuario": usuario[3]}
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuário: {e}")


# def update_usuario_id(usuario_id: int, nome: str = None, email: str = None, senha: str = None, tipo_usuario: UserTypeEnum = None):
#     conn = connect_db()
#     if not conn:
#         raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

#     try:
#         cur = conn.cursor()

#         updates = []
#         valores = []
#         if nome:
#             updates.append("nome = %s")
#             valores.append(nome)
#         if email:
#             updates.append("email = %s")
#             valores.append(email)
#         if senha:
#             senha_hash = hash_senha(senha)
#             updates.append("senha = %s")
#             valores.append(senha_hash)
#         if tipo_usuario:
#             updates.append("tipo_usuario = %s")
#             valores.append(tipo_usuario)

#         if not updates:
#             raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

#         valores.append(usuario_id)
#         query = f"UPDATE usuario SET {', '.join(updates)} WHERE id = %s RETURNING id, nome, email, tipo_usuario;"
#         cur.execute(query, tuple(valores))
#         usuario_atualizado = cur.fetchone()

#         conn.commit()
#         cur.close()
#         conn.close()

#         if usuario_atualizado:
#             return {"id": usuario_atualizado[0], "nome": usuario_atualizado[1], "email": usuario_atualizado[2], "tipo_usuario": usuario_atualizado[3]}
#         else:
#             raise HTTPException(status_code=404, detail="Usuário não encontrado")

#     except Exception as e:
#         conn.rollback()
#         raise HTTPException(status_code=500, detail=f"Erro ao atualizar usuário: {e}")
