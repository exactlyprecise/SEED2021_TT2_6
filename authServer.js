//npm run devStartAuth

const express = require("express")
const app =  express()
const cors = require("cors")
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
require('dotenv').config() // for env vairables
app.use(express.json())
app.use(cors());

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
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '30m'})
    // can use 15s for testing expiration of tokens.
    // So you send login request to 4000, then get request to 3000 after 15s expires. 
}

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token!= req.header.refreshtoken)
    // a filtered version where you only have tokens that are not the token in req.body
    res.sendStatus(204)
})

app.post('/extend', (req, res)=> {
    const refreshToken = req.headers.refreshtoken
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.send
    // so simply check the list of refreshTokens to see if it is a valid refreshToken
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name:user.name })
        // RECALL: user is the payload to sign in our jsonwebtoken
        res.json({accessToken: accessToken})
    })
})

app.listen(4000)