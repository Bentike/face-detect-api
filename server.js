const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const register = require('./controllers/register');

// const db = knex({
//   client: 'pg',
//   connectionString: process.env.DATABASE_URL,
//   debug: true,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const db = knex({
	client: 'pg',
	connection: {
	  host : '5432',
	  user : 'ontvcrrrufpqba',
	  password : 'fa65669b2e7e0e923eb633886f9dbf3341716b3227e0e7af70c25fb7e66e94d2',
	  database : 'd6bc24i7jnvdmp'
	}
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	db.select('*').from('users')
	 .then(response => {
	 	res.json(response)
	 })
	 .catch(err => {
	 	console.log(err);
	 })
});

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on port ${process.env.PORT}`);
});