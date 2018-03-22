var schema = new Schema({
    type: {
        type: String,
        default: "TUI Projects",
        enum: ['TUI Projects', 'Innovative PoC', 'Potential PoC', 'More Innovations']
    },
    description: {
        type: String
    },
    demoLink: {
        type: String
    },
    punchLine: {
        type: String
    },
    shortDescription: {
        type: String
    },
    featured: {
        type: Boolean
    },
    bannerImage: {
        type: String
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Projects', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);