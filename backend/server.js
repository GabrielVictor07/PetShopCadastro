const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./db.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota para cadastrar dono e pet
app.post('/api/cadastro', async (req, res) => {
    const { dono, pet } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Inserir dono
        const [donoResult] = await connection.execute(
            `INSERT INTO Dono (nome_completo, cpf, email, telefone, endereco)
             VALUES (?, ?, ?, ?, ?)`,
            [dono.nome_completo, dono.cpf, dono.email, dono.telefone, dono.endereco]
        );

        const idDono = donoResult.insertId;

        // Inserir pet
        await connection.execute(
            `INSERT INTO Pet (id_dono, nome_pet, especie, raca, data_nascimento, observacoes)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [idDono, pet.nome_pet, pet.especie, pet.raca, pet.data_nascimento, pet.observacoes]
        );

        await connection.end();

        res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar no banco de dados' });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
