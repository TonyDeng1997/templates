Development Setup

The package.json is generated by `npm init`.
It does not matter if you run it before you run `npm install` to install
a bunch of packages or after you installed them, in the dependencies section,
you will see the package summary.

Steps to run the project in development environment,

npm install -g babel
npm install -g babel-cli
npm install webpack-dev-server -g
npm install webpack --save
npm install react --save
npm install react-dom --save
npm install babel-core
npm install babel-loader
npm install babel-preset-react
npm install babel-preset-es2015

Next, start the server on port 8081 by running,

`npm start`.