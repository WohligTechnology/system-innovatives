var schema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: ['TUI Projects', 'TUI Innovative Pilots', 'TUI Potential Pilots', 'Cross Industry Innovations'],
        default: 'TUI Projects'
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
var model = {


    projectDetail: function (data, callback) {
        console.log("data in project deatail", data)
        Projects.findOne({
            _id: data._id
        }).deepPopulate("").exec(function (err, found) {
            if (err) {
                console.log('err', err);
                callback(err, null);
            } else if (_.isEmpty(found)) {
                callback(null, 'noDataFound');
            } else {
                callback(null, found);
            }
        });
    },

    projectList: function (data, callback) {
        Projects.find({
            type: data.type
        }).exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        });
    },

    featuredProjects: function (data, callback) {
        Projects.find({
            featured: true
        }).exec(function (err, data) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        });
    },


};
module.exports = _.assign(module.exports, exports, model);