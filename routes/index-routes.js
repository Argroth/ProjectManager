module.exports = (app) => {

//controller declaration
    const indexController = require('../controller/index-controller.js');

//controller usage
    app.get('/nudes', indexController.index);

    app.get('/api/hello', (req, res) => {
        res.send({express: 'Hello From Express'});
    });

    app.post('/api/world', (req, res) => {
        console.log(req.body);
        res.send(
            `I received your POST request. This is what you sent me: ${req.body.post}`,
        );
    });

}