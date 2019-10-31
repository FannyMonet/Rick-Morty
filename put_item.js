const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = character => ({
    TableName : 'Character',
    Item: {
        characterId: character.characterId,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender,
        origin: {
            name: character.origin.name,
            url: character.origin.url
        },
        location: {
            name: character.location.name,
            url: character.location.url
        },
        image: character.image,
        episode: [...character.episode],
        url: character.url,
        created: character.created
    }
});

module.exports = (character) =>  documentClient.put(params(character), (err, data) => console.log(err ? err : data));
