/**
 * Script avançado para bloqueio de acesso via desktop e bots
 * Bloqueia bots de crawler, anúncios e indexadores
 * Redireciona para about:blank em vez de mostrar mensagem
 */

(function() {
  // Lista expandida de identificadores de bots
  const botSignatures = [
    // Bots de busca
    'googlebot', 'bingbot', 'yandexbot', 'duckduckbot', 'slurp', 'baiduspider', 
    'facebookexternalhit', 'facebot', 'twitterbot', 'rogerbot',
    
    // Crawlers de anúncios
    'adsbot', 'mediapartners', 'google-adwords', 'adidxbot', 'google-shopping',
    
    // Outros crawlers
    'bot', 'spider', 'crawl', 'scrape', 'fetch', 'archive', 'curl', 'wget',
    
    // Ferramentas de teste
    'lighthouse', 'pagespeed', 'pingdom', 'gtmetrix', 'headless', 'phantom',
    'selenium', 'webdriver', 'cypress', 'puppeteer',
    
    // Bots sociais
    'pinterest', 'snapchat', 'linkedinbot', 'whatsapp', 'telegrambot',
    
    // Bots de análise
    'semrush', 'ahrefs', 'moz', 'majestic', 'sistrix'
  ];

  // Verifica se é um dispositivo móvel usando detecção melhorada
  function isMobileDevice() {
    // Verifica user agent
    const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
    
    // Verifica tamanho da tela (maioria dos desktops > 1024px)
    const smallScreen = window.innerWidth < 1024;
    
    // Verifica recursos touch
    const hasTouch = 'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0 || 
                     navigator.msMaxTouchPoints > 0;
                     
    // Detecta dispositivos móveis pela orientação
    const hasOrientation = typeof window.orientation !== 'undefined';
    
    // Combina verificações para maior precisão
    return mobileUA && (smallScreen || hasTouch || hasOrientation);
  }

  // Verifica se é um bot baseado em lista expandida
  function isBot() {
    const ua = navigator.userAgent.toLowerCase();
    
    // Verifica assinaturas de bot
    for (const signature of botSignatures) {
      if (ua.includes(signature)) {
        return true;
      }
    }
    
    // Verifica cabeçalhos e comportamentos suspeitos
    if (navigator.webdriver || 
        /HeadlessChrome/.test(navigator.userAgent) || 
        !navigator.languages || 
        navigator.languages.length === 0) {
      return true;
    }
    
    return false;
  }

  // Bloqueia acesso se for desktop ou bot
  if (!isMobileDevice() || isBot()) {
    try {
      // Tenta primeiro abrir about:blank
      window.location.replace('about:blank');
    } catch (e) {
      // Se falhar, tenta outros métodos
      window.open('about:blank', '_top');
      window.close();
      
      // Caso os métodos acima falhem, destrói o conteúdo
      document.body.innerHTML = '';
      document.head.innerHTML = '';
      window.stop();
      window.history.replaceState(null, '', 'about:blank');
      
      // Bloqueia qualquer interação
      document.documentElement.style.display = 'none';
      document.documentElement.style.visibility = 'hidden';
    }
  }
})();
