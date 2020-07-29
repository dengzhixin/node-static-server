let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

let server = http.createServer(function (request, response) {
    let parsedUrl = url.parse(request.url, true)
    let pathWithQuery = request.url
    let queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    let path = parsedUrl.pathname==='/'?'/index.html': parsedUrl.pathname
    let query = parsedUrl.query
    let method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    let fileTypes ={
        ".html":"text/html",
        ".js":"text/javascript",
        ".css":"text/css",
        ".png":"image/png",
        ".jpg":"image/jpeg",
        ".json":"text/json"
    }
    let fileType = fileTypes[path.substring(path.lastIndexOf('.')).toLowerCase()]
    console.log(fileType)
    response.setHeader('Content-Type', `${fileType};charset=utf8`)
    let content
    try{
        response.statusCode = 200
        console.log(path)
        content = fs.readFileSync(`./public/${path}`)

    }catch(e){
        response.statusCode = 404
        content="文件不存在"
    }
    response.write(content)
    response.end()


})

server.listen(port)
console.log(
    '监听 ' +
    port +
    ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' +
    port
)
