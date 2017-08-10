const TaskList = require('../index');
const path = require('path');

let filePath = path.join(__dirname, 'gulpfile-demo.js');
let res = TaskList.getList(filePath);

if (res.err) throw res.err;
else console.log(res.data);
