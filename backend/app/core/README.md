# /core
- Destinado a armazenar as configurações e componentes centrais da aplicação

## config.py
- Contém as configurações principais da aplicação, como variáveis de ambiente, chaves de acesso, configurações de banco de dados.

## database.py
- Responsável pela configuração do banco de dados, como a criação de conexão com o PostgreSQL e o gerenciamento da engine assíncrona de conexão com o banco de dados. Contém também a inicialização de tabelas, incluindo migrações e configurações de ORM (SQLAlchemy).