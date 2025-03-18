from fastapi import FastAPI, HTTPException, Depends
import psycopg2
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import date

class UserTypeEnum(str, Enum):
    manager = "manager"
    instructor = "instructor"
    parent = "parent"
    health_professional = "health_professional"

class UserCreate(BaseModel):
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
        # Se o tipo de usuário for 'manager' (gestor escolar), adicioná-lo na tabela gestor_escolar
        if usuario.tipo_usuario == "manager":
            cur.execute("INSERT INTO gestor_escolar (usuario_id) VALUES (%s);", (usuario_id,))
        # Se o tipo de usuário for 'instructor' (gestor escolar), adicioná-lo na tabela gestor_escolar
        if usuario.tipo_usuario == "instructor":
            cur.execute("INSERT INTO professor (usuario_id) VALUES (%s);", (usuario_id,))

        
        conn.commit()
        cur.close()
        conn.close()

        return {"id": usuario_id, "nome": usuario.nome, "email": usuario.email, "tipo_usuario": usuario.tipo_usuario}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Erro ao criar usuário: {e}")

# @app.post("/criar_saude_aluno")
# def criar_saude_aluno(usuario_id: int, matricula: int, altura: float, peso: float, alergias: str, atividade_fisica: str):
#     conn = connect_db()
#     if not conn:
#         raise HTTPException(status_code=500, detail= "ERRO ao conectar ao banco de dados")
#     try: 
#         cur = conn.cursor()
#         # Verificar se o usuário existe e se é um responsável (parent)
#         cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
#         tipo_usuario = cur.fetchone()
    
#         if not tipo_usuario or tipo_usuario[0] != 'parent':
#             cur.close()
#             conn.close()
#             raise HTTPException(status_code=400, detail="O usuário não é um responsável")
    
#         cur.execute("SELECT id FROM aluno WHERE matricula = %s;",(str(matricula),))
#         aluno = cur.fetchone()
#         if not aluno:
#             cur.close()
#             conn.close()
#             raise HTTPException(status_code=404, detail="Aluno não encontrado")
        
#         aluno_id = aluno[0]

#         imc = peso/(altura**2) if altura > 0 else None

#         # Inserir dados de saúde do aluno
#         cur.execute("""
#             INSERT INTO saude (altura, peso, imc, alergias, atividade_fisica)
#             VALUES (%s, %s, %s, %s, %s) RETURNING id;
#         """, (altura, peso, imc, alergias, atividade_fisica))

#         saude_id = cur.fetchone()[0]

#         conn.commit()
#         cur.close()
#         conn.close()
#         return {"message": "Saude do aluno adicionado com sucesso!", "saude_id": saude_id}
    
#     except Exception as e:
#         conn.rollback()
#         conn.close()
#         raise HTTPException(status_code=500, detail=f"Erro ao adicionar saude do aluno: {e}")

@app.post("/criar_aluno/")
def criar_aluno(usuario_id: int, matricula: str, data_nascimento: date):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()
        # Verificar se o usuário existe e se é um responsável (parent)
        cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
        tipo_usuario = cur.fetchone()

        if not tipo_usuario or tipo_usuario[0] != 'parent':
            cur.close()
            conn.close()
            raise HTTPException(status_code=400, detail="O usuário não é um responsável")

        # Inserir aluno na tabela aluno
        cur.execute("""
            INSERT INTO aluno (matricula, data_nascimento)
            VALUES (%s, %s) RETURNING id;
        """, (matricula, data_nascimento))

        aluno_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()
        return {"message": "Aluno adicionado com sucesso!", "aluno_id": aluno_id}

    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar aluno: {e}")

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


