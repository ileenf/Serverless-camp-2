var multipart = require('parse-multipart');
var fetch = require('node-fetch');


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    var boundary = multipart.getBoundary(req.headers['content-type']);
    
    // TODO: assign the body variable the correct value
    var body = req.body;

    // parse the body
    var parts = multipart.Parse(body, boundary);

    var imageData = parts[0].data;

    var result = await analyzeImage(imageData);

    let emotions = result[0].faceAttributes.emotion;

    let objects = Object.values(emotions);

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));

    let gifurl = await findGifs(main_emotion);
    context.res = {
        body: gifurl
        
    };
    console.log(result)
    context.done(); 

    
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';



    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    //COMPLETE THE CODE
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        
            //ADD YOUR TWO HEADERS HERE
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })

    let emotionData = await resp.json();
    return emotionData;
}

async function findGifs(emotion){
    const giphykey = process.env.giphykey;
    let gifresponse = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=" + giphykey + "&s=" + emotion);
    let gifresp = await gifresponse.json();
    return gifresp.data.url;
}
