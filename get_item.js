const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

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