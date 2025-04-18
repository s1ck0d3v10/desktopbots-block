/**
 * Script avançado para bloqueio de acesso via desktop e bots
 * Apenas dispositivos móveis são permitidos
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
    // CORREÇÃO: Usando OR em vez de AND para detectar móveis
    // Se qualquer uma destas verificações indicar móvel, retornamos true
    
    // Verifica user agent - principal verificação
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)) {
      return true;
    }
    
    // Verificações secundárias para casos onde o user agent pode ser mascarado
    // Combinação de tamanho de tela + recursos de toque
    const smallScreen = window.innerWidth < 1024;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (smallScreen && hasTouch) {
      return true;
    }
    
    // Verifica orientação (específico para dispositivos móveis)
    if (typeof window.orientation !== 'undefined') {
      return true;
    }
    
    return false;
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

  // AQUI ESTÁ A CORREÇÃO PRINCIPAL:
  // Bloqueia apenas se NÃO for mobile OU se for bot
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
