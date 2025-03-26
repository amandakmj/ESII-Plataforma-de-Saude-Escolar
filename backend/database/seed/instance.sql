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

CREATE TABLE escola (
    id SERIAL NOT NULL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    cnpj VARCHAR(100) NOT NULL,
    telefone VARCHAR(100) NOT NULL
);

CREATE TABLE responsavel (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE aluno (
    id SERIAL NOT NULL PRIMARY KEY,
    matricula VARCHAR(15) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL
);

CREATE TABLE saude ( 
    id SERIAL NOT NULL PRIMARY KEY,
    altura FLOAT,
    peso FLOAT,
    imc FLOAT,
    alergias VARCHAR(300),
    atividade_fisica VARCHAR(200),
    doencas_cronicas VARCHAR(100),
    medicamentos_continuos VARCHAR(100),
    cirugiais_internacoes VARCHAR(100),
    vacinas VARCHAR(200),
    deficiencias_necessidades VARCHAR(200),
    plano_saude VARCHAR(100),
    aluno_id INT NOT NULL,  -- Mantém a coluna aluno_id
    matricula VARCHAR(15),  -- Adiciona a coluna matricula (não mais com NOT NULL neste momento)
    FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,  -- Chave estrangeira para aluno_id
    FOREIGN KEY (matricula) REFERENCES aluno(matricula) ON DELETE CASCADE  -- Chave estrangeira para matricula
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
    escola_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (escola_id) REFERENCES escola(id) ON DELETE CASCADE,
);

CREATE TABLE professor (
    id SERIAL NOT NULL PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE turma (
    id SERIAL NOT NULL PRIMARY KEY,
    codigo VARCHAR (10) NOT NULL,
    serie VARCHAR(100),
    escola_id INT NOT NULL,
    FOREIGN KEY (escola_id) REFERENCES escola(id) ON DELETE CASCADE
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
    data_criacao TIMESTAMP NOT NULL,
    responsavel_id INT NOT NULL,
    visualizado TINYINT NOT NULL DEFAULT 0,
    remetente TINYINT NOT NULL,
    FOREIGN KEY (responsavel_id) REFERENCES responsavel(id) ON DELETE CASCADE
);

CREATE VIEW relatorio_individual_aluno AS
SELECT 
    a.id AS aluno_id,
    a.matricula,
    a.data_nascimento,  
    saude.altura,
    saude.peso,
    saude.imc,
    saude.alergias,
    saude.atividade_fisica,
    saude.doencas_cronicas,
    saude.medicamentos_continuos,
    saude.cirugiais_internacoes,
    saude.vacinas,
    saude.deficiencias_necessidades,
    saude.plano_saude,
    u.email AS email_responsavel  -- Adiciona o email do responsável
FROM aluno a
JOIN saude saude ON a.id = saude.aluno_id
JOIN responsavel r ON r.usuario_id = (SELECT id FROM usuario WHERE id = r.usuario_id)
JOIN usuario u ON r.usuario_id = u.id;  -- Faz o JOIN com a tabela usuario para pegar o email

CREATE TABLE aluno_turma (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL,
    turma_id INT NOT NULL,
    FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turma(id) ON DELETE CASCADE,
    UNIQUE (aluno_id, turma_id) -- Garante que um aluno não seja adicionado duas vezes à mesma turma
);


CREATE VIEW relatorio_geral AS
SELECT 
    AVG(altura) AS media_altura,
    AVG(peso) AS media_peso,
    AVG(imc) AS media_imc,
    
    STRING_AGG(DISTINCT alergias, ', ') AS alergias,

    STRING_AGG(DISTINCT doencas_cronicas, ', ') AS doencas_cronicas,

    STRING_AGG(DISTINCT deficiencias_necessidades, ', ') AS deficiencias_necessidades
FROM saude;

CREATE OR REPLACE VIEW relatorio_saude_turma AS
SELECT 
    t.id AS turma_id,
    t.codigo AS codigo_turma,
    COUNT(a.id) AS total_alunos,
    AVG(s.altura) AS media_altura,
    AVG(s.peso) AS media_peso,
    AVG(s.imc) AS media_imc,
    STRING_AGG(DISTINCT s.alergias, ', ') AS alergias,
    STRING_AGG(DISTINCT s.doencasCronicas, ', ') AS doencas_cronicas,
    STRING_AGG(DISTINCT s.deficienciasNecessidades, ', ') AS deficiencias_necessidades
FROM turma t
JOIN aluno_turma at ON t.id = at.turma_id
JOIN aluno a ON at.aluno_id = a.id
LEFT JOIN saude s ON a.id = s.aluno_id
GROUP BY t.id, t.codigo;
