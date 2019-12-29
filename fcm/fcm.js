const admin = require('firebase-admin');
const serviceAccount = require('/Users/user/firebase/manlihyang-55bb9-firebase-adminsdk-jicmz-02b377bcfc.json');
    
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://manlihyang-55bb9.firebaseio.com"
})

const registrationToken = 'test-token';
const registrationTokens = [
    'abcdefg',
    'hijklmn',
    'opqrefs',
    'vafsdfs'
];

const message = {
    data: {message: 'test message'},
    token: registrationToken
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
