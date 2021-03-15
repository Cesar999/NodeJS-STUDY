const secrets = [
    'has an affair',
    'has an embarrassing incident',
    'has a dirty web browsing history',
    'has a debt',
    'has a sexual fetishe',
    'has an embarrassing family history',
    'has a phobia',
    'bought something',
    'used to smoke',
    'is in love with someone',
];

function getSecret(){
    const index = Math.floor(Math.random()*secrets.length);
    return secrets[index];
}

module.exports = { getSecret }