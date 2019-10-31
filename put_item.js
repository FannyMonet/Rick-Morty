const AWS = require('aws-sdk');

const awsConfig = {
    "endpoint": "http://localhost:8000",
    "region": "localhost"
};
AWS.config.update(awsConfig);

const documentClient = new AWS.DynamoDB.DocumentClient();

// const params = {
//     TableName : 'Character',
//     Item: {
//         characterId: 1,
//         name: 'Rick Sanchez',
//         status: 'Alive',
//         species: 'Human',
//         gender: "Male",
//         origin: {
//             name: "Earth",
//             url: "https://rickandmortyapi.com/api/location/1"
//         },
//         location: {
//             name: "Earth",
//             url: "https://rickandmortyapi.com/api/location/20"
//         },
//         image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//         episode: [
//             "https://rickandmortyapi.com/api/episode/1",
//             "https://rickandmortyapi.com/api/episode/2",
//         ],
//         url: "https://rickandmortyapi.com/api/character/1",
//         created: "2017-11-04T18:48:46.250Z"
//     }
// };

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

documentClient.put(params, (err, data) => console.log(err ? err : data));