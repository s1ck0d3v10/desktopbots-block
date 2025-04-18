/**
 * Script de diagnóstico - não bloqueia nada, apenas mostra informações do dispositivo
 */

(function() {
  // Cria elemento para mostrar informações
  const infoDiv = document.createElement('div');
  infoDiv.style.position = 'fixed';
  infoDiv.style.top = '10px';
  infoDiv.style.left = '10px';
  infoDiv.style.zIndex = '99999';
  infoDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
  infoDiv.style.color = 'white';
  infoDiv.style.padding = '10px';
  infoDiv.style.borderRadius = '5px';
  infoDiv.style.maxWidth = '80%';
  infoDiv.style.wordBreak = 'break-all';

  // Detecta dispositivo
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent);
  
  // Exibe informações
  infoDiv.innerHTML = `
    <h3>Informações do Dispositivo</h3>
    <p><strong>É mobile?</strong> ${isMobile ? 'SIM' : 'NÃO'}</p>
    <p><strong>User Agent:</strong> ${navigator.userAgent}</p>
    <p><strong>Largura tela:</strong> ${window.innerWidth}px</p>
  `;
  
  // Adiciona botão para fechar
  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'Fechar';
  closeBtn.onclick = function() { document.body.removeChild(infoDiv); };
  infoDiv.appendChild(closeBtn);
  
  // Adiciona à página
  document.addEventListener('DOMContentLoaded', function() {
    document.body.appendChild(infoDiv);
  });
  
  // Se o DOM já estiver carregado
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    document.body.appendChild(infoDiv);
  }
})();
