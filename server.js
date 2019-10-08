//web application framework
const express = require('express');

//The middleware was a part of Express.js allowing JSON objects to be parsed
const bodyParser = require('body-parser');

//password hashing function 
const bcrypt = require('bcrypt-nodejs');

//cross-domain requests allows you to bypass the "Access-Control-Allow-Origin" error
const cors = require('cors');

//Knex is a tool to help write SQL queries.
const knex = require('knex')

//Configuration object 
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'dec221996',
    database : 'think_tank'
  }
});


const app = express();

//where we initialized CORS
app.use(cors())

//Where we initialize Body-Parser
app.use(bodyParser.json());

//Api route that allows the user to sign in an individual user
app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {

      //Where we verify that the user is in the database and has used the correct credential
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

//Api route that allows the user to register an individual user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  //Where we hash our registered user's password to be inserted into the database
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
})

//Api route that allows the user to retrieve an individual profile/user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  //Where we select a specific user from the database
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})


//Port our server is listening to
app.listen(3001, ()=> {
  console.log('Server is running on port 3001');
})