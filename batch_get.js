const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = {
    RequestItems: {
        'Character': {
            Keys: [
                {
                    characterId: 1,
                    species: 'Human'
                }
            ]
        },
        'Character': {
            Keys: [
                {
                    characterId: 20,
                    species: 'Human'
                }
            ]
        }
    }
};


documentClient.batchGet(params, (err, data) => console.log(err ? err : data.Responses));
