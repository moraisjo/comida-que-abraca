DROP TABLE IF EXISTS db_report;
DROP TABLE IF EXISTS db_notification;
DROP TABLE IF EXISTS db_money;
DROP TABLE IF EXISTS db_item;
DROP TABLE IF EXISTS db_food;
DROP TABLE IF EXISTS db_donation;
DROP TABLE IF EXISTS db_campaign;
DROP TABLE IF EXISTS db_ong_collaborator;
DROP TABLE IF EXISTS db_partner;
DROP TABLE IF EXISTS db_user;
DROP TABLE IF EXISTS db_address;

CREATE TABLE IF NOT EXISTS db_address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255),
    neighborhood VARCHAR(255),
    number INT,
    complement VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(100),
    zip_code VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS db_user (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(20),
   address VARCHAR(255),
   address_id INT,
   user_type VARCHAR(50), -- coluna adicionada aqui
   lgpd_consent_date TIMESTAMP
   -- FOREIGN KEY (address_id) REFERENCES db_address(id)
);

-- Tabela de Parceiro (Herda de User)
CREATE TABLE IF NOT EXISTS db_partner (
    id INT PRIMARY KEY,  -- Usa o mesmo ID do db_user
    wants_to_donate BOOLEAN NOT NULL,
    wants_to_receive_donations BOOLEAN NOT NULL,
    registration_date TIMESTAMP,
    legal_entity_type ENUM('ONG', 'COMPANY', 'INDIVIDUAL', 'GOVERNMENT') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_user(id) ON DELETE CASCADE
);

-- Tabela de Colaboradores da ONG (Herda de User)
CREATE TABLE IF NOT EXISTS db_ong_collaborator (
    id INT PRIMARY KEY,
    role ENUM('ADMIN', 'COLLABORATOR') NOT NULL,
    admission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES db_user(id) ON DELETE CASCADE
);

-- Tabela de Campanhas
CREATE TABLE IF NOT EXISTS db_campaign (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255),
    address_id INT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    photo_url VARCHAR(255),
    status ENUM('ACTIVE', 'FINISHED', 'CANCELED') NOT NULL
    -- FOREIGN KEY (address_id) REFERENCES db_address(id)
);

-- Tabela de Doações
CREATE TABLE IF NOT EXISTS db_donation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    arriving_date DATE NOT NULL,
    request_date DATE,
    stock_entry_date DATE,
    stock_exit_date DATE,
    delivery ENUM('PICKUP', 'DELIVERY') NOT NULL,
    status ENUM(
        'PENDING',
        'STOCK',
        'DONATED',
        'ACCEPTED',
        'REJECTED',
        'PENDING_DELIVERY',
        'CANCELED_DELIVERY'
    ) NOT NULL, -- status já com todos os valores possíveis
    photo_url VARCHAR(255),
    donor_id INT,
    beneficiary_id INT,
    campaign_id INT,
    FOREIGN KEY (donor_id) REFERENCES db_partner(id),
    FOREIGN KEY (beneficiary_id) REFERENCES db_partner(id),
    FOREIGN KEY (campaign_id) REFERENCES db_campaign(id)
);

-- Tabela de Doação de Alimentos (Herda de Donation)
CREATE TABLE IF NOT EXISTS db_food (
    id INT PRIMARY KEY,
    is_perishable BOOLEAN NOT NULL,
    expiration TIMESTAMP,
    quantity FLOAT NOT NULL,
    unit ENUM('KG', 'PACKAGE', 'UNIT') NOT NULL,
    category ENUM('FRUITS', 'GRAINS', 'MILK') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Tabela de Itens (Herda de Donation)
CREATE TABLE IF NOT EXISTS db_item (
    id INT PRIMARY KEY,
    quantity INT NOT NULL,
    category ENUM('CLOTHING', 'FURNITURE', 'APPLIANCES', 'ELECTRONICS') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Tabela de Doação em Dinheiro (Herda de Donation)
CREATE TABLE IF NOT EXISTS db_money (
    id INT PRIMARY KEY,
    value FLOAT NOT NULL,
    category ENUM('PIX', 'CASH', 'TRANSFER') NOT NULL,
    FOREIGN KEY (id) REFERENCES db_donation(id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS db_notification (
                                               id INT AUTO_INCREMENT PRIMARY KEY,
                                               user_id INT NOT NULL,
                                               campaign_id INT NOT NULL,
                                               title VARCHAR(100) NOT NULL,
                                               message TEXT NOT NULL,
                                               sent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                                               visualized BOOLEAN NOT NULL DEFAULT FALSE,
                                               visualized_date TIMESTAMP NULL,
                                               FOREIGN KEY (user_id) REFERENCES db_user(id),
                                               FOREIGN KEY (campaign_id) REFERENCES db_campaign(id)
);

CREATE TABLE db_partner_requests (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     item_type VARCHAR(255) NOT NULL,
                                     description TEXT NOT NULL,
                                     user_id INT NOT NULL,
                                     request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     FOREIGN KEY (user_id) REFERENCES db_user(id)
);

-- Tabela de Relatórios
CREATE TABLE IF NOT EXISTS db_report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL
);