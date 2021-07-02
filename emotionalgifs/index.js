var multipart = require('parse-multipart');



module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);
    
    // TODO: assign the body variable the correct value
    var body = req.body;

    // parse the body
    var parts = multipart.Parse(body, boundary);

    var imageData = parts[0].data;

    var convertedResult = Buffer.from(imageData).toString('base64');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: convertedResult
    };
}