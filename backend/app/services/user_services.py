from fastapi.responses import JSONResponse
from fastapi import HTTPException
from app.models.usuario import Usuario
from app.schemas.usuario import UserCreate
from app.utils.database import connect_db
from app.core.security import hash_senha

""" 
Cria um novo registro na tabela usuário no banco de dados
@JvReis
"""
def create_user(usuario):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    # Cria um hash da senha utilizando o bycript
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

"""
Retorna uma lista com todos os usuários
@JvReis
"""
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

"""
Retorna um registro de usuário específico
@JvReis
"""
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
"""
Adiciona as especialidades aos usuários do tipo "health_professional"
@JvReis
"""
def update_user(usuario):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        updates = []
        valores = []
        
        if usuario.nome:
            updates.append("nome = %s")
            valores.append(usuario.nome)
        if usuario.email:
            updates.append("email = %s")
            valores.append(usuario.email)
        if usuario.senha:
            senha_hash = hash_senha(usuario.senha)
            updates.append("senha = %s")
            valores.append(senha_hash)
        if usuario.tipo_usuario:
            updates.append("tipo_usuario = %s")
            valores.append(usuario.tipo_usuario)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(usuario.id)
        query = f"UPDATE usuario SET {', '.join(updates)} WHERE id = %s RETURNING id, nome, email, tipo_usuario;"
        cur.execute(query, tuple(valores))
        usuario_atualizado = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if usuario_atualizado:
            return {"id": usuario_atualizado[0], "nome": usuario_atualizado[1], "email": usuario_atualizado[2], "tipo_usuario": usuario_atualizado[3]}
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar usuário: {e}")

"""
Realiza a exclusão de um registro de usuário
@AnotherOne07
"""
def delete_user(usuario_id):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")
    
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM usuario WHERE id=%s", (usuario_id,))
        conn.commit()
        cur.close()
        conn.close()

        return JSONResponse(content={"message":"Usuário excluído com sucesso!"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar ao usuário: {e}")