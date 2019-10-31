const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

var params = species => ({
    TableName : 'Character',
    FilterExpression : 'species = :species',
    ExpressionAttributeValues : {':species' : species}
});

documentClient.scan(params('Human'), (err, data) => console.log(err ? err : data));

export default species =>  documentClient.get(params(species), (err, data) => console.log(err ? err : data));