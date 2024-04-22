const { Sequelize } = require('sequelize');

// Hardcoded values
const dbDialect = 'postgres';
const dbHost = 'postgresql_postgres_1';
const dbUser = 'postgres';
const dbPw = 'postgres';
const dbPort = 5432;
const dbName = 'postgres';

// Construct the connection URL
const connUrl = `${dbDialect}://${dbUser}:${dbPw}@${dbHost}:${dbPort}/${dbName}`;

const db = new Sequelize(connUrl);

const models = [
    require('../models/todo'),
];

for (const model of models) {
    model(db);
}

module.exports = db;
