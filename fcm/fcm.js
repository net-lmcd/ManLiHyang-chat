const admin = require('firebase-admin');
const serviceAccount = require('/Users/user/firebase/manlihyang-55bb9-firebase-adminsdk-jicmz-02b377bcfc.json');
    
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://manlihyang-55bb9.firebaseio.com"
})

const registrationToken_phone = 'dUXt1GJqxqg:-pwDI-3vUp1oUFbm9ex3u7H0MUlcC44D3_hU6DCNDkGGBn40Dixd0hFy2m6bvm-7g0VCIq2n09_QXdpWxCy6Z';

const message = {
    notification: {
        title: 'TEST TITLE',
        body: 'TEST BODY'
    },
    token: registrationToken_phone
}

const messages = {
    data: {message: 'test messsage'},
    tokens: registrationTokens,
}

const sendMsgToPeer = (message) => {
    admin.messaging().send(message)
        .then((response) => {
            /* 성공시 메시지 ID가 반환됨.
            {
                "name":"projects/myproject-b5ae1/messages/0:1500415314455276%31bd1c9631bd1c96"
            }
            */
            console.log('successfully sent message : ', response);
        })
        .catch((error) => {
            console.log('error sending message : ', error);
        });
}

const sendMsgToMulticast = (message) => {
    admin.messaging.sendMsgToMulticast(message)
        .then((response) => {
            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((response, id) => {
                    if (!response.success) {
                        failedTokens.push(regis)
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
            }
        });
}

const arr = [0,1];
arr.forEach(ele => sendMsgToPeer(message));

module.exports.sendMsgToPeer = sendMsgToPeer;