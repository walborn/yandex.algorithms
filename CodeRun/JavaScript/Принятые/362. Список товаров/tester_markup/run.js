const fs = require('fs');
const path = require('path')
const solution = require('./solution');

const OUTPUT_PATH = path.resolve(__dirname, './output/output.html');

const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body style="padding: 0px; margin: 0px">
        ${solution()}
    </body>
    </html>
`;

fs.writeFileSync(OUTPUT_PATH, html, { encoding: 'utf-8' });
