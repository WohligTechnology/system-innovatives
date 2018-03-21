var schema = new Schema({
    rating: {
        type: String
    },
    comment: {
        type: String
    },
    userEmail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }
});

schema.plugin(deepPopulate, {
    'userEmail': {
        select: ''
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Feedback', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'userEmail', 'userEmail'));
var model = {};
module.exports = _.assign(module.exports, exports, model);