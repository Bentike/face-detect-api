const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '287e993ee6324555939d92804971da69'
 });

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, req.body.input)
   .then(response => {
	  res.json(response);		
   })
   .catch(err => {
   	  res.status(400).json(err)
   })	
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	 .catch(err => res.status(400).json(err))
}

module.exports = {
	handleImage,
	handleApiCall
}