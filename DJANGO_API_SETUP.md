# 🐍 Configuração da API Django para Andromeda Launcher

Este arquivo contém as instruções para configurar uma API simples no Django que permitirá ao Andromeda Launcher listar e criar usuários.

## 📁 **Estrutura dos Arquivos**

### **1. Criar arquivo `api.py`**

Crie o arquivo `andromeda_engine/api.py` com o seguinte conteúdo:

```python
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["GET"])
def list_superusers(request):
    """API para listar todos os usuários"""
    try:
        users = User.objects.all().values(
            'id', 'username', 'email', 'first_name', 'last_name',
            'is_active', 'is_staff', 'is_superuser', 'date_joined', 'last_login'
        )
        
        # Converter QuerySet para lista
        users_list = list(users)
        
        # Formatar datas
        for user in users_list:
            if user['date_joined']:
                user['date_joined'] = user['date_joined'].isoformat()
            if user['last_login']:
                user['last_login'] = user['last_login'].isoformat()
        
        return JsonResponse({
            'success': True,
            'users': users_list,
            'count': len(users_list)
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e),
            'users': []
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def create_superuser_api(request):
    """API para criar superusuário"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not all([username, email, password]):
            return JsonResponse({
                'success': False,
                'error': 'Todos os campos são obrigatórios'
            }, status=400)
        
        # Verificar se usuário já existe
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                'success': False,
                'error': f'Usuário "{username}" já existe'
            }, status=400)
        
        # Criar superusuário
        user = User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        
        return JsonResponse({
            'success': True,
            'message': f'Superusuário "{username}" criado com sucesso!',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_superuser': user.is_superuser,
                'is_active': user.is_active,
                'date_joined': user.date_joined.isoformat()
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'JSON inválido'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
```

### **2. Atualizar `urls.py`**

Modifique o arquivo `andromeda_engine/urls.py` para incluir as novas rotas:

```python
from django.contrib import admin
from django.urls import path
from . import api

urlpatterns = [
    path('admin/', admin.site.urls),
    # Adicione estas linhas:
    path('api/superusers/', api.list_superusers, name='list_superusers'),
    path('api/superusers/create/', api.create_superuser_api, name='create_superuser_api'),
]

### **3. Configurar CORS (se necessário)**

Se você tiver problemas de CORS, instale o `django-cors-headers`:

```bash
pip install django-cors-headers
```

E adicione no `settings.py`:

```python
INSTALLED_APPS = [
    # ... outras apps
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Adicione no início
    # ... outros middlewares
]

# Configurações de CORS
CORS_ALLOW_ALL_ORIGINS = True  # Apenas para desenvolvimento
CORS_ALLOW_CREDENTIALS = True
```

## 🚀 **Como Testar**

### **1. Testar a API de listagem:**
```bash
# Com o servidor rodando
curl http://localhost:8000/api/superusers/
```

### **2. Testar a API de criação:**
```bash
curl -X POST http://localhost:8000/api/superusers/create/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'
```

## 🔧 **Troubleshooting**

### **Erro 404:**
- Verifique se as URLs estão corretas no `urls.py`
- Confirme se o arquivo `api.py` está no diretório correto

### **Erro de CORS:**
- Instale e configure `django-cors-headers`
- Verifique se o middleware está na ordem correta

### **Erro de importação:**
- Confirme se o arquivo `api.py` está no mesmo diretório que `urls.py`
- Verifique se não há erros de sintaxe no Python

## 📱 **Integração com o Launcher**

Após configurar a API:

1. **Inicie o servidor Django** via launcher
2. **A API estará disponível** em `http://localhost:8000/api/users/`
3. **O launcher usará automaticamente** a API quando disponível
4. **Fallback para método Python** se a API não estiver acessível

## 🎯 **Vantagens da API**

- ✅ **Mais rápido** que executar comandos Python
- ✅ **Mais seguro** com validações adequadas
- ✅ **Mais flexível** para futuras funcionalidades
- ✅ **Melhor tratamento de erros**
- ✅ **Logs mais claros** no Django

## 🔄 **Próximos Passos**

Após implementar esta API, você pode:

1. **Adicionar autenticação** JWT para a API
2. **Criar endpoints** para outras operações (editar, deletar usuários)
3. **Implementar paginação** para listas grandes
4. **Adicionar filtros** e busca
5. **Criar documentação** da API com Swagger

---

**Nota:** Esta API é para desenvolvimento. Para produção, considere usar Django REST Framework com autenticação adequada.
