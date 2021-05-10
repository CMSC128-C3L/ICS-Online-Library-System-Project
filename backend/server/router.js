const controller = require('./controller')

//All paths here are temporary, for template purposes only
//this exports a function that has the 'app' as the parameter
//get and post methods are not limited to these

module.exports = (app) => {
	app.get('/', controller.ui)
	app.get('/user/:username', controller.user)
	app.post("/login", controller.login)
}