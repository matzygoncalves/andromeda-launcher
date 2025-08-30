# 🚀 Andromeda Launcher - Backend Dashboard

Um painel de controle Electron para gerenciar projetos Django, especialmente o **Andromeda Engine**.

## ✨ Funcionalidades

### 👑 Gerenciamento de Superusuários
- **Criar superusuários** com interface gráfica
- **Listar usuários existentes** do banco de dados
- **Verificar status** de usuários (ativo/inativo, superusuário/staff)
- **Executar comandos Django** via interface

### 🗄️ Gerenciamento de Banco de Dados
- **Make Migrations** - Criar arquivos de migração
- **Migrate** - Aplicar migrações ao banco
- **Collect Static** - Coletar arquivos estáticos

### 🚀 Controle do Servidor
- **Iniciar servidor** Django na porta 8000
- **Parar servidor** com controle de processo
- **Monitoramento em tempo real** do status
- **Logs do servidor** em tempo real

## 🛠️ Instalação

### Pré-requisitos
- Node.js 16+ 
- Python 3.8+
- Django instalado
- Projeto Django configurado

### Passos
```bash
# 1. Clonar o repositório
git clone <repository-url>
cd andromeda-launcher

# 2. Instalar dependências
npm install

# 3. Configurar projeto Django
# Certifique-se de que o projeto Django está em:
# C:\Users\[username]\OneDrive\Área de Trabalho\Andrômeda Galaxy\andromeda-engine

# 4. Executar a aplicação
npm start
```

## 🏗️ Arquitetura

### Estrutura de Arquivos
```
andromeda-launcher/
├── main.js                 # Processo principal Electron
├── preload.js             # Bridge de segurança IPC
├── backend-dashboard.html # Interface do usuário
├── package.json           # Dependências e scripts
└── README.md             # Esta documentação
```

### Classes Principais

#### DjangoManager
- **Gerenciamento de projetos Django**
- **Execução de comandos Python/Django**
- **Controle de processos do servidor**
- **Operações de banco de dados**

#### AppManager
- **Handlers de eventos IPC**
- **Comunicação entre processos**
- **Gerenciamento de estado**

#### WindowManager
- **Criação e controle de janelas**
- **Eventos da aplicação**
- **Segurança e navegação**

## 🔧 Configuração

### Caminhos do Projeto Django
O sistema automaticamente procura o projeto Django em:
1. `%USERPROFILE%\OneDrive\Área de Trabalho\Andrômeda Galaxy\andromeda-engine`
2. `%USERPROFILE%\Desktop\Andrômeda Galaxy\andromeda-engine`
3. `%USERPROFILE%\Documents\Andrômeda Galaxy\andromeda-engine`
4. `../andromeda-engine` (relativo ao launcher)

### Estrutura Esperada do Projeto Django
```
andromeda-engine/
├── manage.py
├── andromeda_engine/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── ...
```

## 📱 Interface do Usuário

### Dashboard Principal
- **Cards de ação rápida** para operações comuns
- **Formulário de criação** de superusuários
- **Lista de usuários** existentes
- **Controles de servidor** com status em tempo real

### Design Responsivo
- **Tailwind CSS** para estilização
- **Gradientes e efeitos glass** para aparência moderna
- **Animações suaves** e feedback visual
- **Layout responsivo** para diferentes tamanhos de tela

## 🔌 APIs Disponíveis

### Frontend → Backend (via preload.js)
```javascript
// Gerenciamento de usuários
window.electronAPI.createSuperuser(username, email, password)
window.electronAPI.fetchSuperusers()

// Controle do servidor
window.electronAPI.startServer(port)
window.electronAPI.stopServer()
window.electronAPI.getServerStatus()

// Comandos Django
window.electronAPI.executeDjangoCommand(command, ...args)

// Utilitários
window.electronAPI.openDevTools()
```

## 🚨 Tratamento de Erros

### Validações
- **Verificação de projeto Django** válido
- **Validação de campos** obrigatórios
- **Controle de processos** duplicados
- **Timeout de operações** longas

### Logs e Debug
- **Console logging** detalhado
- **DevTools integrado** para desenvolvimento
- **Tratamento de exceções** não capturadas
- **Feedback visual** para o usuário

## 🔒 Segurança

### Electron Security
- **Context isolation** habilitado
- **Node integration** desabilitado
- **Remote module** desabilitado
- **Preload script** para APIs seguras

### Validação de Dados
- **Sanitização de inputs** do usuário
- **Validação de caminhos** de arquivo
- **Controle de processos** externos
- **Timeout de operações** suspeitas

## 🚀 Comandos Disponíveis

### Django Management
```bash
# Via interface gráfica
python manage.py createsuperuser
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic

# Via terminal (quando servidor estiver rodando)
python manage.py runserver 0.0.0.0:8000
```

### Desenvolvimento
```bash
# Iniciar aplicação
npm start

# Build de distribuição
npm run dist

# Verificar sintaxe
node -c main.js
```

## 📊 Monitoramento

### Status do Servidor
- **🟢 Rodando** - Servidor ativo na porta 8000
- **🔴 Parado** - Servidor inativo
- **⏳ Iniciando** - Processo de inicialização
- **⚠️ Erro** - Problema na execução

### Logs em Tempo Real
- **Console do Electron** para logs da aplicação
- **Output do Django** para logs do servidor
- **Erros e warnings** com timestamp
- **Status de operações** assíncronas

## 🐛 Troubleshooting

### Problemas Comuns

#### Projeto Django não encontrado
```bash
# Verificar se o caminho está correto
# Verificar se manage.py existe
# Verificar se settings.py existe em andromeda_engine/
```

#### Erro ao executar comandos Python
```bash
# Verificar se Python está no PATH
# Verificar se Django está instalado
# Verificar se o ambiente virtual está ativo
```

#### Servidor não inicia
```bash
# Verificar se a porta 8000 está livre
# Verificar logs de erro no console
# Verificar se o projeto Django está válido
```

### Logs de Debug
```bash
# Abrir DevTools (Ctrl+Shift+I)
# Verificar console para mensagens de erro
# Verificar se as APIs estão funcionando
```

## 🔄 Atualizações

### Versão Atual
- **v1.0.0** - Versão inicial com funcionalidades básicas

### Roadmap
- [ ] **Autenticação** de usuários do launcher
- [ ] **Backup automático** do banco de dados
- [ ] **Monitoramento de performance** do servidor
- [ ] **Interface para logs** do Django
- [ ] **Configuração via arquivo** de configuração
- [ ] **Temas personalizáveis** (claro/escuro)

## 📝 Licença

Este projeto é parte do ecossistema **Andromeda Galaxy** e está sob licença proprietária.

## 👥 Contribuição

Para contribuir com o projeto:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Issues**: Abra uma issue no GitHub
- **Documentação**: Consulte este README
- **Desenvolvimento**: Use o botão Debug para abrir DevTools

---

**Andromeda Galaxy** - Explorando o futuro da tecnologia 🚀✨
