const AWS = require('aws-sdk');
const config = require('../config/config.js');

const cluster = require("cluster");
const numberOfInstances = process.env.NB_INSTANCES || 100;

const updateItem = async () => {
    AWS.config.update(config.aws_local_config);

    const documentClient = new AWS.DynamoDB.DocumentClient();

    const params = updateParams => ({
        TableName: [config.aws_table_name],
        Key: { characterId: updateParams.characterId, species: updateParams.species },
        UpdateExpression: 'set #a = :value',
        // ConditionExpression: '#a < :MAX',
        ExpressionAttributeNames: { '#a': updateParams.attribute },
        ExpressionAttributeValues: { ':value': updateParams.value }
    });

    const attributesToUpdate = ['name', 'status', 'type', 'gender', 'url'];
    const updateParams = i => ({
        characterId: 1,
        species: 'Human',
        attribute: [attributesToUpdate[cluster.worker.id % 5]],
        value: cluster.worker.id
    });


    const promise = new Promise((resolve, reject) => {
        documentClient.update(params(updateParams(cluster.worker.id)), (err, data) => err ? reject(err) : resolve(updateParams(1)));
    });

    try {
        const res = await promise;
        console.log("COOL", res);
    } catch (err) {
        console.log("ERROR", err);
    }

    process.exit(0);
};

if (cluster.isMaster) {
    for (let i = 0; i < numberOfInstances; i++) {
        cluster.fork();
    }
    
    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died.`);
    });
} else {
    updateItem();
}
// module.exports = (updateParams) => documentClient.update(params(updateParams), (err, data) => console.log(err ? err : data));