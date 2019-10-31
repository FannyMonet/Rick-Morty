const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = (id, species) => ({
    TableName : 'Character',
    Key: {
        characterId: id,
        species: species
    }
});

documentClient.get(params(1, 'Human'), (err, data) => console.log(err ? err : data));

module.exports = (id, species) =>  documentClient.get(params(id, species), (err, data) => console.log(err ? err : data));