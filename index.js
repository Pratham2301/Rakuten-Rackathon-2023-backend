const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
var request = require('request');
const axios = require('axios');



const app = express();
app.use(express.json());




app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));





const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);


app.get('/', async (req, res) => {
    // const response = await openai.listEngines();
    res.send("hello....");
})


app.post("/q1", async (req, res) => {
    try {

        const { prompt } = req.body;

        // console.log(" 1 - ", prompt);

        const newPrompt = JSON.stringify(prompt) + "analyze the above data and generate a short prompt for generative AI to suggest proper outfit"

        // console.log(" 2 - ", newPrompt);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: newPrompt
            }],
        });

        // console.log(response);
        // console.log("response : ", response.data.choices[0].message);

        const generatedPrompt = response.data.choices[0].message.content;
        // gpt wala done

        // console.log("generatedPrompt : ", generatedPrompt);

        // diffusion wala shuru

        var finalAns = []

        axios.post(

            'https://stablediffusionapi.com/api/v3/text2img',

            {
                "key": process.env.DIFFUSION_KEY,
                "prompt": generatedPrompt,
                "negative_prompt": null,
                "width": "512",
                "height": "512",
                "samples": "4",
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

                // console.log(response);

                // const responseJSON = (response.body);
                // console.log(responseJSON);


                // const responseObject = JSON.parse(responseJSON);
                // const outputArray = responseObject.output;


                const outputArray = response.data.output

                // console.log("outputArray :: ", outputArray);

                finalAns = outputArray

                // console.log("final ans :: ", finalAns);


                return res.status(200).json({
                    success: true,
                    // data: response.data.choices[0].message,
                    data: finalAns,
                });

            })
            .catch(function (error) {
                console.log(error);
            });



        // console.log(" last wala..... ", finalAns);

        // return res.status(200).json({
        //     success: false,
        //     data: ".then not working....",
        // });






    } catch (error) {

        // console.log(error)

        return res.status(400).json({
            success: false,
            res1: error,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});



app.post("/q2", async (req, res) => {
    try {

        const { prompt } = req.body;

        // console.log(" 1 - ", prompt);

        const newPrompt = JSON.stringify(prompt)

        // console.log(" 2 - ", newPrompt);


        // diffusion wala shuru

        var finalAns = []

        axios.post(

            'https://stablediffusionapi.com/api/v3/text2img',

            {
                "key": process.env.DIFFUSION_KEY,
                "prompt": newPrompt,
                "negative_prompt": null,
                "width": "512",
                "height": "512",
                "samples": "4",
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

                // console.log(response);

                // const responseJSON = (response.body);
                // console.log(responseJSON);


                // const responseObject = JSON.parse(responseJSON);
                // const outputArray = responseObject.output;


                const outputArray = response.data.output

                // console.log("outputArray :: ", outputArray);

                finalAns = outputArray

                // console.log("final ans :: ", finalAns);


                return res.status(200).json({
                    success: true,
                    // data: response.data.choices[0].message,
                    data: finalAns,
                });

            })
            .catch(function (error) {
                console.log(error);
            });



        // console.log(" last wala..... ", finalAns);

        // return res.status(200).json({
        //     success: false,
        //     data: ".then not working....",
        // });






    } catch (error) {

        // console.log(error)

        return res.status(400).json({
            success: false,
            res1: error,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});




app.post('/q3', (req, res) => {

    try {

        const { link, prompt } = req.body;

        console.log(link, prompt)

        axios.post(

            'https://stablediffusionapi.com/api/v3/img2img',
            {
                "key": process.env.DIFFUSION_KEY,
                "prompt": prompt,
                "negative_prompt": null,
                "init_image": link,
                "width": "512",
                "height": "512",
                "samples": "1",
                "num_inference_steps": "30",
                "safety_checker": "no",
                "enhance_prompt": "yes",
                "guidance_scale": 7.5,
                "strength": 0.7,
                "seed": null,
                "webhook": null,
                "track_id": null
            }
        )
            .then(function (response) {

                const fdata = response.data

                console.log(fdata)

                return res.status(200).json({
                    status: true,
                    output: fdata
                });

            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (error) {

        // console.log(error)

        return res.status(400).json({
            success: false,
            res1: error,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`));

