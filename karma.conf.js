module.exports = function (config) {
    config.set({
        basePath: './',
        files: ['resources/js/components/main-nav.js', 'resources/js/components/smoothscroll.js', 'test/**/*.js',
            {
                pattern: 'public/index.html',
            }],

        frameworks: ['browserify', 'mocha', 'fixture', 'chai'],
        browsers: ['PhantomJS', 'Chrome'], // 'Chrome'
        preprocessors: {
            'resources/js/components/main-nav.js': ['browserify'],
            'resources/js/components/smoothscroll.js': ['browserify'],
            'test/**/*.js': ['browserify'],
            'public/index.html'   : ['html2js'],
        },
        browserify: {
            debug: true,
            bundleDelay: 1000,
            transform: [['babelify', {
                ignore: /node_modules/
            }]],
            extensions: ['.js']
        },
        reporters: ['mocha'],

        logLevel: config.LOG_DISABLE,
        singleRun: true,
        autoWatch: false
    });
};