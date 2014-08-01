# grunt-deployment-logger

[![Build Status](https://travis-ci.org/opentable/grunt-deployment-logger.png?branch=master)](https://travis-ci.org/opentable/grunt-deployment-logger) [![NPM version](https://badge.fury.io/js/grunt-deployment-logger.png)](http://badge.fury.io/js/grunt-deployment-logger) ![Dependencies](https://david-dm.org/opentable/grunt-deployment-logger.png)

Provides tasks to log deployment markers to redis. See [kibana docs](http://www.elasticsearch.org/blog/whats-cooking-kibana/) for more info.

```['start-deployment', 'end-deployment']```

Currently only supports logging to redis. The `type` option is provided so that you can strongly-type the log messages.

```js
grunt.initConfig({
  'start-deployment': {
    'myproject': {
      options: {
        host: '127.0.0.1',
        port: 6379,
        list: 'logstash',
        type: 'myproject-deployment-message',
        message: 'starting deployment of version 1.2.3'
      }
    }
  },
  'end-deployment': {
      'myproject': {
        options: {
          host: '127.0.0.1',
          port: 6379,
          list: 'logstash',
          type: 'myproject-deployment-message',
          message: 'finished deployment of version 1.2.3',
          timestamp: new Date().toISOString() // default timestamp is unix milliseconds, you can override it if you want ISO or something else
        }
      }
    }
});
```

Sample message output (based on above configuration)

```json
{
  "type": "myproject-deployment-message",
  "action": "start-deploy",
  "message":"starting deployment of version 1.2.3",
  "timestamp": 1399997783542,
  "host": "my.machine.name.local"
},

{
  "type": "myproject-deployment-message",
  "action": "end-deploy",
  "message":"finished deployment of version 1.2.3",
  "timestamp": '2014-08-01T12:31:23.345Z",
  "host": "my.machine.name.local"
}
```
