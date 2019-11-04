const AWS = require('aws-sdk');
const config = require('../config/config.js');
const characters = require('./clean_characters.js');

AWS.config.update(config.aws_local_config);
const documentClient = new AWS.DynamoDB.DocumentClient();
const putRequests = characters => characters.map(character => {
    const name = character.name ? character.name : 'unknown';
    const species = character.species ? character.species : 'unknown';
    const gender = character.gender ? character.gender : 'unknown';
    const origin = character.origin.url;
    const originId = origin ? origin.split('/')[origin.split('/').length - 1] : -1;
    const location = character.location.url;
    const locationId = location ? location.split('/')[location.split('/').length - 1] : -1;
    const created = character.created ? character.created : 'unknown';
    return {
        PutRequest: {
            Item: {
                sortingKey: name + '_' + 
                            species + '_' +
                            gender + '_' +
                            originId + '_' +
                            locationId + '_' +
                            created,
                ...character
            }
        }
    }
})
putRequests(characters)
const params = characters => ({
    RequestItems: {
        [config.aws_table_name]: putRequests(characters)
    }
});

documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data.Responses));
module.exports = (characters) =>  documentClient.batchWrite(params(characters), (err, data) => console.log(err ? err : data));