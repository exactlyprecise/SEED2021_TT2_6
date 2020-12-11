//npm run devStartAuth

const express = require("express")
const app =  express()
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
app.use(express.json())

API_KEY = "nIQY2CKXiN61xvsVkVx6P4uf4qRlPXO34XeLt1aE"


app.post('/login', async (req, res) => {
    // FETCH  data
    // ASSUMING REQ BODY has req.username
    const username = req.body.username
    const password = req.body.password
    console.log(password)

    let result = await fetchCredentials(username, password, API_KEY)
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

async function fetchCredentials(username, password, key) {
    let responseJSON = await fetch("https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login", {
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password}),
        headers: {
            'x-api-key': key
        },
        })
        .then((response) => response.json())
    return responseJSON
}

app.listen(4002)