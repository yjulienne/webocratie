var mongoose = require('mongoose');

module.exports = mongoose.model('WcNode', {
    text: {
        type: String,
        default: ''
    }
});