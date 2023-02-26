const express = require('express')
const app = express()
const port = 3000

// get request
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/contact', (req, res) => {
  res.send('You can contact me from hooernping02@gmail.com')
})


app.get('/about', (req, res) => {
  res.send('My name is Hoo Ern Ping, and I am learning web development teached by Dr Angela')
})


app.listen(port, () => {
  // callback function
  console.log(`Example app listening on port ${port}`)
})