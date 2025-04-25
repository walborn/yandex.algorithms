const fs = require('fs')
const test = 1
const input = fs.readFileSync(`${__dirname}/tests/${test}`, 'utf8').split('\n')
// const answer = fs.readFileSync(`${__dirname}/tests/answers/${test}`, 'utf8')


// COPY FROM HERE and uncomment this
/*
const fs = require('fs')
const __input__ = fs.readFileSync('input.txt', 'utf8').split('\n')
const input = ((i = 0) => () => __input__[i++])()

//*/
let [n, s] = input[0].split(' ').map(Number);
let a = input.slice(1).map((line, i) => {
  let [v, c, p] = line.split(' ').map(Number);
  return [v, c, p, i];
});

a.sort((x, y) => y[2] - x[2]);

let ds = [], qs = [], r = [];
let C = -1, I = -1;

let d = { 0: 0 };
let q = {};

for (let i = 0; i < n; i++) {
  let [v, c, p, _] = a[i];
  let newD = { ...d };
  let newQ = { ...q };

  for (let j = s + p - v; j >= 0; j--) {
    if (j in d) {
      let x = d[j] + c;
      if (!(j + v in d) || d[j + v] < x) {
        newD[j + v] = x;
        newQ[j + v] = i;
      }
    }
  }

  d = newD;
  q = newQ;

  let k = Object.keys(d).reduce((max, key) => d[key] > d[max] ? key : max, '0');
  if (C < d[k]) {
    C = d[k];
    I = i;
    K = k;
  }

  ds.push({ ...d });
  qs.push({ ...q });
}

r = [];
let j = K;
for (let i = I; i >= 0; i--) {
  if (j < 1) break;
  let [v, c, p, index] = a[qs[i][j]];
  r.push(index + 1);
  j -= v;
}

console.log(r.length, C);
console.log(r.join(' '));
