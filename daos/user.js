const User = require('../models/user');

module.exports.createUser = async (userData) => {  
    const user = new User(userData);
    return user.save();
}

module.exports.getUser = async (id) => {
    return User.findById(id);
}

module.exports.getUsers = async () => {
    return User.find();
}

module.exports.updateUser = async (id, updatedData) => {
    return User.findByIdAndUpdate(id, updatedData);
}

module.exports.deleteUser = async (id) => {
    return User.findByIdAndDelete(id);
}

