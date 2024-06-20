const { Sequelize } = require('sequelize');

const connUrl = 'postgres://postgres:postgres@localhost:5432/postgres';
console.log('Database connection URL:', connUrl); // Debugging line

const db = new Sequelize(connUrl);

const models = [
    require('../models/todo'),
];

for (const model of models) {
    model(db);
}

module.exports = db;
