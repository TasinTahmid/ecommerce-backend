const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/user.model');
const Product = require('./models/product.model');
const Admin = require('./models/admin.model');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce-website');


app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res)=>{
  res.send('All users are shown here...');
});

app.post('/api/register', async (req,res) => {
  console.log(req.body);
  try{
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({status: 'ok'});
  }
  catch(err){
    res.json({status: 'error', error: 'Duplicate email'});
  }
  
});

app.get('/api/products', (req, res) =>{
  Product.find().then((result)=>{
    res.send(result);
  }).catch((err)=>{
    console.log(err);
  })
});

app.post('/api/products', async (req,res) => {
  console.log(req.body);
  try{
    await Product.create({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    });
    res.json({status: 'ok'});
  }
  catch(err){
    res.json({status: 'error'});
  }
  
});

app.post('/api/login', async (req,res) => {
  const admin = await Admin.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if(admin){
    const token = jwt.sign({

      name: admin.name,
      email: admin.email,

    },'secret123');

    return res.json({ status: 'ok', admin: token });
  }

  else if(user){
    const token = jwt.sign({

      name: user.name,
      email: user.email,

    },'secret123');

    return res.json({ status: 'ok', user: token });
  }
  res.json({ status: 'error', user: false });
  
});

app.get('/api/all-users', (req, res) =>{
  User.find().then((result)=>{
    res.send(result);
  }).catch((err)=>{
    console.log(err);
  })
});

app.delete('/api/users/:id', (req, res) =>{
  const id = req.params.id;
  User.findOneAndRemove({_id: id}, (err) =>{
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    console.log('User deleted successfully...');
    return res.status(200).send();
  })
});

app.listen('5000',() => {
  console.log('Listening on port 5000...');
});