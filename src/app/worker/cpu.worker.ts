import { environment } from "../../environments/environment";

addEventListener('message', ({ data }) => {
  const result = cpuIntensiveWork();
  postMessage(result);
});

const cpuIntensiveWork = function () {
  const start = new Date().getTime();
  let calResult = 0;
  for (let i = Math.pow(16, 7); i >= 0; i--) {
    calResult += Math.atan(i) * Math.tan(i);
  };

  let elapsed = new Date().getTime() - start;
  const milliseconds = (elapsed % 1000) / 100;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const result = { 'TimeElapsed': `${minutes}m, ${seconds}s, ${milliseconds}ms`, 'output': calResult };
  return result;
}
