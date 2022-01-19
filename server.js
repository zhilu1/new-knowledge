const Redis = require('ioredis');
var express = require('express');


var app = express();
app.use(express.json());
app.get('/category', getCategory)
app.get('/knowledge/:id', getAroundKnowledge)
app.get('/knowledge/:id/:range', getMultKnowledge)
app.post('/knowledge/:id', postKnowledge)
// app.get('/knowledge/:id/:range', getRangedKnowledge)
// Connect to Redis at 127.0.0.1, port 6379.
const redisClient = new Redis({
host: '127.0.0.1',
port: 6379,
});
function getCategory(req, res){
    redisClient.lrange("category",0,-1).then(
        (reply) => {
            console.log(reply)
            res.send(reply)
        }
    )
}

function getMultKnowledge(req, res){
    console.log(req.params)
    let lo = req.params.id - req.params.range
    let hi = req.params.id + req.params.range
    redisClient.zrangebyscore("knowledge", lo, hi).then(
        (reply) => {
            console.log(reply);
            // res.json(reply);
            res.send(reply);
        }
    );
}


function getAroundKnowledge(req, res){
    let lo = req.params.id - 100
    let hi = req.params.id + 100
    redisClient.zrangebyscore("knowledge", lo, hi).then(
        (reply) => {
            console.log(reply);
            res.json(reply);
            // res.send(reply);
        }
    );
}

function postKnowledge(req, res){
    let data = {
        title: req.body.title,
        lv: req.body.lv,
        link: req.body.link,
        message: req.body.message,
    }
    redisClient.zadd("knowledge", req.params.id, JSON.stringify(req.body)).then(
        (reply) => {
        // if (err) {
        //     console.log("err")
        //     console.log(err)
        // };
        console.log(reply)
        console.log("here")
        res.json(reply)
    })
}

app.listen(3000);
console.log("server start successful")