// Imports
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './api-routes.js';
import cors from 'cors';

// Initialise the app
let app = express();

// Configure bodyparser to handle post requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options('*', cors());

// Setup MongoDB Connection
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB successfully'));

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', router).all((_, res) => {
  res.setHeader('content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
});

// Launch app to listen to specified port
app.listen(port, function () {
  console.log('Running on port ' + port);
});

export default app;
