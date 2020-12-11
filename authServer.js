//npm run devStartAuth

const express = require("express")
const app =  express()
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
app.use(express.json())

app.post('/login', async (req, res) => {
    // FETCH  data
    // ASSUMING REQ BODY has req.username
    const username = req.body.username
    const password = req.body.password
    const apiKey = req.header["x-api-key"]

    let result = await fetchCredentials()
    res.json(result)
    //console.log(result)

    // Now for the implementation of jsonwebtokens
        //const user = {name: username} // Payload to sign/ serialize in our jsonwebtoken
    // jwt needs to sign payload and secret key
        //const accessToken = generateAccessToken(user)
    // Can easily create secret value using crypt library in nodejs
    // > node > require('crypto').randomBytes(64).toString('hex')
    // also, no expiration date for this yet.
        //const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

        //refreshTokens.push(refreshToken)

        //res.json({ accessToken: accessToken, refreshToken: refreshToken })
    
    //res.json(result)
})

async function fetchCredentials() {
    let responseJSON = await fetch("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login", {
        method: 'POST',
        body: JSON.stringify({
            "username": "Group6",
            "password": "Jpqre7Y27A5_Hen"}),
        headers: {
            'x-api-key': 'nIQY2CKXiN61xvsVkVx6P4uf4qRlPXO34XeLt1aE',
        },
        })
        .then((response) => response.json())
    return responseJSON
}

app.listen(4001)