module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var password = req.query.password;

    var response;

    if (password == "letmein"){
        response = "Access granted.";
    } else {
        response = "Access denied.";
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response
    };
}