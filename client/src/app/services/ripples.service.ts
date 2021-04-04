import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RipplesService {

  constructor() { }

  animate(): void {
    const buttons = document.querySelectorAll('.btn-navi');
    console.log(buttons);
    buttons.forEach(btn => {
      btn.addEventListener('click', (e: any) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';

        btn.appendChild(ripples);
        setTimeout(() => {
          ripples.remove();
        }, 1000);
      });
    });
  }
}
