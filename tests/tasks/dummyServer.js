var Net = require('net');

module.exports = function(grunt){
    grunt.registerTask('start-server', function(){
        var server = Net.createServer(function (c) {
            c.on('data', function (data) {
                var d = data.toString();

                if (d.indexOf("rpush\r\n") > -1) {
                    c.write(':1\r\n');
                }

                if (d.indexOf("info\r\n") > -1) {
                    c.write('$32\r\n# Server\r\nredis_version:2.6.16\r\n');
                }

                if (d.indexOf("quit\r\n") > -1) {
                    c.end();
                }
            });
        }).listen(6379);
    });
}
