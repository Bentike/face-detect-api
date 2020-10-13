 const handleSignin = (req, res, db, bcrypt) => {		
    const {email, password} = req.body;
    if(email.length && password.length > 0){
        db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(response => {
           const isValid = bcrypt.compareSync(password, response[0].hash)
           if(isValid){
            return db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => {console.log('error')})
           }else{
            res.status(400).json('invalid credentials')
           }
        })
        .catch(err => {
          res.status(400).json(err)
        })
        }
}

module.exports = {
	handleSignin: handleSignin
}