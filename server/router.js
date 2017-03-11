function router(app, express, mongoose,angulars) {

    app.set('view engine', 'ejs');
    app.use(express.static(__dirname + '/../public'));

    var todoModel = require("../schemas/taskSchemas.js")(mongoose);
    // todoModel.remove();
    // var testTasks = new todoModel({
    //     task : "test text1",
    //     time : 12312312,
    //     status : true
    // });
    // testTasks.save();

    //var angularsModel = angular.module("angularsModel", []);
    //


    app.get('/', function (req, res) {

        todoModel.find(function (err, tasks) {
            res.render('template', { data: tasks });
        });
    });

    app.get('/remove', function (req, res) {
        var requestRemove = req.query;
        todoModel.find(function (err, tasks) {
            for(var i = 0; i < tasks.length; i ++) {
                if(tasks[i]._id == requestRemove.remove) {
                    tasks[i].remove();
                }
            }
        });
    });

    app.get('/refact', function (req, res) {
        var requestRemove = req.query;

        todoModel.find(function (err, tasks) {
            for(var i = 0; i < tasks.length; i++) {
                if(tasks[i]._id == requestRemove.thisId) {
                    tasks[i].task = requestRemove.refact;
                    tasks[i].save();
                }
            }
        })
    });

    app.get('/todoFilter', function (req, res) {
        var requestFilter = req.query.filter,
            arrTask = [],
            re = new RegExp(requestFilter),
            thuiTaskObt;

        todoModel.find( function (err, listTask) {
            thuiTaskObt = '';
            for(var i = 0; i < listTask.length; i++) {
                thuiTaskObt = listTask[i].task.match(re);
                if(thuiTaskObt !== null) {
                    arrTask.push(listTask[i]);
                }
            }
            res.render('partials/todo', {data: arrTask});
            return false;
        });
        return false;
    });

    app.get('/added', function (req, res) {
        var requestData = req.query;

        var testTasks = new todoModel({
            task : requestData.added,
            time : 12312312,
            status : true
        });

        testTasks.save();
        res.send(requestData.added);
            // todoSchema.find("text", function (err,task) {
            //     todoSchema.remove("text", function () {
            //         console.log(task)
            //     });
            //     res.render('partials/todo',{data: task});
            // });

            // task.save(function (err, task) {
            //     if(err) {
            //         return console.error(err);
            //     }
            //     var tmpTasks = [];
            //     todoSchema.find("text", function (err,task) {
            //         for(var i = 0; i < task.length; i++) {
            //             if(task[i].text !== "" && task[i].text !== undefined) {
            //                 tmpTasks.push(task[i].text);
            //             }
            //         }
            //         res.render('partials/todo',{ data: tmpTasks });
            //     });
            //
            // });



            // todoSchema.find("text", function (err,task) {
            //     task.remove();
            //     res.render('partials/todo',{data: task});
            // });
    });
}

module.exports = router;