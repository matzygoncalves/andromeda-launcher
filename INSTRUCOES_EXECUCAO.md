# 🚀 Instruções para Executar o Andromeda Launcher

## 📋 Pré-requisitos
- Node.js instalado
- npm instalado
- Todas as dependências instaladas

## 🔧 Passos para Executar

### 1. Instalar Dependências (se necessário)
```bash
cd andromeda-launcher
npm install
```

### 2. Executar o Projeto
```bash
npm start
```

## 🧪 Arquivos de Teste Criados

### `test-main.js` (versão simplificada)
- Arquivo principal do Electron simplificado
- Configurações básicas para debug
- DevTools abertos automaticamente

### `index.html` (versão simplificada)
- Interface simplificada para teste
- Navegação básica entre páginas
- Botão para testar API Electron

### `preload.js` (versão simplificada)
- API básica do Electron
- Função `openDevTools` para teste

## 🔍 Verificações

### Se funcionar:
- ✅ Aplicativo Electron abrirá
- ✅ Interface será exibida
- ✅ Navegação entre páginas funcionará
- ✅ Botão "Testar API Electron" abrirá DevTools

### Se houver erro:
- ❌ Verificar mensagem de erro no terminal
- ❌ Verificar se todas as dependências estão instaladas
- ❌ Verificar se não há conflitos de versão

## 🐛 Debug

### Logs no Terminal:
- Verificar mensagens de inicialização
- Verificar erros de módulos não encontrados
- Verificar problemas de permissão

### DevTools:
- DevTools serão abertos automaticamente
- Verificar console para erros JavaScript
- Verificar se `window.electronAPI` está disponível

## 📁 Estrutura de Arquivos
```
andromeda-launcher/
├── test-main.js          # Main do Electron (teste)
├── main.js               # Main original (completo)
├── index.html            # Interface principal
├── backend-dashboard.html # Dashboard do Django
├── preload.js            # API do Electron
├── renderer.js           # Scripts da interface
├── config.js             # Configurações
└── package.json          # Dependências e scripts
```

## 🎯 Próximos Passos

1. **Testar execução básica** com `npm start`
2. **Verificar navegação** entre páginas
3. **Testar API Electron** com o botão de teste
4. **Voltar para main.js original** se tudo funcionar
5. **Implementar funcionalidades completas**

## ❓ Problemas Comuns

### "Cannot find module 'electron'"
```bash
npm install electron --save-dev
```

### "Cannot find module './config'"
- Verificar se `config.js` existe
- Verificar sintaxe do arquivo

### "Cannot find module './preload'"
- Verificar se `preload.js` existe
- Verificar sintaxe do arquivo

### Erro de permissão
- Executar como administrador (Windows)
- Verificar permissões de pasta

## 📞 Suporte

Se houver problemas, verificar:
1. Versão do Node.js (`node --version`)
2. Versão do npm (`npm --version`)
3. Mensagens de erro no terminal
4. Logs no DevTools do Electron
