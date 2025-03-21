from fastapi import FastAPI, HTTPException, Depends
import psycopg2
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from enum import Enum
from datetime import date
from dotenv import load_dotenv
import os
from fastapi.responses import FileResponse
from gerar_pdf_ind import gerar_relatorio_saude_pdf

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

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
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT")
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
        elif usuario.tipo_usuario == "manager":
            cur.execute("INSERT INTO gestor_escolar (usuario_id) VALUES (%s);", (usuario_id,))
        # Se o tipo de usuário for 'instructor' (gestor escolar), adicioná-lo na tabela gestor_escolar
        elif usuario.tipo_usuario == "instructor":
            cur.execute("INSERT INTO professor (usuario_id) VALUES (%s);", (usuario_id,))
        elif usuario.tipo_usuario == "health_professional":
            cur.execute("INSERT INTO profissional_saude (usuario_id, especialidade) VALUES (%s, 'Ainda não foi indformada');", (usuario_id,))
        
        conn.commit()
        cur.close()
        conn.close()

        return {"id": usuario_id, "nome": usuario.nome, "email": usuario.email, "tipo_usuario": usuario.tipo_usuario}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Erro ao criar usuário: {e}")

@app.post("/criar_saude_aluno/")
def criar_saude_aluno(usuario_id: int, matricula: str, altura: float, peso: float, alergias: str, atividade_fisica: str,  doencasCronicas: str, medicamentosContinuos: str, cirugiaisInternacoes: str, vacinas: str, deficienciasNecessidades: str, planoSaude: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()
        # Verificar se o usuário é um responsável (parent)
        cur.execute("SELECT tipo_usuario FROM usuario WHERE id = %s;", (usuario_id,))
        tipo_usuario = cur.fetchone()

        if not tipo_usuario or tipo_usuario[0] != 'parent':
            cur.close()
            conn.close()
            raise HTTPException(status_code=400, detail="O usuário não é um responsável")

        # Buscar o ID do aluno pela matrícula
        cur.execute("SELECT id FROM aluno WHERE matricula = %s;", (matricula,))
        aluno = cur.fetchone()

        if not aluno:
            cur.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

        aluno_id = aluno[0]

        # Verificar se os dados de altura e peso são válidos
        if altura <= 0 or peso <= 0:
            cur.close()
            conn.close()
            raise HTTPException(status_code=400, detail="Altura e peso devem ser valores positivos")

        # Calcular IMC se altura for maior que zero
        imc = peso / (altura ** 2)

        # Inserir dados de saúde vinculados ao aluno
        cur.execute("""
            INSERT INTO saude (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ) RETURNING id;
        """, (aluno_id, matricula, altura, peso, imc, alergias, atividade_fisica, doencasCronicas, medicamentosContinuos, cirugiaisInternacoes, vacinas, deficienciasNecessidades, planoSaude ))

        saude_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()
        
        return {"message": "Dados de saúde do aluno adicionados com sucesso!", "saude_id": saude_id}

    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar dados de saúde do aluno: {e}")

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
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")
    try:
        cur = conn.cursor()
         # Verificar se o usuário já está na tabela profissional_saude
        cur.execute("SELECT id FROM profissional_saude WHERE usuario_id = %s;", (usuario_id,))
        profissional = cur.fetchone()

        if profissional:
            # Se já existe, apenas atualiza a especialidade
            cur.execute("UPDATE profissional_saude SET especialidade = %s WHERE usuario_id = %s;", 
                        (especialidade, usuario_id))
        else:
            # Caso contrário, insere um novo profissional de saúde
            cur.execute("INSERT INTO profissional_saude (usuario_id, especialidade) VALUES (%s, %s);", 
                        (usuario_id, especialidade))
        
        conn.commit()
        cur.close()
        conn.close()

        return {"message": "Especialidade adicionada/atualizada com sucesso!"}
    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Erro ao adicionar especialidade: {e}")

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


@app.get("/saude/{aluno_id}")
def get_saude(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, altura, peso, imc, alergias, atividade_fisica FROM saude WHERE aluno_id = %s;", (aluno_id,))
        saude = cur.fetchall()
        cur.close()
        conn.close()

        if saude:
            return [{"id": s[0], "altura": s[1], "peso": s[2], "imc": s[3], "alergias": s[4], "atividade_fisica": s[5]} for s in saude]
        else:
            raise HTTPException(status_code=404, detail="Dados de saúde do aluno não encontrados")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados de saúde: {e}")

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


@app.get("/aluno/{aluno_id}")
def get_aluno(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, matricula, data_nascimento FROM aluno WHERE id = %s;", (aluno_id,))
        aluno = cur.fetchone()
        cur.close()
        conn.close()

        if aluno:
            return {"id": aluno[0], "matricula": aluno[1], "data_nascimento": aluno[2]}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar aluno: {e}")

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

@app.put("/aluno/{aluno_id}")
def update_aluno(aluno_id: int, matricula: str = None, data_nascimento: date = None):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        updates = []
        valores = []
        if matricula:
            updates.append("matricula = %s")
            valores.append(matricula)
        if data_nascimento:
            updates.append("data_nascimento = %s")
            valores.append(data_nascimento)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(aluno_id)
        query = f"UPDATE aluno SET {', '.join(updates)} WHERE id = %s RETURNING id, matricula, data_nascimento;"
        cur.execute(query, tuple(valores))
        aluno_atualizado = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if aluno_atualizado:
            return {"id": aluno_atualizado[0], "matricula": aluno_atualizado[1], "data_nascimento": aluno_atualizado[2]}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar aluno: {e}")


@app.put("/saude/{saude_id}")
def update_saude(saude_id: int, altura: float = None, peso: float = None, alergias: str = None, atividade_fisica: str = None):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()

        updates = []
        valores = []
        if altura:
            updates.append("altura = %s")
            valores.append(altura)
        if peso:
            updates.append("peso = %s")
            valores.append(peso)
        if alergias:
            updates.append("alergias = %s")
            valores.append(alergias)
        if atividade_fisica:
            updates.append("atividade_fisica = %s")
            valores.append(atividade_fisica)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(saude_id)
        query = f"UPDATE saude SET {', '.join(updates)} WHERE id = %s RETURNING id, altura, peso, imc, alergias, atividade_fisica;"
        cur.execute(query, tuple(valores))
        saude_atualizada = cur.fetchone()

        conn.commit()
        cur.close()
        conn.close()

        if saude_atualizada:
            return {"id": saude_atualizada[0], "altura": saude_atualizada[1], "peso": saude_atualizada[2], "imc": saude_atualizada[3], "alergias": saude_atualizada[4], "atividade_fisica": saude_atualizada[5]}
        else:
            raise HTTPException(status_code=404, detail="Saúde do aluno não encontrada")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar dados de saúde: {e}")

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

@app.delete("/aluno/{aluno_id}")
def delete_aluno(aluno_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM aluno WHERE id = %s RETURNING id;", (aluno_id,))
        aluno_deletado = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if aluno_deletado:
            return {"message": "Aluno removido com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Aluno não encontrado")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir aluno: {e}")


@app.delete("/saude/{saude_id}")
def delete_saude(saude_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM saude WHERE id = %s RETURNING id;", (saude_id,))
        saude_deletada = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        if saude_deletada:
            return {"message": "Dados de saúde do aluno removidos com sucesso"}
        else:
            raise HTTPException(status_code=404, detail="Dados de saúde não encontrados")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao excluir dados de saúde: {e}")

@app.get("/gerar_relatorio_saude/{matricula}", response_class=FileResponse)
def gerar_relatorio_saude(matricula: str):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")

    try:
        cur = conn.cursor()

        # Busca os dados de saúde do aluno
        cur.execute("""
            SELECT id, altura, peso, imc, alergias, atividade_fisica
            FROM saude
            WHERE matricula = %s;
        """, (matricula,))
    
        dados_saude = cur.fetchall()

        # Formata os dados para a função de gerar PDF
        dados_formatados = [
            {
                "id": dado[0],
                "altura": dado[1],
                "peso": dado[2],
                "imc": dado[3],
                "alergias": dado[4],
                "atividade_fisica": dado[5]
            }
            for dado in dados_saude
        ]

        # Gera o PDF
        filepath = gerar_relatorio_saude_pdf(matricula, dados_formatados)

        # Retorna o arquivo PDF como resposta
        return FileResponse(filepath, filename=f"relatorio_saude_aluno_{matricula}.pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar relatório: {e}")
    finally:
        if conn:
            conn.close()
