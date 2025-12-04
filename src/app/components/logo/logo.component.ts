import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bubblesContainer') bubblesContainer!: ElementRef;
  
  private bubbleInterval: any;

  ngAfterViewInit() {
    this.injectSVGDefs();
    this.createBubbles();
    this.bubbleInterval = setInterval(() => this.createBubbles(), 8000);
  }

  ngOnDestroy() {
    if (this.bubbleInterval) {
      clearInterval(this.bubbleInterval);
    }
  }

  private injectSVGDefs() {
    const svg = document.querySelector('.text-svg');
    if (!svg) return;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Water gradient
    const waterGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    waterGradient.setAttribute('id', 'waterGradient');
    waterGradient.setAttribute('x1', '0%');
    waterGradient.setAttribute('y1', '0%');
    waterGradient.setAttribute('x2', '0%');
    waterGradient.setAttribute('y2', '100%');
    waterGradient.innerHTML = `
      <stop offset="0%" style="stop-color:#0a335c;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a6ca0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ac6ff;stop-opacity:0.9" />
    `;
    defs.appendChild(waterGradient);

    // Wave pattern
    const wavePattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    wavePattern.setAttribute('id', 'wavePattern');
    wavePattern.setAttribute('x', '0');
    wavePattern.setAttribute('y', '0');
    wavePattern.setAttribute('width', '100');
    wavePattern.setAttribute('height', '20');
    wavePattern.setAttribute('patternUnits', 'userSpaceOnUse');
    wavePattern.innerHTML = `
      <path d="M0 10 Q25 5, 50 10 T100 10" 
            fill="none" 
            stroke="#4ac6ff" 
            stroke-width="2" 
            opacity="0.6"/>
      <path d="M0 15 Q25 10, 50 15 T100 15" 
            fill="none" 
            stroke="#1a6ca0" 
            stroke-width="1.5" 
            opacity="0.4"/>
    `;
    defs.appendChild(wavePattern);

    // Surface gradient
    const surfaceGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    surfaceGradient.setAttribute('id', 'surfaceGradient');
    surfaceGradient.setAttribute('x1', '0%');
    surfaceGradient.setAttribute('y1', '0%');
    surfaceGradient.setAttribute('x2', '100%');
    surfaceGradient.setAttribute('y2', '0%');
    surfaceGradient.innerHTML = `
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#a8e6ff;stop-opacity:0.5" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.3" />
    `;
    defs.appendChild(surfaceGradient);

    svg.insertBefore(defs, svg.firstChild);
  }

  private createBubbles() {
    if (!this.bubblesContainer?.nativeElement) return;
    
    this.bubblesContainer.nativeElement.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
      const bubble = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      
      const size = Math.random() * 3 + 1;
      const cx = Math.random() * 160;
      const delay = Math.random() * 4;
      const duration = Math.random() * 5 + 3;
      
      bubble.setAttribute('cx', cx.toString());
      bubble.setAttribute('cy', '60');
      bubble.setAttribute('r', size.toString());
      bubble.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
      bubble.style.animation = `bubbleRise ${duration}s ease-in ${delay}s infinite`;
      
      this.bubblesContainer.nativeElement.appendChild(bubble);
    }
  }
}