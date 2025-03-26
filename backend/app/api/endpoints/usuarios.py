from fastapi import APIRouter, Depends
from app.schemas.usuario import UserCreate, UserBase, UserUpdate
from app.services.user_services import create_user, get_usuario, get_usuario_id, update_user, delete_user
from app.core.security import get_current_user

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
@router.get("/", dependencies=[Depends(get_current_user)])
def listar_usuarios():
    return get_usuario()

"""
Endpoint destinado a retornar dados de um usuário
@JvReis
"""
@router.get("/get/{usuario_id}", dependencies=[Depends(get_current_user)]) 
def pegar_usuario(usuario_id):
    return get_usuario_id(usuario_id) 

"""
Endpoint destinado a atualizar os dados de um usuário
@JvReis
"""
@router.post("/update", dependencies=[Depends(get_current_user)])
def atualizar_usuario (user: UserUpdate):
    return update_user(user)

"""
Endpoint destinado a excluir um registro de usuário
@AnotherOne07
"""
@router.delete("/delete/{usuario_id}", dependencies=[Depends(get_current_user)])
def deletar_usuario(usuario_id):
    return delete_user(usuario_id)