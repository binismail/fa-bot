const express = require('express')
const morgan = require('morgan')

const app = express()

// port
app.set('port', (process.env.PORT || 3000));

//routes

require('./routes/webhook__verify') (app);

//middleware
app.use(morgan('dev'))
app.use(express.json())


app.listen(app.get('port'), () => {
    const url = 'http://localhost:' + app.set('port')
    console.log('application is running on ' + app.set('port'))
})