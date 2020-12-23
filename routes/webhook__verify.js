const processPostback = require('../processes/postback');
const processMessage = require('../processes/messages');

module.exports = (app, chalk) => {
    app.get('/webhook', (req, res) => {
        if(req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
            console.log('webhook verified')
            res.status(200).send(req.query['hub.challenge'])
        }else {
            console.error('verification failed. Token mismatch.');
            res.sendStatus(403);
         }
    })


    app.post('/webhook', (req, res) => {
        if(req.body.object === 'page') {
            // do something

            req.body.entry.forEach(el =>  {
                    console.log(el)

                    if (el.postback){
                        processPostback(el);
                     } else if (el.message){
                        processMessage(el);
                     }
            });
        }

        res.sendStatus(200);
    })

    
} 