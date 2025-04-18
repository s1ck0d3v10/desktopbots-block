/**
 * Script minimalista para bloquear apenas desktop
 * Garante que celulares possam acessar
 */

(function() {
  // Lista bem básica de termos móveis
  const mobileTerms = ['android', 'iphone', 'ipad', 'mobile', 'phone', 'ios', 'samsung'];
  
  // Pega o user agent e converte para minúsculas
  const ua = navigator.userAgent.toLowerCase();
  
  // Verifica se QUALQUER termo móvel está presente
  let isMobile = false;
  for (let i = 0; i < mobileTerms.length; i++) {
    if (ua.indexOf(mobileTerms[i]) !== -1) {
      isMobile = true;
      break;
    }
  }
  
  // Se NÃO for mobile, bloqueia - simples assim
  if (!isMobile) {
    window.location.href = 'about:blank';
  }
  
  // Se for mobile, não faz nada - permite acesso normal
})();
