module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
logActivity: function (req, res) {
        Usagelog.logActivity(req.body, res.callback);
    }
};
module.exports = _.assign(module.exports, controller);
