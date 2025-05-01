## Usuário
## NOTE: PASSWORD IS ENCRYPTED, USE 'Teste123!' FOR ALL USERS
INSERT INTO db_user (name, email, password, phone, address, user_type)
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

## Parceiro (Partner)
INSERT INTO db_partner (id, wants_to_donate, wants_to_receive_donations, registration_date, legal_entity_type)
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

# Doação (Donation)
INSERT INTO db_donation (arriving_date, delivery, name, status, beneficiary_id, campaign_id, donor_id, photo_url, request_date)
VALUES
('2024-03-01', 'DELIVERY', 'Cesta básica completa', 'PENDING', NULL, NULL, 3, "url_teste", '2024-02-29'),
('2024-03-02', 'PICKUP', 'Kit de higiene pessoal', 'DONATED', NULL, NULL, 1, "url_teste", '2024-03-01'),
('2024-03-03', 'DELIVERY', 'Roupas de inverno', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-02'),
('2024-03-05', 'PICKUP', 'Alimentos não perecíveis', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-04'),
('2024-03-06', 'DELIVERY', 'Produtos de limpeza', 'STOCK', NULL, NULL, 1, "url_teste", '2024-03-05'),
('2024-03-07', 'DELIVERY', 'Livros infantis', 'PENDING', NULL, NULL, 3, "url_teste", '2024-03-06'),
('2024-03-09', 'DELIVERY', 'Cestas de frutas', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-08'),
('2024-03-10', 'DELIVERY', 'Mochilas escolares', 'DONATED', NULL, NULL, 1, "url_teste", '2024-03-09'),
('2024-03-11', 'PICKUP', 'Pacotes de fraldas', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-10'),
('2024-03-13', 'DELIVERY', 'Sapatos usados', 'DONATED', NULL, NULL, 3, "url_teste", '2024-03-12'),
('2024-03-14', 'PICKUP', 'Cadeiras de rodas', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-13'),
('2024-03-15', 'DELIVERY', 'Roupas infantis', 'STOCK', NULL, NULL, 1, "url_teste", '2024-03-14'),
('2024-03-16', 'DELIVERY', 'Leite em pó', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-15'),
('2024-03-17', 'PICKUP', 'Cobertores térmicos', 'DONATED', NULL, NULL, 3, "url_teste", '2024-03-16'),
('2024-03-19', 'DELIVERY', 'Alimentos orgânicos', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-18'),
('2024-03-20', 'PICKUP', 'Óculos de leitura', 'DONATED', NULL, NULL, 1, "url_teste", '2024-03-19'),
('2024-03-21', 'DELIVERY', 'Instrumentos musicais', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-20'),
('2024-03-22', 'PICKUP', 'Ração para pets', 'STOCK', NULL, NULL, 3, "url_teste", '2024-03-21'),
('2024-03-23', 'DELIVERY', 'Produtos de higiene feminina', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-22'),
('2024-03-25', 'PICKUP', 'Roupas esportivas', 'PENDING', NULL, NULL, 1, "url_teste", '2024-03-24'),
('2024-03-26', 'DELIVERY', 'Pacotes de arroz e feijão', 'DONATED', NULL, NULL, 4, "url_teste", '2024-03-25'),
('2024-03-28', 'PICKUP', 'Cadeiras de alimentação infantil', 'STOCK', NULL, NULL, 3, "url_teste", '2024-03-27'),
('2024-03-29', 'DELIVERY', 'Tênis novos', 'DONATED', NULL, NULL, 5, "url_teste", '2024-03-28'),
('2024-03-30', 'DELIVERY', 'Jogo de lençóis', 'PENDING', NULL, NULL, 1, "url_teste", '2024-03-29'),
('2024-03-31', 'PICKUP', 'Equipamentos esportivos', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-30'),
('2024-03-15', 'DELIVERY', 'Chocolates para páscoa', 'DONATED', NULL, NULL, 3, "url_teste", '2024-03-14'),
('2024-03-18', 'PICKUP', 'Camas de solteiro', 'PENDING', NULL, NULL, 5, "url_teste", '2024-03-17'),
('2024-03-10', 'DELIVERY', 'Bolas e brinquedos', 'DONATED', NULL, NULL, 1, "url_teste", '2024-03-09'),
('2024-03-12', 'PICKUP', 'Panelas e utensílios', 'PENDING', NULL, NULL, 4, "url_teste", '2024-03-11'),
('2024-03-07', 'DELIVERY', 'Máscaras descartáveis', 'STOCK', NULL, NULL, 5, "url_teste", '2024-03-06'),
('2024-03-06', 'DELIVERY', 'Camisetas novas', 'DONATED', NULL, NULL, 3, "url_teste", '2024-03-05'),
('2024-03-03', 'DELIVERY', 'Guarda-chuvas', 'PENDING', NULL, NULL, 1, "url_teste", '2024-03-02'),
('2024-03-05', 'DELIVERY', 'Caixas de sabão em pó', 'DONATED', NULL, NULL, 4, "url_teste", '2024-03-04');