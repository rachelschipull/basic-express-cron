const express = require('express')
const app = express()
const PORT = 3000

let key = Math.random() * 10000
let writeDate = new Date() //current write time
let rewriteInterval = 5000

app.get('/', (req, res) =>  {
    const now = new Date()
    res.status(201)
        .send(`<p> key: ${key} | Remaining time: ${(rewriteInterval - (now - writeDate))/ 1000}ms<p>`)
})

app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
)

function cron(ms, fn) {
    async function cb(){
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms)
    return () => {}
}

cron(rewriteInterval, () => {
    key = Math.random()*10000
    writeDate = new Date()
})