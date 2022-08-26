const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce-website');

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
  },{ collection: 'admins'}
);

const Admin = mongoose.model('Admin', AdminSchema);

// async function createAdmin(){
//   const admin1 = new Admin({
//     name: 'admin1',
//     email: 'admin1@admin.com',
//     password: 'admin1'
//   }); 

//   const result = await Admin.create(admin1);
//   console.log(result);
// }
// createAdmin();

module.exports = Admin;
