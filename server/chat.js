let users = [];

// Receive message from client joining
// bi-stream 
const join = (call, callback) => {
    call.on('data', function(request) {
        newValue = {
            user: request.user,
            content: request.content
        };
        call.write(newValue);
    });
    
    call.on('end', function() {
        console.log("[END]");
        call.end();
    });
}

const send = (call, callback) => {
    console.log(call);
    console.log(call.request);
    callback(null, {message: "Hello" });
}

function nofifyChat(message) {
    users.forEach(user => {
        user.write(message);
    })
}

module.exports.join = join;
module.exports.send = send;

