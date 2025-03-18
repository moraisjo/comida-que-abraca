CREATE TABLE partner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique Identifier
    user_id UUID NOT NULL,  -- Foreign Key to User table
    type ENUM('INDIVIDUAL', 'COMPANY', 'NON_GOVERNMENTAL_ORGANIZATION', 'GOVERNMENT') NOT NULL,  -- Partner type
    is_donor BOOLEAN,  -- Se o parceiro está disposto a doar
    wants_to_receive_donations BOOLEAN,  -- Se o parceiro está disposto a receber doações
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Partner registration date
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE  -- Foreign Key with cascading delete
);
