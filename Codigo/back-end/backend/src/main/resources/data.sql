CREATE DATABASE comidaqueabraca;
USE comidaqueabraca;

-- Tabela de Endereço
CREATE TABLE db_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255),
    neighborhood VARCHAR(255),
    number INT,
    complement VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(100),
    zip_code VARCHAR(20) NOT NULL
);

-- Tabela de Usuário
CREATE TABLE User (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      nome VARCHAR(255) NOT NULL,
                      email VARCHAR(255) UNIQUE NOT NULL,
                      senha VARCHAR(255) NOT NULL,
                      telefone VARCHAR(20),
                      endereco_id INT,
                      FOREIGN KEY (endereco_id) REFERENCES Address(id)
);

-- Tabela de Parceiro (Herda de User)
CREATE TABLE Partner (
                         id INT PRIMARY KEY,
                         tipo ENUM('ONG', 'Empresa', 'Pessoa Física') NOT NULL,
                         querDoar BOOLEAN NOT NULL,
                         querReceberDoacao BOOLEAN NOT NULL,
                         data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (id) REFERENCES User(id)
);

-- Tabela de Colaboradores da ONG (Herda de User)
CREATE TABLE OngCollaborator (
                                 id INT PRIMARY KEY,
                                 cargo ENUM('ADMIN', 'COLABORADOR') NOT NULL,
                                 data_admissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 FOREIGN KEY (id) REFERENCES User(id)
);

-- Tabela de Campanhas
CREATE TABLE Campaign (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(255) NOT NULL,
                          descricao TEXT,
                          endereco_id INT,
                          data_inicio DATE NOT NULL,
                          data_fim DATE NOT NULL,
                          foto_url VARCHAR(255),
                          status ENUM('Ativa', 'Finalizada', 'Cancelada') NOT NULL,
                          FOREIGN KEY (endereco_id) REFERENCES Address(id)
);

-- Tabela de Doações
CREATE TABLE Donation (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(255) NOT NULL,
                          doador_id INT,
                          data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          entrega ENUM('RETIRADA', 'ENTREGA') NOT NULL,
                          status ENUM('PENDENTE', 'ESTOQUE', 'DOADO') NOT NULL,
                          id_beneficiario INT,
                          id_campanha INT,
                          FOREIGN KEY (doador_id) REFERENCES Partner(id),
                          FOREIGN KEY (id_beneficiario) REFERENCES Partner(id),
                          FOREIGN KEY (id_campanha) REFERENCES Campaign(id)
);

-- Tabela de Doação de Alimentos (Herda de Donation)
CREATE TABLE Food (
                      id INT PRIMARY KEY,
                      ehPerecivel BOOLEAN NOT NULL,
                      vencimento TIMESTAMP,
                      quantidade FLOAT NOT NULL,
                      unidade ENUM('kg', 'pacote', 'unidade') NOT NULL,
                      categoria ENUM('Frutas', 'Grãos', 'Laticínios') NOT NULL,
                      FOREIGN KEY (id) REFERENCES Donation(id)
);

-- Tabela de Itens (Herda de Donation)
CREATE TABLE Item (
                      id INT PRIMARY KEY,
                      quantidade INT NOT NULL,
                      categoria ENUM('Roupa', 'Móvel', 'Eletrodoméstico', 'Eletrônico') NOT NULL,
                      FOREIGN KEY (id) REFERENCES Donation(id)
);

-- Tabela de Doação em Dinheiro (Herda de Donation)
CREATE TABLE money (
                       id BIGINT PRIMARY KEY,
                       valor FLOAT NOT NULL,
                       categoria ENUM('PIX', 'Dinheiro físico', 'Transferência') NOT NULL,
                       FOREIGN KEY (id) REFERENCES donation(id) ON DELETE CASCADE
);


-- Tabela de Solicitação de Doação
CREATE TABLE Donation (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          doador_id INT,
                          nome VARCHAR(255) NOT NULL,
                          quantidade INT NOT NULL,
                          data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          entrega ENUM('RETIRADA', 'ENTREGA') NOT NULL,
                          status ENUM('PENDENTE', '‘ESTOQUE’', '‘DOADO’', 'EXPIRADA') NOT NULL,
                          id_beneficiario INT,
                          id_campanha INT,
                          FOREIGN KEY (doador_id) REFERENCES Partner(id),
                          FOREIGN KEY (id_beneficiario) REFERENCES Partner(id),
                          FOREIGN KEY (id_campanha) REFERENCES Campaign(id)
);


-- Tabela de Notificações
CREATE TABLE Notification (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              usuario_id INT,
                              mensagem TEXT NOT NULL,
                              data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (usuario_id) REFERENCES User(id)
);

-- Tabela de Relatórios
CREATE TABLE Report (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        data_inicio TIMESTAMP NOT NULL,
                        data_fim TIMESTAMP NOT NULL,
                        arquivo_url VARCHAR(255) NOT NULL
);
