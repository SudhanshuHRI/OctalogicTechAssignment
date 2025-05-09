import mysql from "mysql2";


const pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:'',
    database:"octalogic_tech"
}).promise()


async function testConnection() {
    try {
        await pool.query('SELECT 1');
        console.log('✅ Database connection successful');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
}

testConnection();


// const dummy = await pool.query("select * from dummy")
// console.log(dummy[0])