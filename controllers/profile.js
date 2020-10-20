const handleProfileGet = (req, res, pool) => {
	const { id } = req.params;
	pool.select('*').from('users').where({id})
	 .then(user => {
	 	if(user.length){
	 	   res.json(user[0]);
	 	}else{
	 		res.status(400).json('user not found');
	 	}
	 })
	  .catch(err => {
	  	res.status(400).json(err)
	  })
}

module.exports = {
	handleProfileGet
}