# app/
- Diretório principal do backend
- Destinado a agrupar todos os componentes do servidor da aplicação. É uma boa prática separá-lo do front-end, garantindo uma organização mais modular do sistema.

# app.py
- Arquivo principal responsável por rodar a aplicação
- Deve conter a configuração do framework web (FastAPI)
- Deve definir as rotas, middlewares e conectar ao banco de dados

# requirements.txt 
- Gerenciamento de dependências
- Deve ser atualizado sempre que adicionar uma nova dependência: pip freeze > requirements.txt
- Sempre testar a instalação em um ambiente novo: python -m venv venv && pip install -r requirements.txt

# main.py
- ponto de entrada principal da api

# config.py
- configuraçãos do sistema (banco de dados, variáveis de ambiente)
