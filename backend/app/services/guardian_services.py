from fastapi import HTTPException
from app.utils.database import connect_db
from app.schemas.responsavel import ResponsavelCreate, ResponsavelUpdate

"""
Cria um novo registro de responsável
@AnotherOne07
"""
def create_responsavel(responsavel: ResponsavelCreate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco de dados")
    
    try:
        cur = conn.cursor()
        
        # Verificar se o usuário já é um responsável
        cur.execute("SELECT id FROM responsavel WHERE usuario_id = %s;", (responsavel.usuario_id,))
        if cur.fetchone():
            cur.close()
            raise HTTPException(status_code=400, detail="Usuário já cadastrado como responsável")
        
        # Inserir novo responsável
        query = """
            INSERT INTO responsavel (usuario_id, telefone, parentesco)
            VALUES (%s, %s, %s) RETURNING id;
        """
        values = (responsavel.usuario_id, responsavel.telefone, responsavel.parentesco)
        cur.execute(query, values)
        responsavel_id = cur.fetchone()[0]
        
        conn.commit()
        return {"message": "Responsável cadastrado com sucesso!", "responsavel_id": responsavel_id}
    
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao cadastrar responsável: {e}")
    finally:
        cur.close()
        conn.close()


"""
Obtém um responsável pelo ID
@AnotherOne07
"""
def get_guardian_id(responsavel_id: int):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM responsavel WHERE id = %s;", (responsavel_id,))
        responsavel = cur.fetchone()

        if not responsavel:
            raise HTTPException(status_code=404, detail="Responsável não encontrado")

        return {
            "id": responsavel[0],
            "usuario_id": responsavel[1],
            "telefone": responsavel[2],
            "parentesco": responsavel[3]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar responsável: {e}")
    
    finally:
        cur.close()
        conn.close()


"""
Atualizar um registro de responsável
@AnotherOne07
"""
def update_guardian(responsavel_id, responsavel: ResponsavelUpdate):
    conn = connect_db()
    if not conn:
        raise HTTPException(status_code=500, detail="Erro ao conectar ao banco")

    try:
        cur = conn.cursor()
        query = """
            UPDATE responsavel 
            SET telefone = %s, parentesco = %s
            WHERE id = %s RETURNING id;
        """
        values = (responsavel.telefone, responsavel.parentesco, responsavel_id)
        cur.execute(query, values)
        updated_id = cur.fetchone()

        if not updated_id:
            raise HTTPException(status_code=404, detail="Responsável não encontrado")

        conn.commit()
        return {"message": "Responsável atualizado com sucesso!", "responsavel_id": updated_id[0]}

    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar responsável: {e}")
    
    finally:
        cur.close()
        conn.close()