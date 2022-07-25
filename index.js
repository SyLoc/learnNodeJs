const http = require('http');
const fs = require('fs')
const url = require('url');

const PORT = 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url === '/') {
        res.end('Hello World!');
    }

    if (req.url === '/start') {
        res.write('<h1>Start with Nodejs web server</h1>')
        res.end()
    }

    // http://localhost:8080/default.htm?year=2017&month=february
    if (req.url.includes('?')) {
        const q = url.parse(req.url, true)
        const qdata = q.query;
        const str = qdata.month + ' ' + qdata.year;
        res.write(str)
        res.end()
    }

    if (req.url === '/read_html_file') {

        fs.readFile('./files/demofile.html', (err, data) => {
            if (err) throw err

            res.write(data)
            res.end()
        })
    }

    // creat file
    if (req.url === '/create_file') {
        fs.open('./files/mynewfile1.txt', 'w', (err, file) => {
            if (err) throw err;

            res.write('File created successfully!')
            res.end()
        });
    }

    // write file
    if (req.url === '/write_file') {
        fs.writeFile('./files/mynewfile1.txt', 'Hello content!', (err) => {
            if (err) throw err;

            res.write('File wrote successfully!')
            res.end()
        });
    }

    // read file
    if (req.url === '/read_file') {
        fs.readFile('./files/mynewfile1.txt', 'utf-8', (err, data) => {
            if (err) throw err;

            !data ? res.write('no content') : res.write(data)

            res.end()
        });
    }

    // append file
    if (req.url === '/append_file') {
        fs.appendFile('./files/mynewfile1.txt', ' This is my text.', (err, file) => {
            if (err) throw err;

            res.write('File appended successfully!')
            res.end()
        });
    }

    // replace file
    if (req.url === '/replace_file') {
        fs.writeFile('./files/mynewfile1.txt', 'Replace content !', (err) => {
            if (err) throw err;

            res.write('File Replaced successfully!')
            res.end()
        });
    }

    // rename file
    if (req.url === '/rename_file') {
        fs.rename('./files/mynewfile1.txt', './files/myrenamedfile.txt', (err) => {
            if (err) throw err;

            res.write('File renamed successfully!')
            res.end()
        });
    }

    // delete file  => please rename the file before deleting it
    if (req.url === '/delete_file') {
        fs.unlink('./files/myrenamedfile.txt', (err) => {
            if (err) throw err;

            res.write('File deleted successfully!')
            res.end()
        });
    }


})

server.listen(PORT)

console.log("Node.js web server at port 8080 is running...");