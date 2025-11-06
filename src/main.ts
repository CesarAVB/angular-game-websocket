import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Este arquivo contém os providers da sua aplicação
import { AppComponent } from './app/app'; // Este é o seu componente raiz!

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
