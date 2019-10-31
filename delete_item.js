const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = (characterId, species) => ({
    TableName : 'Character',
    Key: {
        characterId: parseInt(characterId),
        species: species
    }
});
// documentClient.delete(params(1, 'Human'), (err, data) => console.log(err ? err : data.Responses));

module.exports = (id, species) =>  documentClient.delete(params(id, species), (err, data) => console.log(err ? err : data));
