-- Inserção dos usuários
INSERT INTO db_user (id, name, email, password, phone, address, user_type)
VALUES
(1, 'João Silva', 'joao.silva@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '11999999999', 'Rua das Flores, 123', 'COLLABORATOR'),
(2, 'Maria Oliveira', 'maria.oliveira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '21988888888', 'Avenida Brasil, 456', 'PARTNER'),
(3, 'Carlos Pereira', 'carlos.pereira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '31977777777', 'Praça da Liberdade, 789', 'PARTNER'),
(4, 'Ana Costa', 'ana.costa@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '41966666666', 'Rua do Sol, 101', 'PARTNER'),
(5, 'Pedro Santos', 'pedro.santos@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '51955555555', 'Avenida Central, 202', 'PARTNER'),
(6, 'Fernanda Lima', 'fernanda.lima@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '61944444444', 'Rua das Palmeiras, 303', 'PARTNER'),
(7, 'Rafael Almeida', 'rafael.almeida@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '71933333333', 'Praça do Mercado, 404', 'PARTNER'),
(8, 'Juliana Souza', 'juliana.souza@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '81922222222', 'Avenida Paulista, 505', 'PARTNER'),
(9, 'Lucas Rocha', 'lucas.rocha@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '91911111111', 'Rua das Acácias, 606', 'PARTNER'),
(10, 'Mariana Ribeiro', 'mariana.ribeiro@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '10199999999', 'Praça da Alegria, 707', 'PARTNER');

-- Inserção dos parceiros com diferentes tipos de entidade legal
INSERT INTO db_partner (id, wants_to_donate, wants_to_receive_donations, registration_date, legal_entity_type)
VALUES
(1, true, true, NOW(), 'ONG'),
(2, true, false, NOW(), 'COMPANY'),
(3, false, true, NOW(), 'INDIVIDUAL'),
(4, true, true, NOW(), 'GOVERNMENT'),
(5, false, true, NOW(), 'ONG'),
(6, true, false, NOW(), 'COMPANY'),
(7, true, true, NOW(), 'INDIVIDUAL'),
(8, false, true, NOW(), 'GOVERNMENT'),
(9, true, false, NOW(), 'ONG'),
(10, true, true, NOW(), 'COMPANY');

-- Inserindo colaborador da ONG (herda do usuário acima)
INSERT INTO db_ong_collaborator (id, role, admission_date)
VALUES (1, 'ADMIN', CURRENT_TIMESTAMP);

INSERT INTO db_campaign (name, description, address, start_date, end_date, photo_url, status)
VALUES 
('Campanha do Agasalho', 'Distribuição de agasalhos no inverno', 'Rua Central, 200', '2025-06-01', '2025-06-30', 'https://exemplo.com/foto1.jpg', 'ACTIVE'),
('Doação de Alimentos', 'Arrecadação de alimentos para famílias carentes', 'Av. das Nações, 1010', '2025-07-01', '2025-07-15', 'https://exemplo.com/foto2.jpg', 'ACTIVE'),
('Natal Solidário', 'Campanha de arrecadação de brinquedos', 'Praça da Paz, 45', '2025-12-01', '2025-12-25', 'https://exemplo.com/foto3.jpg', 'FINISHED');

INSERT INTO db_donation (name, arriving_date, delivery, status, donor_id, beneficiary_id, campaign_id)
VALUES 
('Cobertores Quentes', '2025-06-05', 'DELIVERY', 'ACCEPTED', 1, 2, 1),
('Cestas Básicas', '2025-07-10', 'PICKUP', 'STOCK', 2, 1, 2),
('Brinquedos de Natal', '2025-12-10', 'DELIVERY', 'DONATED', 3, 2, 3), 
('Doação em Pix', '2025-06-15', 'DELIVERY', 'ACCEPTED', 4, 1, 1), -- ID = 4
('Dinheiro em espécie', '2025-07-05', 'PICKUP', 'PENDING', 5, 2, 2), -- ID = 5
('Transferência bancária', '2025-12-20', 'DELIVERY', 'PENDING_DELIVERY', 6, 1, 3), -- ID = 6
('Doação avulsa via Pix', '2025-08-01', 'DELIVERY', 'ACCEPTED', 1, 2, NULL),  -- ID = 7
('Ajuda emergencial em dinheiro', '2025-08-10', 'PICKUP', 'STOCK', 2, 1, NULL), -- ID = 8
('Transferência bancária extra', '2025-08-15', 'DELIVERY', 'PENDING_DELIVERY', 3, 2, NULL); -- ID = 9

-- Doações financeiras específicas (ligadas às doações acima)
INSERT INTO db_money (id, value, category)
VALUES
(4, 150.00, 'PIX'),
(5, 100.00, 'CASH'),
(6, 200.00, 'TRANSFER'),
(7, 75.00, 'PIX'),
(8, 120.00, 'CASH'),
(9, 180.00, 'TRANSFER');