const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: ()=> 1000 // if loss connection to our server, it will try to reconnect it every 1000 second
});

const subscriptions = redisClient.duplicate();

function fib(index){
    if(index < 2) return 1;
    return fib(index - 1) + fib(index -2);
};

subscriptions.on('message',(channel,message)=>{
    redisClient.hset('values',message,fib(parent(message)));
}); 

subscriptions.subscribe('insert'); 