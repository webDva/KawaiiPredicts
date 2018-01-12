const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

import SimpleLinearRegression from 'ml-regression-simple-linear';

/*
 * API Server
 */

const app = express();
app.use(cors()); // Needed for file sharing.
// Needed for POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || '3000';
app.set('port', port);

/*
 * API Server
 */

// compute linear regression line.
// :datapoints must be in format of data = [{x: 5, y:3}, {x: 10, y:17}, {x: 15, y:4}, {x: 20, y:6}]
app.get('/regression/:datapoints', (req, res) => {
    const dataPoints = req.params.datapoints;
    let xValues = [], yValues = [];

    const numberOfDataPoints = dataPoints.lenth;

    for (let i = 0; i < numberOfDataPoints; i++) {
        xValues.push(dataPoints[i].x);
        yValues.push(dataPoints[i].y);
    }

    const regression = new SimpleLinearRegression(xValues, yValues);

    const result = {
        slope: regression.slope,
        y_intercept: regression.intercept,
        model: regression.toString(),
        numberOfDataPoints: dataPoints.length
    };

    res.send(result);
});

/*
 * HTTP Server
 */

// Point static path to dist
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Catch all other routes and return the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Start the HTTP server.
app.listen(port, (errorThatOccurs) => {
    if (errorThatOccurs) {
        return console.log('Something bad happened.', errorThatOccurs);
    }

    console.log(`Server running on port ${port}`);
});