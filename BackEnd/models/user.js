const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    oAuthID: String,
    isAdmin: Boolean,
    password: String
})
UserSchema.pre('save', async function(next){
    if( this.password){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// log in function
UserSchema.statics.loginAPI = async function(Email, Password){
    const user = await this.findOne({ email: Email });
    if (user){
       const pass = await bcrypt.compare(Password, user.password);
       if(pass){
            return user;
       }
       throw Error('Password incorrect')
    }
    throw Error ('Email incorrect')
}
module.exports = User = mongoose.models.User || mongoose.model('User', UserSchema);
