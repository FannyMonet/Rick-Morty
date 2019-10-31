const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const dynamodb = new AWS.DynamoDB();

const params = {
    AttributeDefinitions: [
        {
            AttributeName: 'characterId',
            AttributeType: 'N'
        },
        {
            AttributeName: 'species',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'characterId',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'species',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: [config.aws_table_name]
};


const createTable = (params) => {
    dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Table Created", data);
        }
    });
}

createTable(params);