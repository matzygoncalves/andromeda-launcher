const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const config = require('./config');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess = null;
let frontendProcess = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 800,
        backgroundColor: '#0f172a',
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Abrir DevTools em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Handler para iniciar servidor backend Django
ipcMain.handle('startBackendServer', async () => {
    try {
        if (backendProcess) {
            return { success: false, message: 'Servidor backend já está rodando' };
        }

        const backendPath = 'C:\\Users\\matzy\\OneDrive\\Área de Trabalho\\Andrômeda Galaxy\\andromeda-engine';
        const pythonPath = path.join(backendPath, 'venv', 'Scripts', 'python.exe');
        const managePath = path.join(backendPath, 'manage.py');

        console.log('Iniciando backend com:', pythonPath, managePath);
        console.log('Diretório de trabalho:', backendPath);

        backendProcess = spawn(pythonPath, [managePath, 'runserver'], {
            cwd: backendPath,
            stdio: 'pipe'
        });

        backendProcess.stdout.on('data', (data) => {
            console.log('Backend stdout:', data.toString());
        });

        backendProcess.stderr.on('data', (data) => {
            console.log('Backend stderr:', data.toString());
        });

        backendProcess.on('close', (code) => {
            console.log('Backend process closed with code:', code);
            backendProcess = null;
        });

        return { success: true, message: 'Servidor backend iniciado com sucesso' };
    } catch (error) {
        console.error('Erro ao iniciar backend:', error);
        return { success: false, message: `Erro: ${error.message}` };
    }
});

// Handler para parar servidor backend Django
ipcMain.handle('stopBackendServer', async () => {
    try {
        if (backendProcess) {
            backendProcess.kill('SIGTERM');
            backendProcess = null;
            return { success: true, message: 'Servidor backend parado com sucesso' };
        }
        return { success: false, message: 'Nenhum servidor backend rodando' };
    } catch (error) {
        console.error('Erro ao parar backend:', error);
        return { success: false, message: `Erro: ${error.message}` };
    }
});

// Handler para iniciar servidor frontend React
ipcMain.handle('startFrontendDev', async () => {
    try {
        if (frontendProcess) {
            return { success: false, message: 'Servidor frontend já está rodando' };
        }

        const frontendPath = 'C:\\Users\\matzy\\OneDrive\\Área de Trabalho\\Andrômeda Galaxy\\andromeda-web';

        console.log('Iniciando frontend em:', frontendPath);

        frontendProcess = spawn('npm', ['run', 'dev'], {
            cwd: frontendPath,
            stdio: 'pipe',
            shell: true
        });

        frontendProcess.stdout.on('data', (data) => {
            console.log('Frontend stdout:', data.toString());
        });

        frontendProcess.stderr.on('data', (data) => {
            console.log('Frontend stderr:', data.toString());
        });

        frontendProcess.on('close', (code) => {
            console.log('Frontend process closed with code:', code);
            frontendProcess = null;
        });

        return { success: true, message: 'Servidor frontend iniciado com sucesso' };
    } catch (error) {
        console.error('Erro ao iniciar frontend:', error);
        return { success: false, message: `Erro: ${error.message}` };
    }
});

// Handler para parar servidor frontend React
ipcMain.handle('stopFrontendDev', async () => {
    try {
        if (frontendProcess) {
            frontendProcess.kill('SIGTERM');
            frontendProcess = null;
            return { success: true, message: 'Servidor frontend parado com sucesso' };
        }
        return { success: false, message: 'Nenhum servidor frontend rodando' };
    } catch (error) {
        console.error('Erro ao parar frontend:', error);
        return { success: false, message: `Erro: ${error.message}` };
    }
});

// Handler para verificar status do backend
ipcMain.handle('getBackendStatus', async () => {
    return { running: backendProcess !== null };
});

// Handler para verificar status do frontend
ipcMain.handle('getFrontendStatus', async () => {
    return { running: frontendProcess !== null };
});

// Handler para abrir DevTools
ipcMain.handle('openDevTools', () => {
    if (mainWindow) {
        mainWindow.webContents.openDevTools();
    }
});

// Handler para abrir URL no navegador padrão
ipcMain.handle('openInBrowser', async (event, url) => {
    try {
        console.log('🔗 Tentando abrir URL:', url);
        
        if (!url || typeof url !== 'string') {
            throw new Error('URL inválida fornecida');
        }
        
        // Validar se é uma URL válida
        const urlObj = new URL(url);
        console.log('🔗 URL validada:', urlObj.href);
        
        // Usar shell.openExternal com callback para melhor controle
        return new Promise((resolve, reject) => {
            shell.openExternal(url, (error) => {
                if (error) {
                    console.error('❌ Erro ao abrir URL:', error);
                    reject(error);
                } else {
                    console.log('✅ URL aberta com sucesso no navegador padrão');
                    resolve({ success: true, message: 'URL aberta no navegador padrão' });
                }
            });
        });
    } catch (error) {
        console.error('❌ Erro ao processar URL:', error);
        return { success: false, message: `Erro: ${error.message}` };
    }
});

// Inicializar aplicação
app.whenReady().then(() => {
    console.log('🚀 Iniciando Andromeda Launcher...');
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Cleanup ao sair
app.on('before-quit', () => {
    console.log('🛑 Finalizando processos...');
    if (backendProcess) {
        backendProcess.kill('SIGTERM');
    }
    if (frontendProcess) {
        frontendProcess.kill('SIGTERM');
    }
});

console.log('✅ Main process configurado com sucesso');
