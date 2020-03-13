const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html><head><title>My first page</title></head>');
        res.write('<body><form method="POST" action="/message">');
        res.write('<input type="text" name="message"><br>');
        res.write('<input type="submit" value="Submit"></form>');
        res.write('</body></html>');
        return res.end();   
    }
    
    if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
         console.log(chunk);
         body.push(chunk);
    });

    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, (err) => {
            res.statusCode = 302;
            res.setHeader('location', '/');
            return res.end();
        });
    });
    }
    res.setHeader('Content-type', 'text/html');
    res.write('<html><head><title>My first page</title></head>');
    res.write('<body><h1>My first node js server page</h1></body></html>');
    res.end();
};

module.exports = requestHandler;
