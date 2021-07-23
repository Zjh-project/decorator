const fs = require('fs');
const path = require('path');

const content = {
    "presets": [
        ["@babel/preset-env", { "loose" : true }]
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        "@babel/plugin-transform-runtime"
    ]
};
const validBabel = () => {
    try {
        const babelFile = path.join(process.cwd(), '.babelrc');
        if (fs.existsSync(babelFile)) return;
        fs.writeFileSync(babelFile, JSON.stringify(content, null, 4));
    } catch (e) {
        console.log(e);
    }
};

module.exports = validBabel;