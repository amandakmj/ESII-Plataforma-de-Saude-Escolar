from fastapi import FastAPI, HTTPException, Depends
import psycopg2
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from enum import Enum

class UserTypeEnum(str, Enum):
    manager = "manager"
    instructor = "instructor"
    parent = "parent"
    health_professional = "health_professional"

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    tipo_usuario: UserTypeEnum

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def connect_db():
    try:
        conn = psycopg2.connect(
            dbname="bd_Plat_Saude",
            user="platSaude",
            password="engsoft2",
            host="database-plat.cx6umwauw9h8.us-east-1.rds.amazonaws.com",
            port="5432"
        )
        return conn
    except Exception as e:
        print("Erro ao conectar ao banco de dados:", e)
        return None

def hash_senha(senha: str):
    return pwd_context.hash(senha)

@app.post("/usuario/")
def create_usuario(usuario: UsuarioCreate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    senha_hash = hash_senha(usuario.senha)

    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO usuario (nome, email, senha, tipo_usuario) 
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (usuario.nome, usuario.email, senha_hash, usuario.tipo_usuario))

        usuario_id = cur.fetchone()[0]

        # Se o usuário for um responsável (parent), adicioná-lo na tabela responsavel
        if usuario.tipo_usuario == "parent":
            cur.execute("INSERT INTO responsavel (usuario_id) VALUES (%s);", (usuario_id,))

        conn.commit()
        cur.close()
        conn.close()

        return {"id": usuario_id, "nome": usuario.nome, "email": usuario.email, "tipo_usuario": usuario.tipo_usuario}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Erro ao criar usuário: {e}")

@app.post("/adicionar_especialidade/")
def adicionar_especialidade(usuario_id: int, especialidade: str):
    conn = connect_db()
    if conn:
        try:
            cur = conn.cursor()

            # Verificar se o usuário existe e se é um profissional de saúde
            cur.execute('''
                SELECT tipo_usuario FROM usuario WHERE id = %s;
            ''', (usuario_id,))
            tipo_usuario = cur.fetchone()

            if not tipo_usuario or tipo_usuario[0] != 'health_professional':
                raise HTTPException(status_code=400, detail="O usuário não é um profissional de saúde")

            # Inserir na tabela profissional_saude
            cur.execute('''
                INSERT INTO profissional_saude (usuario_id, especialidade)
                VALUES (%s, %s);
            ''', (usuario_id, especialidade))

            conn.commit()
            cur.close()
            conn.close()

            return {"message": "Especialidade adicionada com sucesso!"}
        except Exception as e:
            conn.rollback()
            cur.close()
            conn.close()
            raise HTTPException(status_code=500, detail=f"Erro ao adicionar especialidade: {e}")
    else:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")


@app.get("/usuarios/")
def get_usuarios():
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
    
@app.get("/usuario/{usuario_id}")
def get_usuario(usuario_id: int):
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
    
@app.put("/usuario/{usuario_id}")
def update_usuario(usuario_id: int, nome: str = None, email: str = None, senha: str = None, tipo_usuario: UserTypeEnum = None):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        updates = []
        valores = []
        if nome:
            updates.append("nome = %s")
            valores.append(nome)
        if email:
            updates.append("email = %s")
            valores.append(email)
        if senha:
            senha_hash = hash_senha(senha)
            updates.append("senha = %s")
            valores.append(senha_hash)
        if tipo_usuario:
            updates.append("tipo_usuario = %s")
            valores.append(tipo_usuario)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(usuario_id)
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

@app.delete("/usuario/{usuario_id}")
def delete_usuario(usuario_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM usuario WHERE id = %s RETURNING id;", (usuario_id,))
        usuario_deletado = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if usuario_deletado:
            return {"message": "Usuário removido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir usuário: {e}")
