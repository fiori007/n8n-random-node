const min = 1;
const max = 100;
const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;


(async () => {
const res = await fetch(url);
const txt = (await res.text()).trim();
const n = parseInt(txt, 10);
console.log('result raw:', txt);
if (!Number.isInteger(n)) {
console.error('Invalid result from Random.org');
process.exit(1);
}
if (n < min || n > max) {
console.error('Out of range:', n);
process.exit(2);
}
console.log('OK - generated:', n);
})();