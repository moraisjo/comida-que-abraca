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

INSERT INTO db_ong_collaborator (id, role, admission_date)
VALUES (1, 'ADMIN', CURRENT_TIMESTAMP);

INSERT INTO db_campaign (name, description, address, start_date, end_date, photo_url, status)
VALUES 
('Campanha do Agasalho', 'Distribuição de agasalhos no inverno', 'Rua Central, 200', '2025-06-01', '2025-06-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'ACTIVE'),
('Doação de Alimentos', 'Arrecadação de alimentos para famílias carentes', 'Av. das Nações, 1010', '2025-07-01', '2025-07-15', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'ACTIVE'),
('Natal Solidário', 'Campanha de arrecadação de brinquedos', 'Praça da Paz, 45', '2025-12-01', '2025-12-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Volta às Aulas Solidária', 'Campanha de doação de materiais escolares', 'Rua das Palmeiras, 123', '2025-01-10', '2025-02-10', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Campanha da Saúde', 'Distribuição de kits de higiene e saúde', 'Av. Saúde, 789', '2025-03-01', '2025-03-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'ACTIVE'),
('Páscoa Feliz', 'Arrecadação de chocolates e cestas de Páscoa', 'Rua do Chocolate, 456', '2025-04-01', '2025-04-20', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doe Livros', 'Campanha de incentivo à leitura', 'Biblioteca Central, 500', '2025-05-01', '2025-05-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'ACTIVE'),
('Campanha Janeiro Sem Fome', 'Arrecadação de alimentos para comunidades vulneráveis', 'Rua Esperança, 101', '2024-01-01', '2024-01-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Alimento para Todos', 'Doação de cestas básicas para famílias carentes', 'Avenida do Sol, 55', '2024-01-10', '2024-01-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Solidariedade em Movimento', 'Distribuição de alimentos em comunidades rurais', 'Rua Campo Verde, 200', '2024-01-05', '2024-01-20', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Compartilhe o Amor', 'Campanha de doação de alimentos enlatados', 'Praça da União, 300', '2024-01-12', '2024-01-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Cesta Solidária', 'Distribuição de cestas de alimentos básicos', 'Av. Brasil, 1400', '2024-01-08', '2024-01-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Campanha Contra a Fome', 'Arrecadação de alimentos não perecíveis', 'Rua da Paz, 800', '2024-02-01', '2024-02-29', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Alimento Urgente - ', 'Distribuição rápida de alimentos para famílias em risco', 'Av. Nordeste, 300', '2024-02-03', '2024-02-20', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doação de Esperança', 'Ajuda humanitária com alimentos', 'Rua da Solidariedade, 12', '2024-02-05', '2024-02-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Ajuda que Alimenta', 'Distribuição de arroz, feijão e óleo', 'Av. Central, 444', '2024-02-10', '2024-02-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Fevereiro Solidário', 'Campanha de arrecadação de alimentos para idosos', 'Rua dos Idosos, 75', '2024-02-07', '2024-02-26', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Março Solidário', 'Campanha mensal de alimentos básicos', 'Av. Humanitária, 123', '2024-03-01', '2024-03-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Combate à Fome', 'Doação de alimentos secos', 'Rua do Bem, 300', '2024-03-05', '2024-03-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Juntos Contra a Fome', 'Campanha de alimentos e água', 'Praça da Vitória, 55', '2024-03-08', '2024-03-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Sacolão Solidário', 'Arrecadação de alimentos para famílias em crise', 'Av. União, 456', '2024-03-10', '2024-03-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doação Coletiva', 'Alimentos para comunidades indígenas', 'Rua da Floresta, 600', '2024-03-15', '2024-03-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Junho Sem Fome', 'Campanha alimentar para comunidades isoladas', 'Av. Esperança, 456', '2024-06-01', '2024-06-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Alimento é Amor - Junho', 'Doação de mantimentos para lares de acolhimento', 'Rua da Luz, 77', '2024-06-03', '2024-06-27', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Campanha do Arroz - Junho', 'Campanha especial de arrecadação de arroz', 'Av. Central, 91', '2024-06-05', '2024-06-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('São João Solidário', 'Distribuição de alimentos típicos de festa junina', 'Rua do Forró, 202', '2024-06-10', '2024-06-29', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doação Mensal - Junho', 'Arrecadação contínua de alimentos variados', 'Praça Popular, 111', '2024-06-12', '2024-06-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Julho Solidário', 'Distribuição de alimentos para desempregados', 'Av. da Inclusão, 88', '2024-07-01', '2024-07-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Cozinha do Povo - Julho', 'Alimentos para cozinhas comunitárias', 'Rua dos Sabores, 303', '2024-07-03', '2024-07-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doação em Dobro - Agosto', 'Incentivo à arrecadação em dobro', 'Av. dos Amigos, 120', '2024-08-05', '2024-08-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doação e Ação - Setembro', 'Campanha ativa de alimentos', 'Av. Trabalho, 75', '2024-09-05', '2024-09-28', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Setembro Sustentável', 'Distribuição de alimentos orgânicos e secos', 'Rua Natureza, 22', '2024-09-08', '2024-09-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED');


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
('Transferência bancária extra', '2025-08-15', 'DELIVERY', 'PENDING_DELIVERY', 3, 2, NULL), -- ID = 9
('Kits escolares', '2025-01-15', 'DELIVERY', 'DONATED', 2, 3, 4), -- ID = 10
('Livros Infantis', '2025-05-10', 'DELIVERY', 'ACCEPTED', 4, 2, 7), -- ID = 11
('Cestas de higiene', '2025-03-10', 'PICKUP', 'ACCEPTED', 3, 1, 5), -- ID = 12
('Chocolates de Páscoa', '2025-04-10', 'DELIVERY', 'DONATED', 5, 3, 6), -- ID = 13
('Livros Técnicos', '2025-05-20', 'DELIVERY', 'PENDING_DELIVERY', 1, 2, 7), -- ID = 14
('Doação espontânea em dinheiro', '2025-06-01', 'PICKUP', 'STOCK', 6, 1, NULL), -- ID = 15
('Pix voluntário', '2025-06-03', 'DELIVERY', 'ACCEPTED', 2, 3, NULL), -- ID = 16
('Transferência bancária solidária', '2025-06-07', 'DELIVERY', 'PENDING_DELIVERY', 3, 1, NULL), -- ID = 17
('Toucas de Lã', '2025-06-03', 'DELIVERY', 'ACCEPTED', 1, 3, 1),
('Meias Térmicas', '2025-06-12', 'PICKUP', 'STOCK', 3, 2, 1),
('Luvas de Inverno', '2025-06-22', 'DELIVERY', 'PENDING_DELIVERY', 5, 1, 1),
('Arroz', '2025-07-02', 'DELIVERY', 'ACCEPTED', 2, 3, 2),
('Feijão', '2025-07-02', 'DELIVERY', 'ACCEPTED', 2, 3, 2),
('Enlatados', '2025-07-10', 'PICKUP', 'STOCK', 4, 1, 2),
('Óleo de Cozinha', '2025-07-14', 'DELIVERY', 'DONATED', 6, 2, 2),
('Bolas de Natal', '2025-12-05', 'DELIVERY', 'ACCEPTED', 3, 1, 3),
('Jogos Educativos', '2025-12-12', 'DELIVERY', 'PENDING_DELIVERY', 5, 3, 3),
('Pelúcias', '2025-12-23', 'PICKUP', 'STOCK', 6, 2, 3),
('Mochilas Novas', '2025-01-18', 'DELIVERY', 'DONATED', 2, 1, 4),
('Lápis e Canetas', '2025-01-25', 'PICKUP', 'ACCEPTED', 3, 2, 4),
('Cadernos', '2025-02-05', 'DELIVERY', 'PENDING_DELIVERY', 1, 3, 4),
('Sabonetes Antibacterianos', '2025-03-05', 'DELIVERY', 'ACCEPTED', 4, 3, 5),
('Máscaras de Tecido', '2025-03-18', 'PICKUP', 'STOCK', 5, 2, 5),
('Álcool em Gel', '2025-03-28', 'DELIVERY', 'DONATED', 6, 1, 5),
('Cestas de Chocolates', '2025-04-05', 'DELIVERY', 'DONATED', 1, 3, 6),
('Ovos de Páscoa', '2025-04-10', 'DELIVERY', 'PENDING_DELIVERY', 2, 1, 6),
('Brinquedos Temáticos', '2025-04-18', 'PICKUP', 'ACCEPTED', 3, 2, 6),
('Romances Clássicos', '2025-05-04', 'DELIVERY', 'ACCEPTED', 4, 1, 7),
('Livros Infantis', '2025-05-15', 'PICKUP', 'STOCK', 6, 2, 7),
('HQs e Mangás', '2025-05-30', 'DELIVERY', 'DONATED', 5, 3, 7),
('Arroz', '2025-06-10', 'DELIVERY', 'DONATED', 1, 2, 1),
('Feijão', '2025-07-05', 'DELIVERY', 'ACCEPTED', 2, 3, 2),
('Macarrão', '2025-12-20', 'PICKUP', 'DONATED', 3, 1, 3),
('Leite em pó', '2025-01-20', 'DELIVERY', 'STOCK', 4, 2, 4),
('Óleo de soja', '2025-03-10', 'DELIVERY', 'ACCEPTED', 5, 6, 5),
('Achocolatado', '2025-04-10', 'PICKUP', 'DONATED', 2, 3, 6),
('Farinha de trigo', '2025-05-15', 'DELIVERY', 'ACCEPTED', 6, 4, 7),
('Feijão preto', '2024-01-15', 'DELIVERY', 'STOCK', 1, 3, 8),
('Arroz integral', '2024-01-20', 'PICKUP', 'DONATED', 2, 5, 9),
('Açúcar', '2024-01-10', 'DELIVERY', 'ACCEPTED', 3, 6, 10),
('Café', '2024-01-15', 'PICKUP', 'DONATED', 4, 2, 11),
('Sal', '2024-01-20', 'DELIVERY', 'STOCK', 5, 1, 12),
('Biscoitos', '2024-02-10', 'DELIVERY', 'DONATED', 6, 4, 13),
('Molho de tomate', '2024-02-05', 'PICKUP', 'ACCEPTED', 1, 6, 14),
('Fubá', '2024-02-20', 'DELIVERY', 'DONATED', 2, 3, 15),
('Milho em conserva', '2024-02-15', 'DELIVERY', 'STOCK', 3, 5, 16),
('Pó de café', '2024-02-20', 'PICKUP', 'ACCEPTED', 4, 1, 17),
('Extrato de tomate', '2024-03-05', 'DELIVERY', 'DONATED', 5, 2, 18),
('Ervilha', '2024-03-15', 'DELIVERY', 'ACCEPTED', 6, 3, 19),
('Sardinha enlatada', '2024-03-20', 'PICKUP', 'DONATED', 1, 4, 20),
('Presunto enlatado', '2024-03-25', 'DELIVERY', 'STOCK', 2, 5, 21),
('Cereal', '2024-03-30', 'DELIVERY', 'DONATED', 3, 6, 22),
('Margarina', '2024-06-15', 'PICKUP', 'ACCEPTED', 4, 1, 23),
('Batata', '2024-06-10', 'DELIVERY', 'DONATED', 5, 2, 24),
('Cenoura', '2024-06-25', 'DELIVERY', 'STOCK', 6, 3, 25),
('Beterraba', '2024-06-20', 'PICKUP', 'ACCEPTED', 1, 4, 26),
('Repolho', '2024-06-18', 'DELIVERY', 'DONATED', 2, 5, 27),
('Pão', '2024-06-30', 'DELIVERY', 'DONATED', 3, 6, 28),
('Queijo', '2024-07-10', 'PICKUP', 'STOCK', 4, 1, 29),
('Iogurte', '2024-07-15', 'DELIVERY', 'ACCEPTED', 5, 2, 30),
('Frango congelado', '2024-07-18', 'DELIVERY', 'DONATED', 6, 3, 31),
('Carne moída', '2024-07-22', 'PICKUP', 'DONATED', 1, 4, 32),
('Arroz', '2024-07-25', 'DELIVERY', 'DONATED', 2, 5, 30),
('Feijão', '2024-07-27', 'DELIVERY', 'ACCEPTED', 3, 6, 30),
('Macarrão', '2024-07-28', 'PICKUP', 'STOCK', 4, 1, 30);

INSERT INTO db_food (id, is_perishable, expiration, quantity, unit, category) VALUES
(40, TRUE, '2025-09-10', 5.0, 'KG', 'GRAINS'),
(41, TRUE, '2025-10-05', 5.0, 'KG', 'GRAINS'),
(42, TRUE, '2025-12-20', 3.0, 'KG', 'GRAINS'),
(43, TRUE, '2025-04-20', 2.0, 'KG', 'MILK'),
(44, TRUE, '2025-07-10', 1.0, 'KG', 'GRAINS'),
(45, FALSE, NULL, 2.0, 'PACKAGE', 'MILK'),
(46, TRUE, '2025-09-15', 3.0, 'KG', 'GRAINS'),
(47, TRUE, '2024-04-15', 5.0, 'KG', 'GRAINS'),
(48, TRUE, '2024-04-20', 4.0, 'KG', 'GRAINS'),
(49, TRUE, '2024-03-10', 3.0, 'KG', 'GRAINS'),
(50, FALSE, NULL, 2.0, 'KG', 'MILK'),
(51, FALSE, NULL, 1.0, 'KG', 'GRAINS'),
(52, FALSE, NULL, 3.0, 'PACKAGE', 'GRAINS'),
(53, FALSE, NULL, 2.0, 'PACKAGE', 'GRAINS'),
(54, TRUE, '2024-04-20', 2.5, 'KG', 'GRAINS'),
(55, FALSE, NULL, 2.0, 'PACKAGE', 'GRAINS'),
(56, FALSE, NULL, 1.0, 'KG', 'GRAINS'),
(57, FALSE, NULL, 1.5, 'PACKAGE', 'GRAINS'),
(58, TRUE, '2024-06-15', 2.0, 'KG', 'GRAINS'),
(59, FALSE, NULL, 1.5, 'UNIT', 'GRAINS'),
(60, FALSE, NULL, 1.0, 'UNIT', 'GRAINS'),
(61, FALSE, NULL, 2.0, 'PACKAGE', 'GRAINS'),
(62, TRUE, '2024-07-15', 1.5, 'KG', 'MILK'),
(63, TRUE, '2024-06-15', 4.0, 'KG', 'FRUITS'),
(64, TRUE, '2024-07-05', 4.0, 'KG', 'FRUITS'),
(65, TRUE, '2024-07-05', 3.5, 'KG', 'FRUITS'),
(66, TRUE, '2024-07-10', 3.0, 'KG', 'FRUITS'),
(67, FALSE, NULL, 6.0, 'UNIT', 'GRAINS'),
(68, TRUE, '2024-07-25', 1.5, 'KG', 'MILK'),
(69, TRUE, '2024-07-20', 2.0, 'KG', 'MILK'),
(70, TRUE, '2024-07-25', 5.0, 'KG', 'GRAINS'),
(71, TRUE, '2024-07-28', 5.0, 'KG', 'GRAINS'),
(72, TRUE, '2024-08-25', 5.0, 'KG', 'GRAINS'),
(73, TRUE, '2024-08-27', 5.0, 'KG', 'GRAINS'),
(74, TRUE, '2024-08-28', 3.0, 'KG', 'GRAINS');


INSERT INTO db_money (id, value, category)
VALUES
(4, 150.00, 'PIX'),
(5, 100.00, 'CASH'),
(6, 200.00, 'TRANSFER'),
(7, 75.00, 'PIX'),
(8, 120.00, 'CASH'),
(9, 180.00, 'TRANSFER');