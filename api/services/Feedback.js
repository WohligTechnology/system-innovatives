var schema = new Schema({
    rating: {
        type: String
    },
    comment: {
        type: String
    },
    userEmail: {
        type: String,
        validate: validators.isEmail()
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Feedback', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);