import http from 'http';
import app from './app.js';
const Port = process.env.PORT;

const server = http.createServer(app)

server.listen(Port,()=>{
    console.log(`Server is listening on port ${Port}`);
});