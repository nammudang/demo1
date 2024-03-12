import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('db1.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});
 
export default db