const fs = require('fs');

const removeEmptyRows = object => Object.entries(object)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => {
        key = key === 'id' ? 'characterId' : key;
        if(typeof value === 'object')
            return {[key]: removeEmptyRows(value)};
        return {[key]: value};
    })
    .reduce((acc, o) => {
        const [key, value] = Object.entries(o)[0];
        return {...acc, [key]: value}
    }, {});

const characters = JSON.parse(fs.readFileSync('characters.json', 'utf8')).map(character => {
    return removeEmptyRows(character);
})
// const characters = removeEmptyRows(JSON.parse(fs.readFileSync('characters.json', 'utf8')));
// console.log(characters)

module.exports = characters;