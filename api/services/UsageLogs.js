var schema = new Schema({
    userEmail: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    activityDetail: {
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
module.exports = mongoose.model('UsageLogs', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'userEmail', 'userEmail'));
var model = {};
module.exports = _.assign(module.exports, exports, model);