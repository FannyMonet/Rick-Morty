const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

const [characterId, species] = [...process.argv.slice(2)];
const params = {
    TableName : 'Character',
    Key: {
        characterId: parseInt(characterId),
        species: species
    }
};
documentClient.delete(params, (err, data) => console.log(err ? err : data.Responses));
