    // src/app/app.component.ts
    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { RouterOutlet } from '@angular/router';
    import { GameComponent } from './game/game';
    import { FooterComponent } from './footer/footer';

    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [
        CommonModule,
        GameComponent,
        FooterComponent
      ],
      templateUrl: './app.html',
      styleUrl: './app.css'
    })
    export class AppComponent {
      title = 'rock-paper-scissors-frontend';
    }
