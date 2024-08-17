const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const corsMiddleware = require('./middleware/corsMiddleware');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter')

dotenv.config();

const app = express();

app.use(corsMiddleware);
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.send("Hello, I am working with Supabase <3");
});


app.listen(3001, () => {
    console.log(`> Ready on http://localhost:3001`);
});

