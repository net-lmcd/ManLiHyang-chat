const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { APP_CONST } = require('../const/app');
const { join, send } = require('./chat');

var proto = protoLoader.loadSync(
    APP_CONST.PROTO_PATH + "chat.proto", {
    keepCase: true, 
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

var chat = grpc.loadPackageDefinition(proto).manlihyang;

const grpcServer = () => {
    var server = new grpc.Server();
    server.addService(chat.Chat.service, {
        send: send,
        join: join
    });
    return server;
}

var routeServer = grpcServer();
if (routeServer) {
    routeServer.bind(APP_CONST.SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
    routeServer.start();
    console.log("GRPC SERVER RUNNING !!");
}
