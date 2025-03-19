from fastapi import APIRouter, HTTPException, Depends
from app.schemas.usuario import UserCreate
from app.services.user_services import criar_usuario, get_usuario, get_usuario_id

router = APIRouter()

@router.post("/create")
def criar_novo_usuario(user: UserCreate):
    return criar_usuario(user)

@router.get("/get")
def pegar_usuario():
    return get_usuario()

@router.get("/get/{usuario_id}") #só alterei algo aq e em user_services
def pegar_usuario_id(usuario_id): #verificar se precisar alterar em mais lugar
    return get_usuario_id(usuario_id) 

# @router.put("update/{usuario_id}")
# def atualizar_usuario_id (usuario_id, nome, email, senha, tipo_usuario):
#     return update_usuario_id(usuario_id, nome, email, senha, tipo_usuario)