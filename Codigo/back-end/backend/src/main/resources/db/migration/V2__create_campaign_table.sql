-- V2__create_campaign_table.sql
CREATE TABLE campaign (
    id UUID PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    address_id UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image_url VARCHAR(255),
    status VARCHAR(20) CHECK (status IN ('Active', 'Finished', 'Canceled')) NOT NULL,
    FOREIGN KEY (address_id) REFERENCES address(id)
);