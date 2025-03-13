-- Criar os tipos ENUM antes das tabelas
CREATE TYPE USER_TYPE AS ENUM ('manager', 'instructor', 'parent', 'health_professional');
CREATE TYPE ACESS_LEVEL AS ENUM ('reader', 'admin', 'editor');

-- Agora, crie as tabelas
CREATE TABLE usuario (
    id SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    tipo_usuario USER_TYPE NOT NULL
);

CREATE TABLE responsavel (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE aluno (
    id SERIAL NOT NULL PRIMARY KEY,
    matricula VARCHAR(15) NOT NULL,
    data_nascimento DATE NOT NULL
);

CREATE TABLE saude (
    id SERIAL NOT NULL PRIMARY KEY,
    altura FLOAT,
    peso FLOAT,
    imc FLOAT,
    alergias VARCHAR(500),
    atividade_fisica VARCHAR(100)
);

CREATE TABLE exame_medico (
    id SERIAL NOT NULL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    resultado VARCHAR(1000),
    data_solicitacao DATE NOT NULL,
    data_realizacao DATE
);

CREATE TABLE gestor_escolar (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE professor (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE turma (
    id SERIAL NOT NULL PRIMARY KEY,
    codigo VARCHAR (10) NOT NULL,
    serie VARCHAR(100)
);

CREATE TABLE profissional_saude (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    especialidade VARCHAR(100) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE permissao_usuario (
    id SERIAL NOT NULL PRIMARY KEY,
    tipo_usuario USER_TYPE NOT NULL,
    nivel_acesso ACESS_LEVEL NOT NULL
);

CREATE TABLE alerta (
    id SERIAL NOT NULL PRIMARY KEY,
    mensagem VARCHAR(200),
    data_criacao DATE NOT NULL
);
