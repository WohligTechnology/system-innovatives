var schema = new Schema({
    userEmail: {
        type: String,
        validate: validators.isEmail()
    },
    activityDetail: [{
        type: String
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Usagelog', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    logActivity: function (data, callback) {
        Usagelog.findOne({
            userEmail: data.email,
        }).exec(function (err, found) {
            console.log("foundddddddd",found);
            if (err) {
                callback(err, null);
            } else {
                console.log("in if");
                if (_.isEmpty(found._id) || found == null) {
                    console.log("in found");
                    var data1 = {};
                    data1.activityDetail = [];
                    data1.userEmail = data.email;
                    data1.activityDetail.push(data.location);
                    Usagelog.saveData(data1, function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data);
                        }
                    })
                } else {
                    Usagelog.update({
                        userEmail: data.email
                    }, {
                        $push: {
                            activityDetail: data.location
                        }
                    }).exec(function (err, data) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data);
                        }
                    })
                }
            }
        });
    }



};
module.exports = _.assign(module.exports, exports, model);