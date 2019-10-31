const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();
const characters = [
    {
        characterId: 1,
        species: 'Human'
    },
    {
        characterId: 20,
        species: 'Human'
    }
]
const params = characters => ({
    RequestItems: {
        'Character': {
            Keys: [
                ...characters
            ]
        }
    }
});


documentClient.batchGet(params(characters), (err, data) => console.log(err ? err : data.Responses.Character));

module.exports = (characters) =>  documentClient.batchGet(params(characters), (err, data) => console.log(err ? err : data));