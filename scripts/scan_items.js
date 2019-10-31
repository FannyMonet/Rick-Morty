const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();

var params = species => ({
    TableName : [config.aws_table_name],
    FilterExpression : 'species = :species',
    ExpressionAttributeValues : {':species' : species}
});

documentClient.scan(params('Human'), (err, data) => console.log(err ? err : data));

module.exports = species =>  documentClient.scan(params(species), (err, data) => console.log(err ? err : data));