// require
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('express.js로 만든 server입니다.')
})

app.listen(3000, () => {
  console.log(`3000번 port에 http server를 띄웠습니다.`)
})