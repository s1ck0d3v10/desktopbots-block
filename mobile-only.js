/**
 * Script de bloqueio simplificado - apenas baseado no User Agent
 * Bloqueia acessos via desktop e bots, permitindo apenas dispositivos móveis
 */

(function() {
  // Lista de identificadores de bots
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

  // Verifica se é um dispositivo móvel APENAS pelo user agent
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
  }

  // Verifica se é um bot baseado na lista de assinaturas
  function isBot() {
    const ua = navigator.userAgent.toLowerCase();
    
    for (const signature of botSignatures) {
      if (ua.includes(signature)) {
        return true;
      }
    }
    
    return false;
  }

  // Bloqueia acesso se NÃO for mobile OU se for bot
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
