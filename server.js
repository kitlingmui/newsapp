const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cheerio = require('cheerio')
const axios = require('axios')

const path = require('path')

const app = express()

// app.use(express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

axios.get("https://www.nytimes.com/section/us").then( r => {

    var $ = cheerio.load(r.data)

    var newstitle = []
    var newssummary = []

    $("h2.css-1dq8tca").each(function (i, element){ 
        var title = $(element).text();
        newstitle.push({
            title: title
        })
    })

    $("p.css-1echdzn").each(function (i, element){ 
        var summary = $(element).text();
        newssummary.push({
            summary: summary
        })
    })

    console.log(newstitle)
    console.log(newssummary)
})