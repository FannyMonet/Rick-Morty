const AWS = require('aws-sdk');
const config = require('../config/config.js');
const characters = require('./clean_characters.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();
const putRequests = characters => characters.map(character => ({
    PutRequest: {
        Item: {...character}
    }
}))
const params = characters => ({
    RequestItems: {
        [config.aws_table_name]: putRequests(characters)
    }
});

// documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data.Responses));
module.exports = (characters) =>  documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data));