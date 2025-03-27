from fastapi import HTTPException
from app.schemas.escola import SchoolCreate, SchoolUpdate
from app.utils.database import connect_db

"""
Cria um novo registro na tabela escola
@AnotherOne07
"""
def create_school(escola: SchoolCreate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO escola (nome, endereco, cnpj, telefone) 
            VALUES (%s, %s, %s, %s) RETURNING id;
        """, (escola.nome, escola.endereco, escola.cnpj, escola.telefone))

        escola_id = cur.fetchone()[0]
        conn.commit()

        return {"id": escola_id, "nome": escola.nome, "endereco": escola.endereco, "cnpj": escola.cnpj, "telefone": escola.telefone}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=f"Erro ao criar escola: {e}")
    finally:
        cur.close()
        conn.close()

"""
Retorna todas as escolas cadastradas
@AnotherOne07
"""
def get_school():
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, nome, endereco, cnpj, telefone FROM escola;")
        escolas = [{"id": e[0], "nome": e[1], "endereco": e[2], "cnpj": e[3], "telefone": e[4]} for e in cur.fetchall()]
        return escolas
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar escolas: {e}")
    finally:
        cur.close()
        conn.close()

"""
Retorna uma escola específica pelo ID
"""
def get_school_id(escola_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT id, nome, endereco, cnpj, telefone FROM escola WHERE id = %s;", (escola_id,))
        escola = cur.fetchone()

        if escola:
            return {"id": escola[0], "nome": escola[1], "endereco": escola[2], "cnpj": escola[3], "telefone": escola[4]}
        else:
            raise HTTPException(status_code=404, detail="Escola não encontrada")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar escola: {e}")
    finally:
        cur.close()
        conn.close()

"""
Atualiza os dados de uma escola
"""
def update_school(escola: SchoolUpdate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        updates = []
        valores = []
        
        if escola.nome:
            updates.append("nome = %s")
            valores.append(escola.nome)
        if escola.endereco:
            updates.append("endereco = %s")
            valores.append(escola.endereco)
        if escola.cnpj:
            updates.append("cnpj = %s")
            valores.append(escola.cnpj)
        if escola.telefone:
            updates.append("telefone = %s")
            valores.append(escola.telefone)

        if not updates:
            raise HTTPException(status_code=400, detail="Nenhuma informação para atualizar")

        valores.append(escola.id)
        query = f"UPDATE escola SET {', '.join(updates)} WHERE id = %s RETURNING id, nome, endereco, cnpj, telefone;"
        cur.execute(query, tuple(valores))
        escola_atualizada = cur.fetchone()

        conn.commit()

        if escola_atualizada:
            return {"id": escola_atualizada[0], "nome": escola_atualizada[1], "endereco": escola_atualizada[2], "cnpj": escola_atualizada[3], "telefone": escola_atualizada[4]}
        else:
            raise HTTPException(status_code=404, detail="Escola não encontrada")

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar escola: {e}")
    finally:
        cur.close()
        conn.close()

"""
Exclui uma escola pelo ID
"""
def delete_escola(escola_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM escola WHERE id=%s", (escola_id,))
        conn.commit()
        cur.close()
        conn.close()

        return {"message": "Escola excluída com sucesso!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar escola: {e}")
