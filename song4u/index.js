module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const querystring = require('querystring');
    var reqbody = req.body;

    const queryObject = querystring.parse(req.body);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: queryObject.MediaUrl0
    };
}