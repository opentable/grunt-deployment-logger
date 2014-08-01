var redis = require('redis'),
    os    = require('os');

module.exports = function(grunt){
    var buildMessage = function(options, action){
        return {
            type: options.type,
            action: action,
            message: options.message,
            timestamp: options.timestamp || Date.now(),
            host: os.hostname()
        };
    };

    var execute = function(task, action, done){
        var options = task.options({
            port: 6379,
            host: '127.0.0.1',
            type: 'deployment-message',
            list: 'logstash'
        });

        var client = redis.createClient(options.port, options.host);
        var data = JSON.stringify(buildMessage(options, action));

        client.on('error', function (err) {
            grunt.fail.fatal(err);
        });

        client.on('connect', function(){
            client.rpush(options.list, data, function(){
                grunt.verbose.writeln('appended to list: ' + options.list + ' => ' + data);
                client.quit(function(){
                    done();
                });
            });
        });
    };

    grunt.registerMultiTask('start-deployment', function(){
        var done = this.async();
        execute(this, 'start-deploy', done);
    });

    grunt.registerMultiTask('end-deployment', function(){
        var done = this.async();
        execute(this, 'end-deploy', done);
    });
};
