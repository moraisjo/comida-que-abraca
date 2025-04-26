CREATE DATABASE comidaqueabraca;
USE comidaqueabraca;

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

CREATE TABLE db_user (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(20),
   address_id INT,
   FOREIGN KEY (address_id) REFERENCES db_address(id) -- Menção "Address address" que a classe recebe;
   -- Pensar em menção para todas as tabelas que levam address como FK;
);

-- Tabela de Parceiro (Herda de User)
CREATE TABLE db_partner (
    id INT PRIMARY KEY,  -- Usa o mesmo ID do db_user
    wants_to_donate BOOLEAN NOT NULL,
    wants_to_receive_donations BOOLEAN NOT NULL,
    registration_date TIMESTAMP,
    legal_entity_type ENUM('ONG', 'COMPANY', 'INDIVIDUAL', 'GOVERNMENT') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_user(id) ON DELETE CASCADE
);

-- Tabela de Colaboradores da ONG (Herda de User)
CREATE TABLE db_ong_collaborator (
    id INT PRIMARY KEY,
    role ENUM('ADMIN', 'COLLABORATOR') NOT NULL,
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES db_user(id) ON DELETE CASCADE
);

-- Tabela de Campanhas
CREATE TABLE db_campaign (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address_id INT,
    start_date DATE NOT NULL, -- Validação (tem alguma annotation?) para (start_date < end_date)
    end_date DATE NOT NULL,
    photo_url VARCHAR(255),
    status ENUM('ACTIVE', 'FINISHED', 'CANCELED') NOT NULL,
    FOREIGN KEY (address_id) REFERENCES db_address(id)
);

-- Tabela de Doações
CREATE TABLE db_donation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    arriving_date DATE NOT NULL,
    delivery ENUM('PICKUP', 'DELIVERY') NOT NULL,
    status ENUM('PENDING', 'STOCK', 'DONATED') NOT NULL,
    donor_id INT,
    beneficiary_id INT,
    campaign_id INT,
    FOREIGN KEY (donor_id) REFERENCES db_partner(id),
    FOREIGN KEY (beneficiary_id) REFERENCES db_partner(id),
    FOREIGN KEY (campaign_id) REFERENCES db_campaign(id)
);

-- Tabela de Doação de Alimentos (Herda de Donation)
CREATE TABLE db_food (
    id INT PRIMARY KEY,
    is_perishable BOOLEAN NOT NULL,
    expiration TIMESTAMP,
    quantity FLOAT NOT NULL,
    unit ENUM('KG', 'PACKAGE', 'UNIT') NOT NULL,
    category ENUM('FRUITS', 'GRAINS', 'MILK') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Tabela de Itens (Herda de Donation)
CREATE TABLE db_item (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    category ENUM('CLOTHING', 'FURNITURE', 'APPLIANCES', 'ELECTRONICS') NOT NULL, -- 'Roupa', 'Móvel', 'Eletrodoméstico', 'Eletrônico'
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Tabela de Doação em Dinheiro (Herda de Donation)
CREATE TABLE db_money (
    id BIGINT PRIMARY KEY,
    value FLOAT NOT NULL,
    category ENUM('PIX', 'CASH', 'TRANSFER') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Notifications Table
CREATE TABLE db_notification (
    id INT PRIMARY KEY,
    message TEXT NOT NULL,
    sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES db_user(id)
);

-- Tabela de Relatórios
CREATE TABLE db_report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL
);

ALTER TABLE db_user ADD COLUMN user_type VARCHAR(50);