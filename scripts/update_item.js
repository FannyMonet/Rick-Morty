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
    value: ('Alive' + i)
})

// documentClient.update(params(updateParams), (err, data) => console.log(err ? err : data));
const updateMultipleTimes = count => {
    for(let i=1; i<=count; i++) {
        documentClient.update(params(updateParams(i)), (err, data) => console.log(err ? err : updateParams(i).value));
    }
}
updateMultipleTimes(1000)
module.exports = (updateParams) =>  documentClient.update(params(updateParams), (err, data) => console.log(err ? err : data));
