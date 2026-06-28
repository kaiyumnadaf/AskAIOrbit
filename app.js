import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import { fileURLToPath } from 'url';

const runfor = 'L';


// Set NODE_ENV and load the correct .env file
// process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.CONTYPE = runfor || 'P';
// const runfor = 'P';

const envdetails = dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) }).parsed;
globalThis.envdetails = envdetails;
process.env.ENVDETAILS = envdetails;


console.log('runfor loaded in app.js:', runfor);



const parseEnvObject = str => {
    if (!str) return {};
    if (typeof str !== 'string') return str; // already parsed
    let raw = str.trim();
    // Strip wrapping quotes if present
    if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
        raw = raw.slice(1, -1).trim();
    }
    return Object.fromEntries(
        raw
            .split(';')
            .map(s => s.trim())
            .filter(Boolean)
            .map(segment => {
                const [k, ...rest] = segment.split(':');
                if (!k) return null;
                const key = k.replace(/^['"]+|['"]+$/g, '').trim();
                const value = rest.join(':').trim().replace(/^['"]+|['"]+$/g, '');
                return [key, value];
            })
            .filter(Boolean)
    );
};

// Parse nested objects
if (envdetails) {
    envdetails.cdnUrl = parseEnvObject(envdetails.cdnUrl);
    envdetails.bucket = parseEnvObject(envdetails.bucket);
    envdetails.redisServer = parseEnvObject(envdetails.redisServer);
    envdetails.emailService = parseEnvObject(envdetails.emailService);
    envdetails.emailServices = parseEnvObject(envdetails.emailServices);
    envdetails.smsServices = parseEnvObject(envdetails.smsServices);
    envdetails.clearTaskidCacheApi = parseEnvObject(envdetails.clearTaskidCacheApi);
    envdetails.usernameapi = parseEnvObject(envdetails.usernameapi);
    envdetails.kafkadetails = parseEnvObject(envdetails.kafkadetails);
    envdetails.sendsmsapiurl = parseEnvObject(envdetails.sendsmsapiurl);
    envdetails.getcacheobjectapi = parseEnvObject(envdetails.getcacheobjectapi);
    envdetails.clearallcacheapi = parseEnvObject(envdetails.clearallcacheapi);    
    envdetails.clearsmsidcacheapi = parseEnvObject(envdetails.clearsmsidcacheapi); 
    process.env.GETCACHEOBJECTAPI = envdetails.getcacheobjectapi;
    process.env.CLEARALLCACHEAPI = envdetails.clearallcacheapi;
    process.env.CLEARSMSIDCACHEAPI = envdetails.clearsmsidcacheapi;

    // Add other keys as needed
}
else {
    console.error('envdetails is not defined properly.');
}

const config = await import('./environment/index.js').then(module => module.default(process.env.NODE_ENV, runfor, envdetails));
import { setConfig } from './config/configProvider.js';
setConfig(config);


import Routes from './routes/Routes.js';
import blog, { getLogger } from './middleware/bunyanlog.js';
// Logger auto-upgrades internally; use current instance directly
const logger = blog;

// Health log: show current logger identifiers and auto-detect upgrades
try {
    const lg = getLogger();
    const fields = lg && lg.fields ? lg.fields : {};
    console.log('[LOGGER-BOOT]', { name: fields.name, application: fields.application });
    const checkOnce = setInterval(() => {
        const cur = getLogger();
        const curFields = cur && cur.fields ? cur.fields : {};
        if (curFields.name !== fields.name || curFields.application !== fields.application) {
            console.log('[LOGGER-UPGRADE]', { name: curFields.name, application: curFields.application });
            clearInterval(checkOnce);
        }
    }, 2000);
} catch (e) {
    console.warn('[LOGGER-HEALTH] Unable to read logger fields at boot:', e.message);
}
import setupSwagger from './swagger.js';

// Load .env file based on NODE_ENV







process.on('uncaughtException', (err) => {
    logger.error('An uncaught exception occurred:', {
        message: err.message,
        stack: err.stack,
        error: err
    });
    console.error('Uncaught Exception:', err); // <-- Add this line
    logger.error('Process will exit now.');
    process.exit(1);
});




const app = express();

// Import directory utilities for setting up public folders

import { setupPublicDirectories } from './utils/dirUtils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up public directories with proper permissions
await setupPublicDirectories().catch(err => {
    console.error('Failed to set up public directories:', err);
});

// Serve static files from the public directory
app.use('/static', express.static(path.join(__dirname, '../', 'public/static')));
let server = http.createServer(app);
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Check if running directly (not via PM2)
const isRunningDirectly = !process.env.PM2_HOME;





server = http.createServer(app);
const PORT = config.port || process.env.PORT || 8002;
// config server to listen in specified port
server.listen(PORT, function (err) {
    logger.info('Listening to : ', server.address(), process.env.NODE_ENV, process.env.CONTYPE == 'L' ? '-- Public IP' : '-- Private IP');

    // console.log('Listening to : ', server.address(), process.env.NODE_ENV, process.env.CONTYPE == 'L' ? '-- Public IP' : '-- Private IP');
});

app.use(express.json());
// Set up session middleware for captcha storage
app.use(session({
    secret: process.env.SESSION_SECRET || 'me-email-services-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}))

import { requestLogger } from './middleware/requestLogger.js';

// Log every request
// Use dynamic logger resolution inside middleware to avoid stale snapshots
app.use(requestLogger({
    body: true // Set to true if you want to log response bodies
}));

// Routes
app.use('/api', Routes);
// Setup Swagger documentation
setupSwagger(app);


app.use('/hc.html', function (req, res, next) {
    res.statusCode = 200;
    res.end('hc');
});

// 502 error handler
app.use((err, req, res, next) => {
    if (err.status === 502) {
        logger.error({ url: req.url, body: req.body, error: err }, '502 error');
        res.status(502).json({
            status: 'error',
            message: 'Bad Gateway. Please try again later.'
        });
    } else {
        next(err);
    }
});

// General error handler
app.use((err, req, res, next) => {
    logger.error({ url: req.url, body: req.body, error: err }, 'Express error handler');
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});


// 404 handler (must be after all other routes and middleware)
app.use((req, res) => {
    logger.error({ url: req.url, body: req.body }, '404 Not Found');
    res.status(404).json({
        status: 'error',
        message: 'Invalid request: Not Found',
        details: { url: req.url, body: req.body }
    });
});
