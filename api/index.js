import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANISATION_ID,
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


const app = express()
const port = process.env.PORT || 8800;

app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
    res.send('Hello WOrld')
})

app.post('/script', async (req, res) => {

    const { title } = req.body;
    console.log(title)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "system", content: "You are a professional writer who can write video scripts that go viral.\nWrite the text for a Youtube video on the provided topic.\nThe tone is HUMOROUS and writing style should be ENGAGING.\nInclude some facts in middle.\nAdd an appropriate intro in the start and a call-to-action in the end after outro.\nWrite heading between CURLY BRACKETS {}.\nMust be 700 words long"},
            {role: "user", content: `${title}`},
        ]
    })
    const text = completion.data.choices[0].message.content.replace(/{.*?}/g, '');

    res.json({
        completion: text
    })
})


app.post('/keyword', async (req, res) => {

    const { keywords } = req.body;
    console.log(keywords)

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            // {role: "system", content: "I am sending you a piece of text as Array.\nIt has many sentences separated by commas.\nEach sentence has ONE keyword in it\nA keyword is a single word.\nReplace the sentence with the keyword in it.\nReturn the text in the form of array"},
            {role: "system", content: "I am sending you a piece of text as Array.\nIt has many sentences separated by commas.\nI want a summary for each sentence. So tell me in 1-3 words what is happening in EVERY sentence.\nReplace the sentence with your description.\nBe concise.\nReturn the text in form of array"},
            // {role: "user", content: `${keywords}`},
            {role: "user", content: `${keywords}`},
        ]
    })

    const text = completion.data.choices[0].message.content;
    console.log(text)

    res.json({
        completion: text
    })
})

app.listen(port, () => {
    console.log(`App Running on http://localhost:${port}`);
})