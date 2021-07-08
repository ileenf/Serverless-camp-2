

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    var plaintext = req.query.plaintext;
    const morse = require("morse-code-converter");
    
    const code = morse.textToMorse(plaintext);
    
    context.res = {
    // status: 200, /* Defaults to 200 */
    body: code
    };
    }