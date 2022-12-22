import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-web-worker-app';
  selectedColour!: string;
  result: any;
  colourArr = ['#9999ff', '#00aaff', '#008000', '#b33c00', '#663300', '#cc3399'];
  isBusy = false;
  cpuWorker: any;

  constructor() {
    this.intializeWorker();
   
  }

  intializeWorker() {
    if (typeof Worker !== 'undefined') {
      if (!this.cpuWorker) {
        this.cpuWorker = new Worker('./worker/cpu.worker',
          { type: "module" });
      }
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your 
      // program still executes correctly.
    }
  }

  cpuIntensiveWorkWithoutWebWorker() {
    this.isBusy = true;
    const start = new Date().getTime();
    let calResult = 0;
    for (let i = Math.pow(16, 7); i >= 0; i--) {
      calResult += Math.atan(i) * Math.tan(i);
    };

    let elapsed = new Date().getTime() - start;
    const milliseconds = (elapsed % 1000) / 100;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    this.result = { 'TimeElapsed': `${minutes}m, ${seconds}s, ${milliseconds}ms`, 'output': calResult };
    this.isBusy = false;
    console.log('cpuIntensiveWorkWithoutWebWorker');
  }

  cpuIntensiveWorkWithWebWorker() {
    this.cpuWorker.postMessage('Message from main thread.');
    // listen back from worker
    this.cpuWorker.addEventListener('message', (data: any) => {

      this.result = data;
      console.log(this.result);
    });
  }

  changeColor(color: string) {
    this.selectedColour = color;
  }

}
