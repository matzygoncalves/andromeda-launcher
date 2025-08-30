const { contextBridge, ipcRenderer } = require('electron')

// API para funcionalidades do Electron
contextBridge.exposeInMainWorld('electronAPI', {
  openDevTools: () => ipcRenderer.invoke('openDevTools'),
  
  // Comandos do Backend Django
  startBackendServer: () => ipcRenderer.invoke('startBackendServer'),
  stopBackendServer: () => ipcRenderer.invoke('stopBackendServer'),
  
  // Comandos do Frontend React
  startFrontendDev: () => ipcRenderer.invoke('startFrontendDev'),
  stopFrontendDev: () => ipcRenderer.invoke('stopFrontendDev'),
  
  // Status dos servidores
  getBackendStatus: () => ipcRenderer.invoke('getBackendStatus'),
  getFrontendStatus: () => ipcRenderer.invoke('getFrontendStatus'),
  
  // Abrir URLs no navegador padrão
  openInBrowser: (url) => ipcRenderer.invoke('openInBrowser', url)
})

console.log('Preload script carregado com sucesso - API expandida');
