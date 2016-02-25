var mongoose = require('mongoose');
var tree = require('mongoose-path-tree');

var WcNode = new mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    upvotes: {
    	type: Number,
    	default: 0
    },
    downvotes: {
    	type: Number,
    	default: 0
    }
});
WcNode.plugin(tree);

module.exports = mongoose.model('WcNode', WcNode);