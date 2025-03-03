const express = require('express');
const config = require('config');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Access configuration values
const appName = config.get('appName');
const port = config.get('port');
const dbHost = config.get('database.host');
const dbPort = config.get('database.port');
const dbName = config.get('database.name');

// Log the values to make sure they're correct
console.log(`App Name: ${appName}`);
console.log(`Port: ${port}`);
console.log(`Database Host: ${dbHost}`);
console.log(`Database Port: ${dbPort}`);
console.log(`Database Name: ${dbName}`);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check if the server is running
 *     responses:
 *       200:
 *         description: Server is running
 */
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
