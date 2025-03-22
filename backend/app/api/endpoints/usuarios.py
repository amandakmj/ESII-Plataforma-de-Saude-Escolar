from fastapi import APIRouter, HTTPException, Depends
from app.schemas.usuario import UserCreate, UserBase, UserResponse
from app.services.user_services import create_user, get_usuario, get_usuario_id, update_user, delete_user

router = APIRouter()

"""
Endpoint destinado a criação de um novo usuário
@JvReis
"""
@router.post("/create")
def criar_novo_usuario(user: UserCreate):
    return create_user(user)

"""
Endpoint destinado a retornar uma lista de usuários
@JvReis
"""
@router.get("/")
def listar_usuarios():
    return get_usuario()

"""
Endpoint destinado a retornar dados de um usuário
@JvReis
"""
@router.get("/get/{usuario_id}") 
def pegar_usuario(usuario_id):
    return get_usuario_id(usuario_id) 

"""
Endpoint destinado a atualizar os dados de um usuário
@JvReis
"""
@router.put("/update")
def atualizar_usuario (user: UserResponse):
    return update_user(user)

"""
Endpoint destinado a excluir um registro de usuário
@AnotherOne07
"""
@router.delete("/delete/{usuario_id}")
def deletar_usuario(usuario_id):
    return delete_user(usuario_id)