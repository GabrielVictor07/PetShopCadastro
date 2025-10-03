-- Criação do banco de dados
CREATE DATABASE petshop;
USE petshop;

-- Tabela Dono
CREATE TABLE Dono (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    endereco VARCHAR(200)
);

-- Tabela Pet
CREATE TABLE Pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_dono INT NOT NULL,
    nome_pet VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    data_nascimento DATE,
    observacoes TEXT,
    CONSTRAINT fk_dono FOREIGN KEY (id_dono) REFERENCES Dono(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
