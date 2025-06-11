DROP TABLE IF EXISTS db_partner_requests;
DROP TABLE IF EXISTS db_report;
DROP TABLE IF EXISTS db_notification;
DROP TABLE IF EXISTS db_item;
DROP TABLE IF EXISTS db_money;
DROP TABLE IF EXISTS db_food;
DROP TABLE IF EXISTS db_donation;
DROP TABLE IF EXISTS db_campaign;
DROP TABLE IF EXISTS db_ong_collaborator;
DROP TABLE IF EXISTS db_partner;
DROP TABLE IF EXISTS db_user;

CREATE TABLE IF NOT EXISTS db_user (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone VARCHAR(20),
   address VARCHAR(255),
   user_type VARCHAR(50),
   user_role VARCHAR(50),
   lgpd_consent_date TIMESTAMP
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
);

-- Tabela de Doações
CREATE TABLE IF NOT EXISTS db_donation (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   description TEXT NOT NULL,
   category ENUM(
          'FOOD',
          'PERISHABLE_FOOD',
          'BED_BATH',
          'CLEANING',
          'PERSONAL_CARE',
          'ELECTRONICS',
          'FURNITURE',
          'HYGIENE',
          'CLOTHING',
          'APPLIANCES'
          ) NOT NULL,
   quantity INT NOT NULL,
   contact_info VARCHAR(255) NULL,
   delivery_description VARCHAR(255) NOT NULL,
   request_date DATETIME NOT NULL,
   arriving_date DATETIME NULL,
   stock_entry_date DATETIME NULL,
   stock_exit_date DATETIME NULL,
   delivery ENUM('PICKUP', 'DELIVERY') NOT NULL,
   status ENUM(
          'PENDING',
          'STOCK',
          'DONATED',
          'ACCEPTED',
          'REJECTED',
          'PENDING_DELIVERY',
          'CANCELED_DELIVERY'
          ) NOT NULL,
   photo_url VARCHAR(255) NOT NULL,
   donor_id INT NOT NULL,
   beneficiary_id INT NULL,
   campaign_id INT NULL,
   FOREIGN KEY (donor_id) REFERENCES db_partner(id),
   FOREIGN KEY (beneficiary_id) REFERENCES db_partner(id),
   FOREIGN KEY (campaign_id) REFERENCES db_campaign(id)
);

-- Tabela de Doação de Alimentos (Herda de Donation)
CREATE TABLE IF NOT EXISTS db_food (
                                       id INT PRIMARY KEY,
                                       isPerishable BOOLEAN NOT NULL,
                                       expirationDate TIMESTAMP,
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
CREATE TABLE db_money (
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