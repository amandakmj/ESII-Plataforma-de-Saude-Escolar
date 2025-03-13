from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/")
def hello_world():
    return {"Hello": "World"} 

# Armazenamento em memória
responsaveis = []

# Função para gerar IDs únicos
def gerar_id():
    return len(responsaveis) + 1

# Rota para criar um novo responsável
@app.post("/responsavel/")
def create_responsavel(nome: str, email: str, senha: str):
    responsavel = {
        "id": gerar_id(),
        "nome": nome,
        "email": email,
        "senha": senha
    }
    responsaveis.append(responsavel)
    return responsavel

# Rota para listar todos os responsáveis
@app.get("/responsaveis/")
def get_responsaveis():
    return responsaveis

# Rota para buscar um responsável pelo ID
@app.get("/responsavel/{responsavel_id}")
def get_responsavel(responsavel_id: int):
    for responsavel in responsaveis:
        if responsavel["id"] == responsavel_id:
            return responsavel
    raise HTTPException(status_code=404, detail="Responsável não encontrado")

# Rota para atualizar um responsável
@app.put("/responsavel/{responsavel_id}")
def update_responsavel(responsavel_id: int, nome: str = None, email: str = None, senha: str = None):
    for responsavel in responsaveis:
        if responsavel["id"] == responsavel_id:
            if nome:
                responsavel["nome"] = nome
            if email:
                responsavel["email"] = email
            if senha:
                responsavel["senha"] = senha
            return responsavel
    raise HTTPException(status_code=404, detail="Responsável não encontrado")

# Rota para excluir um responsável
@app.delete("/responsavel/{responsavel_id}")
def delete_responsavel(responsavel_id: int):
    for responsavel in responsaveis:
        if responsavel["id"] == responsavel_id:
            responsaveis.remove(responsavel)
            return {"message": "Responsável removido com sucesso"}
    raise HTTPException(status_code=404, detail="Responsável não encontrado")