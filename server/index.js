const data = require('./users.json')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const authenticate = (user,password) => {
let users = data.users;
let arr = Object.values(users);
let loggedin = arr.filter(c=>c.name===user && c.password===password).length === 0 ? false : true;
return loggedin;
}
app.post('/users',(req,res)=>{
    let body = req.body;
    let authenticated = authenticate(body.user,body.password)
    res.status(200).send(
        {
            authenticated:authenticated,
            userName:req.body.user
        }
    )
})
app.listen(PORT,()=>{console.log(`Listening on port no ${PORT}`)})