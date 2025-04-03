# Scripts banco de dados
## Endereço
INSERT INTO db_address (city, complement, neighborhood, number, state, street, zip_code)
VALUES
  ('São Paulo', 'Apt 101', 'Centro', '123', 'SP', 'Rua das Flores', '01001-000'),
  ('Rio de Janeiro', 'Casa', 'Copacabana', '456', 'RJ', 'Av. Atlântica', '22010-000'),
  ('Belo Horizonte', '', 'Savassi', '789', 'MG', 'Rua da Bahia', '30160-011'),
  ('Curitiba', 'Bloco B', 'Batel', '321', 'PR', 'Av. do Batel', '80420-090'),
  ('Porto Alegre', 'Sala 202', 'Moinhos de Vento', '654', 'RS', 'Rua Padre Chagas', '90570-080');

## Usuário
INSERT INTO db_user (id, email, name, password, phone, address_id)
VALUES
  (1, 'ana.silva@example.com', 'Ana Silva', 'senha123', '11999999999', 1),
  (2, 'joao.souza@example.com', 'João Souza', 'senha456', '21988888888', 2),
  (3, 'carla.mendes@example.com', 'Carla Mendes', 'senha789', '31977777777', 3),
  (4, 'pedro.alves@example.com', 'Pedro Alves', 'senha321', '41966666666', 4),
  (5, 'lucia.lima@example.com', 'Lúcia Lima', 'senha654', '51955555555', 5);

## Parceiro (Partner)
INSERT INTO db_partner (id, legal_entity_type, registration_date, wants_to_donate, wants_to_receive_donations)
VALUES
(1, 'ONG', '2024-01-10', TRUE, TRUE),
(2, 'ONG', '2024-01-15', TRUE, TRUE),
(3, 'ONG', '2024-02-05', TRUE, TRUE),
(4, 'ONG', '2024-02-20', TRUE, TRUE),
(5, 'ONG', '2024-03-01', TRUE, TRUE);

# Doação (Donation)
INSERT INTO db_donation (arriving_date, delivery, name, status, beneficiary_id, campaign_id, donor_id)
VALUES
('2024-03-01', 'DELIVERY', 'Cesta básica completa', 'PENDING', NULL, NULL, 3),
('2024-03-02', 'PICKUP', 'Kit de higiene pessoal', 'DONATED', NULL, NULL, 1),
('2024-03-03', 'DELIVERY', 'Roupas de inverno', 'PENDING', NULL, NULL, 4),
('2024-03-04', 'DELIVERY', 'Brinquedos usados', 'DONATED', NULL, NULL, 2),
('2024-03-05', 'PICKUP', 'Alimentos não perecíveis', 'PENDING', NULL, NULL, 5),
('2024-03-06', 'DELIVERY', 'Produtos de limpeza', 'STOCK', NULL, NULL, 1),
('2024-03-07', 'DELIVERY', 'Livros infantis', 'PENDING', NULL, NULL, 3),
('2024-03-08', 'PICKUP', 'Mantas e cobertores', 'DONATED', NULL, NULL, 2),
('2024-03-09', 'DELIVERY', 'Cestas de frutas', 'PENDING', NULL, NULL, 5),
('2024-03-10', 'DELIVERY', 'Mochilas escolares', 'DONATED', NULL, NULL, 1),
('2024-03-11', 'PICKUP', 'Pacotes de fraldas', 'PENDING', NULL, NULL, 4),
('2024-03-12', 'DELIVERY', 'Material escolar', 'PENDING', NULL, NULL, 2),
('2024-03-13', 'DELIVERY', 'Sapatos usados', 'DONATED', NULL, NULL, 3),
('2024-03-14', 'PICKUP', 'Cadeiras de rodas', 'PENDING', NULL, NULL, 5),
('2024-03-15', 'DELIVERY', 'Roupas infantis', 'STOCK', NULL, NULL, 1),
('2024-03-16', 'DELIVERY', 'Leite em pó', 'PENDING', NULL, NULL, 4),
('2024-03-17', 'PICKUP', 'Cobertores térmicos', 'DONATED', NULL, NULL, 3),
('2024-03-18', 'DELIVERY', 'Cadeiras escolares', 'PENDING', NULL, NULL, 2),
('2024-03-19', 'DELIVERY', 'Alimentos orgânicos', 'PENDING', NULL, NULL, 5),
('2024-03-20', 'PICKUP', 'Óculos de leitura', 'DONATED', NULL, NULL, 1),
('2024-03-21', 'DELIVERY', 'Instrumentos musicais', 'PENDING', NULL, NULL, 4),
('2024-03-22', 'PICKUP', 'Ração para pets', 'STOCK', NULL, NULL, 3),
('2024-03-23', 'DELIVERY', 'Produtos de higiene feminina', 'PENDING', NULL, NULL, 5),
('2024-03-24', 'DELIVERY', 'Alimentos para café da manhã', 'DONATED', NULL, NULL, 2),
('2024-03-25', 'PICKUP', 'Roupas esportivas', 'PENDING', NULL, NULL, 1),
('2024-03-26', 'DELIVERY', 'Pacotes de arroz e feijão', 'DONATED', NULL, NULL, 4),
('2024-03-27', 'DELIVERY', 'Bicicletas usadas', 'PENDING', NULL, NULL, 2),
('2024-03-28', 'PICKUP', 'Cadeiras de alimentação infantil', 'STOCK', NULL, NULL, 3),
('2024-03-29', 'DELIVERY', 'Tênis novos', 'DONATED', NULL, NULL, 5),
('2024-03-30', 'DELIVERY', 'Jogo de lençóis', 'PENDING', NULL, NULL, 1),
('2024-03-31', 'PICKUP', 'Equipamentos esportivos', 'PENDING', NULL, NULL, 4),
('2024-03-15', 'DELIVERY', 'Chocolates para páscoa', 'DONATED', NULL, NULL, 3),
('2024-03-18', 'PICKUP', 'Camas de solteiro', 'PENDING', NULL, NULL, 5),
('2024-03-20', 'DELIVERY', 'Pratos e talheres', 'PENDING', NULL, NULL, 2),
('2024-03-10', 'DELIVERY', 'Bolas e brinquedos', 'DONATED', NULL, NULL, 1),
('2024-03-12', 'PICKUP', 'Panelas e utensílios', 'PENDING', NULL, NULL, 4),
('2024-03-07', 'DELIVERY', 'Máscaras descartáveis', 'STOCK', NULL, NULL, 5),
('2024-03-06', 'DELIVERY', 'Camisetas novas', 'DONATED', NULL, NULL, 3),
('2024-03-02', 'PICKUP', 'Material de escritório', 'PENDING', NULL, NULL, 2),
('2024-03-03', 'DELIVERY', 'Guarda-chuvas', 'PENDING', NULL, NULL, 1),
('2024-03-05', 'DELIVERY', 'Caixas de sabão em pó', 'DONATED', NULL, NULL, 4);



