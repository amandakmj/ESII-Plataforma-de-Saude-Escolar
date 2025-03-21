from fastapi import APIRouter, HTTPException, Depends
from app.schemas.usuario import UserCreate, UserBase, UserResponse
from app.services.user_services import create_user, get_usuario, get_usuario_id

router = APIRouter()

"""
Endpoint destinado a criação de um novo usuário
@JvReis
"""
@router.post("/create")
def criar_novo_usuario(user: UserCreate):
    return create_user(user)

"""
Endpoint destinado uma lista de usuários
@JvReis
"""
@router.get("/get")
def pegar_usuario():
    return get_usuario()

"""
Endpoint destinado a retornar dados de um usuário
@JvReis
"""
@router.get("/get/{usuario_id}") #só alterei algo aq e em user_services
def pegar_usuario_id(usuario_id): #verificar se precisar alterar em mais lugar
    return get_usuario_id(usuario_id) 

@router.post("update")
def atualizar_usuario_id (user: UserResponse):
    return update_usuario_id(user)