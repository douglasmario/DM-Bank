import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Adiciona os idiomas suportados
    this.translate.addLangs(['en', 'pt', 'fr', 'es']);
    // Define o idioma padrão
    this.translate.setDefaultLang('en');
    // Usa o idioma do navegador ou o padrão
    this.translate.use(this.translate.getBrowserLang() || 'en');
  }

  // Método para trocar o idioma
  useLanguage(language: string): void {
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
