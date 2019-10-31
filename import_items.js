const https = require('https');
const fs = require('fs');

https.get('https://rickandmortyapi.com/api/character/', (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        fs.writeFile('characters.json', JSON.stringify(JSON.parse(data).results), err => {
            if (err) throw err;
            console.log('Saved!');
        });
    });

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
