var sass = require('./index');

sass.on('success', function(data) {
  console.log('success!');
});

sass.on('error', function(err) {
  console.log('error', err);
});

sass.compile({
  data: '$blue:#3bbfce;$margin:16px;.content-navigation{border-color:$blue;color:darken($blue,9%);.border{padding:$margin/2;margin:$margin/2;border-color:$blue;}}'
});