/*
* @Author: 刘敏
* @Date:   2016-02-17 20:53:06
* @Last Modified by:   刘敏
* @Last Modified time: 2016-02-19 09:05:19
*/
const proxy = require('express-http-proxy');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

app.use('/api', proxy('liumin.me:3000'));
app.use('/', express.static(`${__dirname}/dist`));
server.listen(8001);
console.log('服务器8001');
