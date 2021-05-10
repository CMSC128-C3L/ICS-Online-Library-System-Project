const bodyParser = require('body-parser')


//Sample only
exports.ui = (req, res) => {
	res.sendFile('resources/index.html', {root: __dirname}) //entry point for frontend
}

exports.user = (req, res) => {
	res.sendFile('resources/account.html', , {root: __dirname}) //sample html only
}

exports.login = (req, res) => {
	//req here will carry the user info from the html form or google token
	const data = req.body

	//These information can be get from google token
	var username;
	var email;

	//manipulate data here




	//Insert user to the database if it doesn't exist on the table yet





	//redirect to user account page
	res.redirect('/user/') // + username
}