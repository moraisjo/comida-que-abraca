

-- V1__create_address_table.sql
CREATE TABLE address (
    id UUID PRIMARY KEY,
    street VARCHAR(150) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    complement VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code INT NOT NULL
);
