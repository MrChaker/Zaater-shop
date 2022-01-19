
const isAdmin = (req, res, next)=>{
    if( req.user && req.user.isAdmin ){
        next()
    }else{
        res.redirect('/auth/signup')
    }
}
module.exports = isAdmin