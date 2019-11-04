const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();

const getCharacterByName = name => {
    return {
        TableName: config.aws_table_name,
        KeyConditionExpression: 'characterId = :id and begins_with(sortingKey, :entry)',
        ExpressionAttributeValues: {
            ':id': 1,
            ':entry': name
        }
    };
}

documentClient.query(getCharacterByName('Rick San'), (err, data) => console.log(err ? err : data));
