var listController = require("./../controllers/listController");

module.exports = function routes(app) {

    app.get("/", function(req, res, next){
        res.sendFile(__dirname + "public/index.html");
    });

    app.get("/getPersons", listController.getPersons);
    app.delete("/removePerson", listController.removePerson);
    app.post("/addPerson", listController.addPerson);
    app.post("/increase/:id", listController.increase);
    app.post("/decrease/:id", listController.decrease);
};


