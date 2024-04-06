'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _run = require('./run');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cli = (0, _meow2.default)('\n  Usage\n    $ npm-run-parallel <tasks>\n\n  Examples\n    $ npm-run-parallel task:a task:b\n');

(0, _run.runTasks)(cli.input);