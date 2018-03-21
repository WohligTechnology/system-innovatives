var schema = new Schema({
    userEmail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    comments: {
        type: String
    }
});

schema.plugin(deepPopulate, {
    'userEmail': {
        select: ''
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('​ContactUs', schema, 'userEmail', 'userEmail');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);