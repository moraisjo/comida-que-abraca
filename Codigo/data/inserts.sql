-- Insert mocked data into db_user
-- NOTE: PASSWORD IS ENCRYPTED, USE 'Teste123!' FOR ALL USERS
INSERT INTO comidaqueabraca.db_user (name, email, password, phone, address, user_type)
VALUES
('João Silva', 'joao.silva@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '11999999999', 'Rua das Flores, 123', 'PARTNER'),
('Maria Oliveira', 'maria.oliveira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '21988888888', 'Avenida Brasil, 456', 'PARTNER'),
('Carlos Pereira', 'carlos.pereira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '31977777777', 'Praça da Liberdade, 789', 'PARTNER'),
('Ana Costa', 'ana.costa@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '41966666666', 'Rua do Sol, 101', 'PARTNER'),
('Pedro Santos', 'pedro.santos@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '51955555555', 'Avenida Central, 202', 'PARTNER'),
('Fernanda Lima', 'fernanda.lima@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '61944444444', 'Rua das Palmeiras, 303', 'PARTNER'),
('Rafael Almeida', 'rafael.almeida@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '71933333333', 'Praça do Mercado, 404', 'PARTNER'),
('Juliana Souza', 'juliana.souza@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '81922222222', 'Avenida Paulista, 505', 'PARTNER'),
('Lucas Rocha', 'lucas.rocha@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '91911111111', 'Rua das Acácias, 606', 'PARTNER'),
('Mariana Ribeiro', 'mariana.ribeiro@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '10199999999', 'Praça da Alegria, 707', 'PARTNER');

-- Insert mocked data into db_partner
INSERT INTO comidaqueabraca.db_partner (id, wants_to_donate, wants_to_receive_donations, registration_date, legal_entity_type)
VALUES
(1, TRUE, FALSE, CURRENT_TIMESTAMP, 'ONG'),
(2, FALSE, TRUE, CURRENT_TIMESTAMP, 'COMPANY'),
(3, TRUE, FALSE, CURRENT_TIMESTAMP, 'INDIVIDUAL'),
(4, TRUE, FALSE, CURRENT_TIMESTAMP, 'ONG'),
(5, FALSE, TRUE, CURRENT_TIMESTAMP, 'COMPANY'),
(6, TRUE, FALSE, CURRENT_TIMESTAMP, 'INDIVIDUAL'),
(7, TRUE, FALSE, CURRENT_TIMESTAMP, 'ONG'),
(8, FALSE, TRUE, CURRENT_TIMESTAMP, 'COMPANY'),
(9, TRUE, TRUE, CURRENT_TIMESTAMP, 'INDIVIDUAL'),
(10, TRUE, FALSE, CURRENT_TIMESTAMP, 'ONG');

