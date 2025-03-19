-- Criando o tipo ENUM para a categoria da transação monetária
CREATE TYPE transaction_category AS ENUM ('PIX', 'CASH', 'TRANSFER');

-- Criando a tabela money_donation que extende donation
CREATE TABLE money_donation (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),  -- Identificador único (UUID)
    donation_id UUID NOT NULL,  -- Identificador da doação (FK para donation)

    value FLOAT NOT NULL,  -- Valor monetário da doação
    category transaction_category NOT NULL,  -- Categoria da transação monetária (enum: PIX, CASH, TRANSFER)

    FOREIGN KEY (donation_id) REFERENCES donation(id) ON DELETE CASCADE
);
