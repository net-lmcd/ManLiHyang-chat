const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");
const PROTO_PATH = __dirname + "/../proto/";
const REMOTE_SERVER = "0.0.0.0:50051";

// read terminal ipt
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// load protobuf
var proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(PROTO_PATH + "/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

var client = new proto.manlihyang.Chat(REMOTE_SERVER, grpc.credentials.createInsecure());

let fakeuser = {
    serviceCode: 1000,
    usn: "ablksfklj4lkjdf",
    biUsn: "ksfkljdf434lkjdf",
    email: "test@naver.com",
    content: "test"
};

// start the stream between server and client 
function runJoin () {
    let call = client.join();
    call.on('data', function(message) {
        console.log("[RECEIVED MESSAGE] : ", message);
    });
    call.on('end', function() {
        console.log("[END]");
    });
    call.write(fakeuser);
    call.end();
}

runJoin();