const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = updateParams => ({
    TableName : [config.aws_table_name],
    Key: { characterId : updateParams.characterId, species: updateParams.species },
    UpdateExpression: 'set #a = :value',
    // ConditionExpression: '#a < :MAX',
    ExpressionAttributeNames: {'#a' : updateParams.attribute},
    ExpressionAttributeValues: {':value' : updateParams.value}
});
const updateParams = i => ({
    characterId: 1,
    species: 'Human',
    attribute: 'status',
    value: i + ''
})
for(let i=0; i<1; i++) {
    documentClient.update(params(updateParams), (err, data) => console.log(err ? err : data));
}

module.exports = (updateParams) =>  documentClient.update(params(updateParams), (err, data) => console.log(err ? err : data));
