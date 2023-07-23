// HTTP Module with using req and res actity.

var http = require('http')

http.createServer((req,res)=>{
    res.write('Hello world') // res activity
    res.write(req.url) // res activity with req
    res.end()
    console.log('server running...')
}).listen(8080)