const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//const knex = require('knex');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const register = require('./controllers/register');
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

// const db = knex({
//   client: 'pg',
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	pool.select('*').from('users')
	 .then(response => {
	 	res.json(response)
	 })
	 .catch(err => {
	 	console.log(err);
	 })
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, pool, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, pool, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, pool);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, pool);
});

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
});