CREATE TABLE address (
    id UUID PRIMARY KEY,
    street VARCHAR(150) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    complement VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL
);

-- Certifique-se de que a extensão pgcrypto está instalada
CREATE EXTENSION IF NOT EXISTS pgcrypto;

--insert_addresses_bh.sql
INSERT INTO address (id, street, neighborhood, number, complement, city, state, zip_code)
VALUES
    (gen_random_uuid(), 'Avenida Afonso Pena', 'Centro', 1212, 'Próximo à Praça Sete', 'Belo Horizonte', 'Minas Gerais', '30130-008'),
    (gen_random_uuid(), 'Rua da Bahia', 'Lourdes', 890, 'Edifício Empresarial', 'Belo Horizonte', 'Minas Gerais', '30160-110'),
    (gen_random_uuid(), 'Avenida Amazonas', 'Barro Preto', 1500, 'Ao lado do Fórum', 'Belo Horizonte', 'Minas Gerais', '30180-110'),
    (gen_random_uuid(), 'Rua dos Timbiras', 'Funcionários', 450, NULL, 'Belo Horizonte', 'Minas Gerais', '30140-070'),
    (gen_random_uuid(), 'Avenida do Contorno', 'Savassi', 2200, 'Prédio Comercial', 'Belo Horizonte', 'Minas Gerais', '30110-051');
