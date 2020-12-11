//npm run devStartAuth

const express = require("express")
const app =  express()
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const cors = require("cors")
require('dotenv').config() // for env vairables
app.use(express.json())

API_KEY = "nIQY2CKXiN61xvsVkVx6P4uf4qRlPXO34XeLt1aE"

ACCESS_TOKEN_SECRET = "7c603d0b750ac06d742bca015d59cde7b984b91129e5f28ab7ed13391c0c1fe99c7ff024c1b440c2009dcde80f5c1306cfd87ffdbe1d428dc132fc50e986b561"
REFRESH_TOKEN_SECRET = "cfc12c648041d410ab4858841e87707ee901a1b2174f57dd410cd6549feb2f8f841c4e23a4a4cd9eac72a3fab38f53cb3e1ef694fb4d890e9433adf08486eaaa"
let refreshTokens = []

app.post('/login', async (req, res) => {
    // FETCH  data
    // ASSUMING REQ BODY has req.username
    const username = req.body.username
    const password = req.body.password

    let result = await fetchCredentials(username, password, API_KEY)

    if (result == "Error") {
        res.status(403)
        res.json()
    } else {

        custID = result["custID"]
        const user = {username: username, custID: custID}
        // PAYLOAD
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
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
        
        res.json({details: result, accessToken: accessToken, refreshToken: refreshToken})
    }
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
        .then((response) => handleResponse(response))
    return responseJSON
}

function handleResponse(response) {
    if (response.status == 403) {
        return "Error"
    } else {
        return response.json()
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '40m'})
    // can use 15s for testing expiration of tokens.
    // So you send login request to 4000, then get request to 3000 after 15s expires. 
}

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token!= req.body.token)
    // a filtered version where you only have tokens that are not the token in req.body
    res.sendStatus(204)
})

app.listen(4002)