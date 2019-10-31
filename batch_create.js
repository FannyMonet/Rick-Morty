const AWS = require('aws-sdk');
const characters = require('./clean_characters.js');
const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();
const putRequests = characters => characters.map(character => ({
    PutRequest: {
        Item: {...character}
    }
}))
const params = characters => ({
    RequestItems: {
        'Character': putRequests(characters)
    }
});

// documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data.Responses));
module.exports = (characters) =>  documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data));