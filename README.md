# gulp-tasklist
Get task list of gulp file in node.js.

## Why

We all know that `gulp --tasks` or `gulp -T` can list all tasks of the gulpfile, but they consume too much time than I thought. Otherwise, I want to get the list in my node program, that means I have to wait, catch, process raw data from stdout. It's still [another way](https://github.com/gulpjs/gulp/issues/438) to get the list in node, but … not elegant!

So I write a simple parser with [esprima](http://esprima.org/) to achieve this goal, and found it is really faster than previous ways.

![](https://user-images.githubusercontent.com/8896124/29171233-5fb7c2d8-7e0e-11e7-8182-d2a308bde88a.png)

## Installation

```shell
npm install --save gulp-tasklist
```

## How to use

Here is the official demo code on [Gulp](https://gulpjs.com/) website:

```js
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');

gulp.task('html', function(){
  return gulp.src('client/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'))
});

gulp.task('css', function(){
  return gulp.src('client/templates/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);
```

Just require `gulp-tasklist` package and call `getList()` method:

```javascript
const TaskList = require('gulp-tasklist');
const path = require('path');

let filePath = path.join(__dirname, 'gulpfile.js');
// Just pass the gulpfile path and get the list object
let res = TaskList.getList(filePath);

if (res.err) throw res.err;
else console.log(res.data);

// As result stdout prints:
// { html: { deps: [] },
//   css: { deps: [] },
//   default: { deps: [ 'html', 'css' ] } }
```

## License

MIT