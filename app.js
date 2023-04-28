const http = require('http');
const fs = require('fs');

//HTTP => (request, response)

http.createServer((request,response)=>{
    const file = request.url == '/' ? './www/index.html' : `./www${request.url}`;
    if(request.url == '/login'){
        let data = [];
        request.on("data", value=>{
            data.push(value);
        }).on("end",()=>{
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        });
    }else{
        
    }
    //const data = fs.readFileSync('./www/index.html');
    console.log(file)
    fs.readFile(file, (err,data)=>{
        if(err){
            console.log(err);
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("Not found");
            response.end();
        }else{
            const extension = request.url.split('.').pop(); 
            console.log(extension);
            switch (extension){
                case 'txt':
                    response.writeHead(200, {"Content-Type": "text/plain"});
                    break;
                case 'html':
                    response.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case 'css':
                    response.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case 'ico':
                    response.writeHead(200, {"Content-Type": "image/x-icon"});
                    break;
                case 'js':
                    response.writeHead(200, {"Content-Type": "image/js"});
                    break;
                case 'jpg':
                    response.writeHead(200, {"Content-Type": "image/jpg"});
                    break;
            default:
                response.writeHead(200, {"Content-Type": "text/html"});
            }
            response.write(data);
            response.end();
        }
    });

}).listen(4444);