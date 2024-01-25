let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    accountNumber: { type: Number, require: false },
    name: { type: String, require: true },
    email: { type: String, require: true, unique : true },
    password: { type: String, require: true, minLength: 8 },
    address: { type: String, require: false },
    phoneNumber: { type: String, require: false },
    role: { type: String, enum: ['CUSTOMER', 'EMPLOYEE', 'ADMIN'], require: false },
});

module.exports = mongoose.model('User', userSchema);

