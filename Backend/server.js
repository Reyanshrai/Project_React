import http from 'http';
import app from './app.js';
const Port = process.env.PORT;

http.createServer(app).listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
});