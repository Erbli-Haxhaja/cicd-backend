const { Sequelize } = require('sequelize');

const connUrl = 'postgres://postgres:eeeeeeee@localhost:5432/postgres';
console.log('Database connection URL:', connUrl);

const db = new Sequelize(connUrl);

const models = [
    require('../models/todo'),
    require('../models/user'),
];

for (const model of models) {
    model(db);
}

module.exports = db;
