const AWS = require('aws-sdk');

let awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

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
    TableName: 'Character'
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