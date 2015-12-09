/* eslint-disable no-process-env */
/* config file */
var autoprefixer = require("autoprefixer"),
    cssnext = require("postcss-cssnext"),
    path = require("path"),
    webpack = require("webpack");
var appPath = path.resolve(__dirname, "react", "components", "App.jsx");
var options = {
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {presets: ["es2015", 'react']}}
            ,
            {test: /\.css$/, loader: "style!css?modules!postcss"},
            {test: /\.scss$/, loader: "style!css?modules!sass?outputStyle=expanded&" +
            "includePaths[]=" +
            encodeURIComponent(path.resolve(__dirname, "node_modules/bootstrap-sass/assets/stylesheets")) + "&" +
            "includePaths[]=" +
            encodeURIComponent(path.resolve(__dirname, "public/stylesheets"))
            }
        ],
        postcss: [autoprefixer, cssnext]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "public", "js"),
        publicPath: "/js"
    },
    plugins: [
        new webpack.ProvidePlugin({fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch"}),
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
};

options.cache = true;
options.debug = true;
options.devtool = "cheap-module-eval-source-map";
options.entry = {
    App: ["webpack-hot-middleware/client?reload=true", appPath]
};
options.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
);

module.exports = options;