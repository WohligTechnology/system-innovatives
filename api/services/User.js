var schema = new Schema({
    email: {
        type: String,
        validate: validators.isEmail()
    },
    tokenKey: {
        type: String,
        default: ""
    },
    requestApproved: {
        type: Boolean
    },
    lastOpened: {
        type: Date
    },
    admin: {
        type: Boolean
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'user': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('User', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "user", "user"));
var model = {
    add: function () {
        var sum = 0;
        _.each(arguments, function (arg) {
            sum += arg;
        });
        return sum;
    },
    existsSocial: function (user, callback) {
        var Model = this;
        Model.findOne({
            "oauthLogin.socialId": user.id,
            "oauthLogin.socialProvider": user.provider,
        }).exec(function (err, data) {
            if (err) {
                console.log(err);
                callback(err, data);
            } else if (_.isEmpty(data)) {
                var modelUser = {
                    name: user.displayName,
                    accessToken: [uid(16)],
                    oauthLogin: [{
                        socialId: user.id,
                        socialProvider: user.provider,
                    }]
                };
                if (user.emails && user.emails.length > 0) {
                    modelUser.email = user.emails[0].value;
                    var envEmailIndex = _.indexOf(env.emails, modelUser.email);
                    if (envEmailIndex >= 0) {
                        modelUser.accessLevel = "Admin";
                    }
                }
                modelUser.googleAccessToken = user.googleAccessToken;
                modelUser.googleRefreshToken = user.googleRefreshToken;
                if (user.image && user.image.url) {
                    modelUser.photo = user.image.url;
                }
                Model.saveData(modelUser, function (err, data2) {
                    if (err) {
                        callback(err, data2);
                    } else {
                        data3 = data2.toObject();
                        delete data3.oauthLogin;
                        delete data3.password;
                        delete data3.forgotPassword;
                        delete data3.otp;
                        callback(err, data3);
                    }
                });
            } else {
                delete data.oauthLogin;
                delete data.password;
                delete data.forgotPassword;
                delete data.otp;
                data.googleAccessToken = user.googleAccessToken;
                data.save(function () {});
                callback(err, data);
            }
        });
    },
    profile: function (data, callback, getGoogle) {
        var str = "name email photo mobile accessLevel";
        if (getGoogle) {
            str += " googleAccessToken googleRefreshToken";
        }
        User.findOne({
            accessToken: data.accessToken
        }, str).exec(function (err, data) {
            if (err) {
                callback(err);
            } else if (data) {
                callback(null, data);
            } else {
                callback("No Data Found", data);
            }
        });
    },
    updateAccessToken: function (id, accessToken) {
        User.findOne({
            "_id": id
        }).exec(function (err, data) {
            data.googleAccessToken = accessToken;
            data.save(function () {});
        });
    },
    /**
     * This function get all the media from the id.
     * @param {userId} data
     * @param {callback} callback
     * @returns  that number, plus one.
     */
    getAllMedia: function (data, callback) {

    },

    //login
    generateTokenKey: function (data, callback) {
        console.log("data in save with token", data);
        data.tokenKey = md5(data.tokenKey);
        User.saveData(data, function (err, data) {

            if (err) {
                console.log("err in save", err)
                callback(err, null);
            } else {
                console.log("data in save", data)
                callback(null, data);
            }
        })
    },


    //email verification

    sendAccess: function (data, callback) {
        async.waterfall([
                function (cbWaterfall) {
                    // data.accessToken = generator.generate({
                    //     length: 16,
                    //     numbers: true
                    // })
                    // User.saveData(data, function (err, complete) {
                    //     if (err) {
                    //         cbWaterfall(err, null);
                    //     } else {
                    //         if (_.isEmpty(complete)) {
                    //             cbWaterfall(null, []);
                    //         } else {
                    //             console.log("complete", complete);
                    //             cbWaterfall(null, complete);
                    //         }
                    //     }
                    // });
                    User.findOne({
                        email: data.email,
                    }).exec(function (err, found) {
                        if (err) {
                            cbWaterfall(err, null);
                        } else {
                            if (!_.isEmpty(found)) {
                                var foundObj = found.toObject();
                                delete foundObj.password;
                                cbWaterfall(null, foundObj);
                            } else {
                                cbWaterfall("Incorrect Credentials!", null);
                            }
                        }

                    });
                },
                function (foundObj, cbWaterfall1) {
                    var emailData = {};
                    console.log("data: ", data);
                    emailData.email = data.email;
                    emailData.from = "sayali.ghule@wohlig.com.com";
                    emailData.filename = "verification.ejs";
                    emailData.subject = "Verify Token key";
                    emailData._id = foundObj._id;
                    console.log("emaildata", emailData);

                    Config.email(emailData, function (err, emailRespo) {
                        if (err) {
                            console.log(err);
                            cbWaterfall1(null, err);
                        } else if (emailRespo) {
                            cbWaterfall1(null, emailRespo);
                        } else {
                            cbWaterfall1(null, "Invalid data");
                        }
                    });
                },
            ],
            function (err, data2) {
                if (err) {
                    console.log(err);
                    callback(null, []);
                } else if (data2) {
                    if (_.isEmpty(data2)) {
                        callback(null, []);
                    } else {
                        callback(null, data2);
                    }
                }
            });
    },

    verifyToken: function (data, callback) {
        User.findOne({
            tokenKey: data.tokenKey,
        }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                if (!_.isEmpty(found)) {
                    var foundObj = found.toObject();
                    callback(null, foundObj.email);
                } else {
                    callback("Incorrect Credentials!", null);
                }
            }
        });
    },

createUser: function (data, callback) {
    var data1={};
        data1.tokenKey = md5(data.tokenKey);
        data1.email = data.email;
        User.saveData(data1, function (err, data) {
            console.log("data1",data1);
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        })
    },

};
module.exports = _.assign(module.exports, exports, model);