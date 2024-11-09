import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
 
declare var gtag : any;
 
@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  private renderer: Renderer2;
  public setId: string;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
 
  loadTrackingScripts() {
    // Load Google Analytics
    const gtagScript = this.renderer.createElement('script');
    this.renderer.setAttribute(gtagScript, 'src', 'https://www.googletagmanager.com/gtag/js?id=G-27603PZED1');
    this.renderer.setAttribute(gtagScript, 'async', '');
    const head = this.renderer.selectRootElement('head', true);
    this.renderer.appendChild(head, gtagScript);
  
    const gaScript = this.renderer.createElement('script');
    const gaScriptContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-27603PZED1');
    `;
    this.renderer.setProperty(gaScript, 'textContent', gaScriptContent);
    this.renderer.appendChild(head, gaScript);
  
    // Load Google Tag Manager
    const gtmScript = this.renderer.createElement('script');
    this.renderer.setAttribute(gtmScript, 'async', '');
    const gtmScriptContent = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KPPFX5CZ');
    `;
    this.renderer.setProperty(gtmScript, 'textContent', gtmScriptContent);
    this.renderer.appendChild(head, gtmScript);
  }
  
  
 
  trackEvent(eventName: string, eventCategory: string) {
      gtag('event', eventName, {
        // event Type - example: 'SCROLL_TO_TOP_CLICKED'
        'event_category': eventCategory,
        // the label that will show up in the dashboard as the events name
        'event_label': eventName,
      })
      console.log("eventName", eventName);
    }
  
    setDomainProperties(){
      gtag('set', 'user_properties', {
        email_domain: 'nihaan',
      });
    }
}