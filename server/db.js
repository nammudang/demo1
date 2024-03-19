import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('db1.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});
/*
db.run('delete from information ', function(err) {
    if (err) {
        console.error('Error inserting data', err);
    } else {
        console.log('Data inserted successfully');
    }
  });
*/
export default db