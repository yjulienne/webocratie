var mongoose = require('mongoose');

module.exports = mongoose.model('WcNode', {
    text: {
        type: String,
        default: ''
    },
    children: {
    	type: Array,
    	default: []
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