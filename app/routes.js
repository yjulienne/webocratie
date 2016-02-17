var WcNode = require('./models/wcnode');

function getWcNodes(res) {
    WcNode.find(function (err, wcNodes) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(wcNodes); // return all wcNodes in JSON format
    });
}
;

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all wcNodes
    app.get('/api/wcNodes', function (req, res) {
        // use mongoose to get all wcNodes in the database
        getWcNodes(res);
    });

    // create wcNode and send back all wcNodes after creation
    app.post('/api/wcNodes', function (req, res) {

        // create a wcNode, information comes from AJAX request from Angular
        WcNode.create({
            text: req.body.text,
            done: false
        }, function (err, wcNode) {
            if (err)
                res.send(err);

            // get and return all the wcNodes after you create another
            getWcNodes(res);
        });

    });

    // upvote a wcNode
    app.get('/api/wcNodes/upvote/:wcNode_id', function (req, res) {
        WcNode.findOne({
            _id: req.params.wcNode_id
        }, function (err, wcNode) {
            if (err)
                res.send(err);
            wcNode.upvotes++;
            wcNode.save();
            getWcNodes(res);
        });
    });

    // downvote a wcNode
    app.get('/api/wcNodes/downvote/:wcNode_id', function (req, res) {
        WcNode.findOne({
            _id: req.params.wcNode_id
        }, function (err, wcNode) {
            if (err)
                res.send(err);
            wcNode.downvotes++;
            wcNode.save();
            getWcNodes(res);
        });
    });

    // delete a wcNode
    app.delete('/api/wcNodes/:wcNode_id', function (req, res) {
        WcNode.remove({
            _id: req.params.wcNode_id
        }, function (err, wcNode) {
            if (err)
                res.send(err);

            getWcNodes(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};