 const handleSignin = (req, res, pool, bcrypt) => {		
    const {email, password} = req.body;
    if(email.length && password.length > 0){
        pool.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(response => {
           const isValid = bcrypt.compareSync(password, response[0].hash)
           if(isValid){
            return pool.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => {res.status(400).json(err)})
           }else{
            res.status(400).json('invalid credentials')
           }
        })
        .catch(err => {
          console.log(err)
        })
      }
}

module.exports = {
	handleSignin: handleSignin
}