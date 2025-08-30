/**
 * Configurações do Andromeda Launcher
 * Centraliza todas as configurações da aplicação
 */

module.exports = {
    // Configurações da aplicação
    app: {
        name: 'Andromeda Launcher',
        version: '1.0.0',
        description: 'Launcher para projetos Django e React',
        author: 'Andromeda Galaxy Team'
    },

    // Configurações do Electron
    electron: {
        window: {
            width: 1400,
            height: 900,
            minWidth: 1200,
            minHeight: 800,
            backgroundColor: '#0f172a',
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                enableRemoteModule: false
            }
        },
        devTools: {
            autoOpen: process.env.NODE_ENV === 'development'
        }
    },

    // Caminhos dos projetos
    paths: {
        backend: 'C:\\Users\\matzy\\OneDrive\\Área de Trabalho\\Andrômeda Galaxy\\andromeda-engine',
        frontend: 'C:\\Users\\matzy\\OneDrive\\Área de Trabalho\\Andrômeda Galaxy\\andromeda-web'
    },

    // Configurações de desenvolvimento
    development: {
        debug: process.env.NODE_ENV === 'development',
        hotReload: false
    }
};
