const AWS = require('aws-sdk');
const config = require('../config/config.js');

AWS.config.update(config.aws_local_config);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = (id, name, species, gender, originId, locationId, created) => ({
    TableName : config.aws_table_name,
    Key: {
        characterId: id,
        sortingKey: name + '_' + species + '_' + gender + '_' + 
            originId + '_'  + locationId + '_' + created
    }
});
documentClient.get(params(1, 'Rick Sanchez', 'Human', 'Male', '1', '20', '2017-11-04T18:48:46.250Z'), (err, data) => console.log(err ? err : data));

module.exports = (id, species) =>  documentClient.get(params(id, name, species, gender, originId, locationId, created), (err, data) => console.log(err ? err : data));