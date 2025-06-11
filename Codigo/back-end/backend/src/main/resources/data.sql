-- Inserção dos usuários
INSERT INTO db_user (id, name, email, password, phone, address, user_type, user_role)
VALUES
(1, 'João Silva', 'joao.silva@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '11999999999', 'Rua das Flores, 123', 'COLLABORATOR', 'COLLABORATOR'),
(2, 'Maria Oliveira', 'maria.oliveira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '21988888888', 'Avenida Brasil, 456', 'PARTNER', 'PARTNER'),
(3, 'Carlos Pereira', 'carlos.pereira@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '31977777777', 'Praça da Liberdade, 789', 'PARTNER', 'PARTNER'),
(4, 'Ana Costa', 'ana.costa@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '41966666666', 'Rua do Sol, 101', 'PARTNER', 'PARTNER'),
(5, 'Pedro Santos', 'pedro.santos@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '51955555555', 'Avenida Central, 202', 'PARTNER', 'PARTNER'),
(6, 'Fernanda Lima', 'fernanda.lima@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '61944444444', 'Rua das Palmeiras, 303', 'PARTNER', 'PARTNER'),
(7, 'Rafael Almeida', 'rafael.almeida@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '71933333333', 'Praça do Mercado, 404', 'PARTNER', 'PARTNER'),
(8, 'Juliana Souza', 'juliana.souza@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '81922222222', 'Avenida Paulista, 505', 'PARTNER', 'PARTNER'),
(9, 'Lucas Rocha', 'lucas.rocha@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '91911111111', 'Rua das Acácias, 606', 'PARTNER', 'PARTNER'),
(10, 'Mariana Ribeiro', 'mariana.ribeiro@email.com', '$2a$12$ispiqNuDrD3mWDTSdjJmCepj/tJhBkwXhZMJamYpg4nMN.31yUQBS', '10199999999', 'Praça da Alegria, 707', 'PARTNER', 'PARTNER');


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
('Campanha do Agasalho', 'Distribuição de agasalhos no inverno', 'Rua Central, 200', '2025-06-01', '2025-06-30', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1748809129/rl1ldult7qwenhlzqnf1.jpg', 'ACTIVE'),
('Doação de Alimentos', 'Arrecadação de alimentos para famílias carentes', 'Av. das Nações, 1010', '2025-07-01', '2025-07-15', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1748809236/bv7p8mz7r552yie4jx0a.jpg', 'ACTIVE'),
('Natal Solidário', 'Campanha de arrecadação de brinquedos', 'Praça da Paz, 45', '2025-12-01', '2025-12-25', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Volta às Aulas Solidária', 'Campanha de doação de materiais escolares', 'Rua das Palmeiras, 123', '2025-01-10', '2025-02-10', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Campanha da Saúde', 'Distribuição de kits de higiene e saúde', 'Av. Saúde, 789', '2025-03-01', '2025-03-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1748809307/y2wjxwmojdxnthdzpcgw.jpg', 'ACTIVE'),
('Páscoa Feliz', 'Arrecadação de chocolates e cestas de Páscoa', 'Rua do Chocolate, 456', '2025-04-01', '2025-04-20', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1745700659/hwxpfgsdhzwghe7c8ot5.jpg', 'FINISHED'),
('Doe Livros', 'Campanha de incentivo à leitura', 'Biblioteca Central, 500', '2025-05-01', '2025-05-31', 'https://res.cloudinary.com/dipvumtkf/image/upload/v1748813457/ywoh3ds1eelescxywgcj.jpg', 'ACTIVE'),
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


INSERT INTO db_donation (
    name, description, category, quantity, contact_info, delivery_description,
    request_date, arriving_date, stock_entry_date, stock_exit_date,
    delivery, status, photo_url, donor_id, beneficiary_id, campaign_id
) VALUES
      ('Cobertores Quentes', 'Doação de cobertores para inverno', 'CLOTHING', 100, 'contato@doacao.com', 'Entrega via caminhão', '2025-05-01 10:00:00', '2025-06-05 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/cobertores.jpg', 1, 2, 1),
      ('Cestas Básicas', 'Cestas básicas com alimentos não perecíveis', 'FOOD', 50, 'contato@doacao.com', 'Retirada na sede', '2025-06-01 09:00:00', '2025-07-10 00:00:00', NULL, NULL, 'PICKUP', 'STOCK', 'http://example.com/photos/cestas_basicas.jpg', 2, 1, 2),
      ('Brinquedos de Natal', 'Brinquedos para crianças no Natal', 'PERSONAL_CARE', 30, 'brinquedos@doacao.com', 'Entrega via transportadora', '2025-10-15 08:00:00', '2025-12-10 00:00:00', NULL, NULL, 'DELIVERY', 'DONATED', 'http://example.com/photos/brinquedos.jpg', 3, 2, 3),
      ('Doação em Pix', 'Doação financeira via Pix', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência bancária', '2025-05-20 12:00:00', '2025-06-15 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/pix.jpg', 4, 1, 1),
      ('Dinheiro em espécie', 'Doação em dinheiro em espécie', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Retirada pessoalmente', '2025-06-10 15:00:00', '2025-07-05 00:00:00', NULL, NULL, 'PICKUP', 'PENDING', 'http://example.com/photos/dinheiro.jpg', 5, 2, 2),
      ('Transferência bancária', 'Doação financeira via transferência bancária', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência eletrônica', '2025-11-01 10:00:00', '2025-12-20 00:00:00', NULL, NULL, 'DELIVERY', 'PENDING_DELIVERY', 'http://example.com/photos/transferencia.jpg', 6, 1, 3),
      ('Doação avulsa via Pix', 'Doação financeira avulsa', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência via Pix', '2025-07-01 10:00:00', '2025-08-01 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/pix_avulsa.jpg', 1, 2, NULL),
      ('Ajuda emergencial em dinheiro', 'Ajuda financeira emergencial', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Retirada na sede', '2025-07-20 09:00:00', '2025-08-10 00:00:00', NULL, NULL, 'PICKUP', 'STOCK', 'http://example.com/photos/ajuda_dinheiro.jpg', 2, 1, NULL),
      ('Transferência bancária extra', 'Transferência extra para campanhas', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência bancária', '2025-07-25 11:00:00', '2025-08-15 00:00:00', NULL, NULL, 'DELIVERY', 'PENDING_DELIVERY', 'http://example.com/photos/transferencia_extra.jpg', 3, 2, NULL),
      ('Kits escolares', 'Kits com material escolar para crianças', 'PERSONAL_CARE', 40, 'escola@doacao.com', 'Entrega direta na escola', '2024-12-10 08:00:00', '2025-01-15 00:00:00', NULL, NULL, 'DELIVERY', 'DONATED', 'http://example.com/photos/kits_escolares.jpg', 2, 3, 4),
      ('Livros Infantis', 'Livros para crianças', 'PERSONAL_CARE', 100, 'livros@doacao.com', 'Entrega via correio', '2025-04-20 10:00:00', '2025-05-10 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/livros_infantis.jpg', 4, 2, 7),
      ('Cestas de higiene', 'Cestas com produtos de higiene pessoal', 'HYGIENE', 60, 'higiene@doacao.com', 'Retirada na sede', '2025-02-15 09:00:00', '2025-03-10 00:00:00', NULL, NULL, 'PICKUP', 'ACCEPTED', 'http://example.com/photos/cestas_higiene.jpg', 3, 1, 5),
      ('Chocolates de Páscoa', 'Chocolates para doação na Páscoa', 'FOOD', 80, 'pascoa@doacao.com', 'Entrega via transportadora', '2025-03-15 10:00:00', '2025-04-10 00:00:00', NULL, NULL, 'DELIVERY', 'DONATED', 'http://example.com/photos/chocolates.jpg', 5, 3, 6),
      ('Livros Técnicos', 'Livros técnicos para estudantes', 'PERSONAL_CARE', 75, 'livros@doacao.com', 'Entrega via correio', '2025-04-30 10:00:00', '2025-05-20 00:00:00', NULL, NULL, 'DELIVERY', 'PENDING_DELIVERY', 'http://example.com/photos/livros_tecnicos.jpg', 1, 2, 7),
      ('Doação espontânea em dinheiro', 'Doação em dinheiro espontânea', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Retirada na sede', '2025-05-20 09:00:00', '2025-06-01 00:00:00', NULL, NULL, 'PICKUP', 'STOCK', 'http://example.com/photos/doacao_espontanea.jpg', 6, 1, NULL),
      ('Pix voluntário', 'Doação via Pix voluntária', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência via Pix', '2025-05-25 10:00:00', '2025-06-03 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/pix_voluntario.jpg', 2, 3, NULL),
      ('Transferência bancária solidária', 'Transferência solidária para campanhas', 'PERSONAL_CARE', 1, 'financeiro@doacao.com', 'Transferência bancária', '2025-05-28 11:00:00', '2025-06-07 00:00:00', NULL, NULL, 'DELIVERY', 'PENDING_DELIVERY', 'http://example.com/photos/transferencia_solidaria.jpg', 3, 1, NULL),
      ('Toucas de Lã', 'Toucas de lã para o inverno', 'CLOTHING', 70, 'contato@doacao.com', 'Entrega via caminhão', '2025-05-28 08:00:00', '2025-06-03 00:00:00', NULL, NULL, 'DELIVERY', 'ACCEPTED', 'http://example.com/photos/toucas.jpg', 1, 3, 1),
      ('Meias Térmicas', 'Meias térmicas para proteção contra o frio', 'CLOTHING', 80, 'contato@doacao.com', 'Retirada na sede', '2025-06-01 09:00:00', '2025-06-12 00:00:00', NULL, NULL, 'PICKUP', 'STOCK', 'http://example.com/photos/meias.jpg', 3, 2, 1),
      ('Luvas de Inverno', 'Luvas para proteção das mãos no frio', 'CLOTHING', 90, 'contato@doacao.com', 'Entrega via transportadora', '2025-06-02 10:00:00', '2025-06-15 00:00:00', NULL, NULL, 'DELIVERY', 'DONATED', 'http://example.com/photos/luvas.jpg', 2, 3, 1);


INSERT INTO db_food (id, is_perishable, expiration, quantity, unit, category) VALUES
  (1, TRUE, '2025-09-10', 5.0, 'KG', 'GRAINS'),
  (2, TRUE, '2025-10-05', 5.0, 'KG', 'GRAINS'),
  (3, TRUE, '2025-12-20', 3.0, 'KG', 'GRAINS'),
  (4, TRUE, '2025-04-20', 2.0, 'KG', 'MILK'),
  (5, TRUE, '2025-07-10', 1.0, 'KG', 'GRAINS'),
  (6, FALSE, NULL, 2.0, 'PACKAGE', 'MILK'),
  (7, TRUE, '2025-09-15', 3.0, 'KG', 'GRAINS'),
  (8, TRUE, '2024-04-15', 5.0, 'KG', 'GRAINS'),
  (9, TRUE, '2024-04-20', 4.0, 'KG', 'GRAINS'),
  (10, TRUE, '2024-03-10', 3.0, 'KG', 'GRAINS'),
  (11, FALSE, NULL, 2.0, 'KG', 'MILK'),
  (12, FALSE, NULL, 1.0, 'KG', 'GRAINS'),
  (12, FALSE, NULL, 3.0, 'PACKAGE', 'GRAINS'),
  (14, FALSE, NULL, 2.0, 'PACKAGE', 'GRAINS'),
  (15, TRUE, '2024-04-20', 2.5, 'KG', 'GRAINS'),
  (16, FALSE, NULL, 2.0, 'PACKAGE', 'GRAINS'),
  (17, FALSE, NULL, 1.0, 'KG', 'GRAINS'),
  (18, FALSE, NULL, 1.5, 'PACKAGE', 'GRAINS'),
  (19, TRUE, '2024-06-15', 2.0, 'KG', 'GRAINS'),
  (20, FALSE, NULL, 1.5, 'UNIT', 'GRAINS');


INSERT INTO db_money (id, value, category)
VALUES
    (4, 150.00, 'PIX'),
    (5, 100.00, 'CASH'),
    (6, 200.00, 'TRANSFER'),
    (7, 75.00, 'PIX'),
    (8, 120.00, 'CASH'),
    (9, 180.00, 'TRANSFER');

