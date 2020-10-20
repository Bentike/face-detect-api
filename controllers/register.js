const handleRegister = (req, res, pool, bcrypt) => {
	const {name, email, password} = req.body;
	const userExist = () => {
		res.status(400).json('user already exist')
	};
	if(name.length && email.length && password.length > 0){
		const hash = bcrypt.hashSync(password);
		pool.select('*').from('users')
		.where('email', '=', email)
		.then(response => {
			if(!response[0]){
				pool.transaction(trx => {
					trx.insert({
						hash: hash,
						email: email
					})
					 .into('login')
					 .returning('email')
					 .then(loginEmail => {
					  return trx('users')
						  .returning('*')
						  .insert({
							name: name,
							email: loginEmail[0],
							joined: new Date()
						})
					  .then(user => {
					   res.json(user[0]);
					   })
					})
					 .then(trx.commit)
					 .catch(trx.rollback)
				})
				  .catch(err => res.status(400).json(err));
			}else{
				return userExist();
			}
		})
		.catch(err => {
			console.log(err)
	    });
		
	}
}

module.exports = {
	handleRegister
}