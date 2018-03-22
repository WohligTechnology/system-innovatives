var schema = new Schema({
   userEmail: {
        type: String,
        validate: validators.isEmail()
    },
     name: {
        type: String
    },
    number: {
        type: Number
    },
    comments: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Contact', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);