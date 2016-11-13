const gulp = require('gulp')
const gutil = require("gulp-util");
const connect = require("gulp-connect");
const webpack = require("webpack");
const clean = require('gulp-clean');
const runSequence = require('run-sequence')
const webpackConfig = require("./webpack.config.js");

gulp.task('server', function() {
    connect.server({
        port:3333,
        root:'build'
    });
});

gulp.task('clean', function () {
    return gulp.src(['assets','build','dist'], {read: false})
        .pipe(clean());
});

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('front:watch', function () {
    gulp.watch('client/**/*', ['clean','webpack:build']);
});

gulp.task('default', () => {
    return runSequence(
        'clean',
        'webpack:build',
        ['front:watch','server']
    )
})
