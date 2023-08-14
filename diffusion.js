// var request = require('request');

// var options = {
//     'method': 'POST',
//     'url': 'https://stablediffusionapi.com/api/v3/text2img',
//     'headers': {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "key": "Q5MW6wwquce7VKQNlyaS31JsQUlGMNaSsOUiBQ8q1ceF8FfINdINaZbAgmac",
//         "prompt": "Generate a trendy outfit suggestion for an Indian wedding reception. The preferred colors are yellow and green. The budget is under 10000. The preferred outfit is a sherwani with a tailored fit. Accessories include a turban and mojri. The outfit should incorporate patterns. Please provide a creative and stylish outfit idea.",
//         "negative_prompt": null,
//         "width": "512",
//         "height": "512",
//         "samples": "2",
//         "num_inference_steps": "20",
//         "seed": null,
//         "guidance_scale": 7.5,
//         "safety_checker": "yes",
//         "multi_lingual": "no",
//         "panorama": "no",
//         "self_attention": "no",
//         "upscale": "no",
//         "embeddings_model": null,
//         "webhook": null,
//         "track_id": null
//     })
// };

// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     const responseJSON = (response.body);
//     console.log(responseJSON);


//     const responseObject = JSON.parse(responseJSON);
//     const outputArray = responseObject.output;

//     console.log(outputArray);
// });







const axios = require('axios');

axios.post(

    'https://stablediffusionapi.com/api/v3/text2img',

    {
        "key": "UkCArMTp0uCp25BTqo7FmOGVVk82lyX575FOyW6fHgDTqnIVkVeCzfFsbAKd",
        "prompt": "Generate a trendy outfit suggestion for an Indian wedding reception. The preferred colors are yellow and green. The budget is under 10000. The preferred outfit is a sherwani with a tailored fit. Accessories include a turban and mojri. The outfit should incorporate patterns. Please provide a creative and stylish outfit idea.",
        "negative_prompt": null,
        "width": "512",
        "height": "512",
        "samples": "2",
        "num_inference_steps": "20",
        "seed": null,
        "guidance_scale": 7.5,
        "safety_checker": "yes",
        "multi_lingual": "no",
        "panorama": "no",
        "self_attention": "no",
        "upscale": "no",
        "embeddings_model": null,
        "webhook": null,
        "track_id": null
    }
)
.then(function (response) {

    console.log(response);

    // const responseJSON = (response.body);
    // console.log(responseJSON);


    // const responseObject = JSON.parse(responseJSON);
    // const outputArray = responseObject.output;


    const outputArray = response.data.output

    console.log("outputArray :: ", outputArray);
})
.catch(function (error) {
    console.log(error);
});
