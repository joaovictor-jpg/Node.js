const { getDb } = require('../util/database.js');

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }
};

module.exports = User;