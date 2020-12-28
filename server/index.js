const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('../db/index.js')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/users', (req, res) => {
    var query = 'select * from users';
    db.getFromDB(query, (result) => {
        res.send(result);
    })
});
app.get('/weight/:username', (req, res) => {
    const username = req.params.username
    var query = `select * from weights where username = '${username}'`;
    db.getFromDB(query, (result) => {
        res.send(result);
    })
});
app.post('/users', (req, res) => {
    const usersValues = [`${req.body.username}`, req.body.age, req.body.weight, req.body.goalweight, req.body.height, `${req.body.gender}`, req.body.activitylevel];
    const usersQuery = `insert into users (username, age, weight, goalweight, height, gender, activitylevel) 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`
    db.insertIntoDB(usersQuery, usersValues, (result) => {
        console.log('user was added!');
    })
    var date = new Date
    var date = date.toDateString()
    const weightsValues = [req.body.username, req.body.weight, date]
    const weightsQuery = `insert into weights (username, weight, date)
    VALUES ($1, $2, $3)`
    db.insertIntoDB(weightsQuery, weightsValues, (result) => {
        res.status(201).send('weight was added!');
    })
})

app.put('/users', (req, res) => {
    const usersValues = [`${req.body.username}`, req.body.age, req.body.weight, req.body.goalweight, req.body.height, `${req.body.gender}`, req.body.activitylevel];
    const usersQuery = `update users set username = ($1), age = ($2), weight = ($3), goalweight =( $4), height = ($5), gender = ($6), activitylevel = ($7) where id = ${req.body.id}`
    db.insertIntoDB(usersQuery, usersValues, (result) => {
        console.log('user was updated!');
    })
    var date = new Date
    var date = date.toDateString()
    const weightsValues = [req.body.username, req.body.weight, date]
    const weightsQuery = `insert into weights (username, weight, date)
    VALUES ($1, $2, $3)`
    db.insertIntoDB(weightsQuery, weightsValues, (result) => {
        res.status(201).send('weight was added!');
    })
})

app.patch('/users', (req, res) => {
    const usersValue = [req.body.weight.updatedWeight]
    const id = req.body.user.id
    const usersQuery = `update users set weight = ($1) where id = ${id};`
    db.insertIntoDB(usersQuery, usersValue, (result) => {
        console.log('weight was updated');
    })
    var date = new Date
    var date = date.toDateString()
    const weightsValues = [req.body.user.username, req.body.weight.updatedWeight, date]
    const weightsQuery = `insert into weights (username, weight, date)
    VALUES ($1, $2, $3)`
    db.insertIntoDB(weightsQuery, weightsValues, (result) => {
        res.status(201).send('weight was added!');
    })
});
app.delete('/users/:username', (req, res) => {
    const query = `delete from users where username = '${req.params.username}'`;
    db.getFromDB(query, (result) => {
      console.log('deleted from users')
    })
    const weightsQuery = `delete from weights where username = '${req.params.username}'`;
    db.getFromDB(weightsQuery, (result) => {
        res.send(result);
    })
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})