
var http = require('http')
var fs = require('fs')

http.createServer((req,res)=>{
    fs.writeFile('sampleText.txt','fine',(err,data)=>{
        res.write(data)
        res.end()
    })

}).listen(2020)