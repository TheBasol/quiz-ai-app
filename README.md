#  Quiz AI App

Una aplicación moderna y completa de quiz desarrollada con **Next.js 15** (Frontend) y **ASP.NET Core 8** (Backend) que utiliza inteligencia artificial para generar cuestionarios educativos personalizados.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![ASP.NET Core](https://img.shields.io/badge/.NET-8-512BD4?style=flat-square&logo=dotnet)
![C#](https://img.shields.io/badge/C%23-12-239120?style=flat-square&logo=csharp)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange?style=flat-square)

<img width="1878" height="878" alt="Captura de pantalla 2025-10-18 a la(s) 6 53 20 p m" src="https://github.com/user-attachments/assets/d727518f-80ea-4519-88fb-4acd29958312" />
<img width="1879" height="873" alt="Captura de pantalla 2025-10-18 a la(s) 6 53 41 p m" src="https://github.com/user-attachments/assets/3fa18bca-523c-4ada-b395-23054fe5f1a2" />


## Características

### Funcionalidades Principales
- **Generación AI de Cuestionarios**: Crea quizzes personalizados usando 19+ modelos de IA diferentes
- **Creación Manual**: Diseña tus propios cuestionarios con un editor intuitivo
- **Sistema de Temporizador**: Cronómetro configurable con límites de tiempo personalizables
- **Diseño Responsivo**: Interfaz adaptable para dispositivos móviles y desktop
- **Tema Oscuro**: Diseño moderno con colores dinámicos y gradientes
- **Gestión de Estado**: Almacenamiento eficiente con Zustand
- **Navegación Inteligente**: Rutas dinámicas con Next.js App Router
- **Autenticación**: Sistema de login/registro con JWT tokens
- **Persistencia**: Quizzes guardados en base de datos PostgreSQL

### IA Integrada
- **19 Modelos de IA**: Sistema de respaldo con múltiples proveedores
- **Validación Inteligente**: Verificación automática de respuestas generadas
- **Personalización Avanzada**: 
  - Temas específicos
  - Niveles de dificultad (Fácil, Medio, Difícil)
  - Número de preguntas configurable
  - Área de enfoque específica
  - Idiomas múltiples (Inglés, Español)
  - Instrucciones adicionales personalizadas

## Tecnologías

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework de estilos utilitarios
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado ligera

### Backend
- **[ASP.NET Core 8](https://learn.microsoft.com/dotnet/core/)** - Framework web robusto
- **[C# 12](https://learn.microsoft.com/dotnet/csharp/)** - Lenguaje de programación
- **[Entity Framework Core 9](https://learn.microsoft.com/ef/core/)** - ORM para .NET
- **[PostgreSQL 15](https://www.postgresql.org/)** - Base de datos relacional
- **[AutoMapper](https://automapper.org/)** - Mapeo de objetos
- **[FluentValidation](https://fluentvalidation.net/)** - Validación robusta

### IA y APIs
- **[OpenAI SDK](https://github.com/openai/openai-node)** - Cliente para APIs de IA
- **[OpenRouter](https://openrouter.ai/)** - Agregador de modelos de IA
- **Múltiples Proveedores**: DeepSeek, Claude, GPT, Llama, Gemini, y más (19+ modelos)

### DevOps y Herramientas
- **[Docker](https://www.docker.com/)** - Containerización
- **[GitHub](https://github.com/)** - Control de versiones
- **[Vercel](https://vercel.com/)** - Deploy automático (Frontend)
- **[Azure/Railway/Heroku](https://azure.microsoft.com/)** - Deploy Backend

## Instalación

### Prerrequisitos
- Node.js 18.17 o superior
- .NET 8 SDK
- PostgreSQL 15+ (o Docker)
- Clave API de OpenRouter

### Instalación Rápida

1. **Clonar el repositorio**
```bash
git clone https://github.com/TheBasol/quiz-ai-app.git
cd quiz-ai-app
```

2. **Configurar Backend**
```bash
cd backend

# Instalar dependencias
dotnet restore

# Copiar archivo de configuración
cp appsettings.Example.json appsettings.Development.json

# Iniciar PostgreSQL con Docker
docker-compose up -d

# Aplicar migraciones
dotnet ef database update

# Ejecutar backend (en una terminal)
dotnet run
```

3. **Configurar Frontend**
```bash
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo de configuración
cp .env.example .env.local

# Ejecutar frontend (en otra terminal)
npm run dev
```

4. **Configurar variables de entorno**

**Backend** - `backend/appsettings.Development.json`:
```json
{
  "OpenRouterApi": {
    "ApiKey": "tu_clave_api_openrouter",
    "UrlBase": "https://openrouter.ai/api/v1"
  },
  "JwtSettings": {
    "SecretKey": "tu_clave_secreta_jwt_muy_segura_aqui"
  }
}
```

**Frontend** - `frontend/.env.local`:
```env
OPENROUTER_API_KEY=tu_clave_api_aqui
NEXT_PUBLIC_API_URL=http://localhost:5001
```

5. **Acceder a la aplicación**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5001](http://localhost:5001)
- Swagger API Docs: [http://localhost:5001/swagger](http://localhost:5001/swagger) (si está habilitado)

### Pasos de Instalación Alternativa (Manual)

1. **Clonar el repositorio**
```bash
git clone https://github.com/TheBasol/quiz-ai-app.git
cd quiz-ai-app
```

2. **Instalar PostgreSQL manualmente**
   - Descargar de [postgresql.org](https://www.postgresql.org/download/)
   - Crear base de datos: `quiz_ai_app_db`
   - Configurar credenciales en `appsettings.Development.json`

3. **Backend**
```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

4. **Frontend**
```bash
cd ../frontend
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
quiz-ai-app/
├── frontend/
│   ├── src/
│   │   ├── app/                    # App Router de Next.js
│   │   │   ├── (quiz)/            # Grupo de rutas de quiz
│   │   │   │   ├── page.tsx       # Página principal
│   │   │   │   ├── questions/[id]/# Página de preguntas dinámicas
│   │   │   │   └── results/       # Página de resultados
│   │   │   ├── api/               # API Routes
│   │   │   │   └── get-quiz/      # Endpoint de generación AI
│   │   │   ├── globals.css        # Estilos globales
│   │   │   └── layout.tsx         # Layout principal
│   │   ├── components/            # Componentes React
│   │   │   ├── modal/             # Modales de creación
│   │   │   ├── quizContent/       # Componentes de quiz
│   │   │   ├── quizzes/           # Grid y tarjetas de quizzes
│   │   │   └── results/           # Componentes de resultados
│   │   ├── config/                # Configuración de IA
│   │   ├── data/                  # Prompts y datos estáticos
│   │   ├── hooks/                 # Custom React Hooks
│   │   ├── interfaces/            # Tipos TypeScript
│   │   ├── services/              # Servicios de IA
│   │   ├── store/                 # Estado global (Zustand)
│   │   └── utils/                 # Utilidades y helpers
│   ├── public/                    # Archivos estáticos
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── README.md
│
├── backend/
│   ├── AutoMappers/               # Configuración AutoMapper
│   │   └── MappingProfile.cs      # Mapeos de entidades a DTOs
│   ├── Controller/                # Controladores API REST
│   │   ├── QuizController.cs      # Endpoints de quiz
│   │   └── UsersController.cs     # Endpoints de usuarios
│   ├── Data/                      # Base de datos
│   │   └── ApplicationDbContext.cs # Contexto de Entity Framework
│   ├── DTOs/                      # Data Transfer Objects
│   │   ├── Quiz/                  # DTOs para Quiz
│   │   │   ├── QuizDto.cs
│   │   │   ├── QuizRequestDto.cs  # Request para crear quiz
│   │   │   ├── QuizUpdateDto.cs   # Request para actualizar quiz
│   │   │   ├── QuestionDto.cs
│   │   │   ├── OptionDto.cs
│   │   │   └── QuizInsertDto.cs
│   │   └── User/                  # DTOs para usuarios
│   ├── Entitys/                   # Modelos de base de datos
│   │   ├── Quiz.cs                # Entidad Quiz
│   │   ├── Question.cs            # Entidad Question
│   │   ├── Option.cs              # Entidad Option
│   │   └── User.cs                # Entidad Usuario (Identity)
│   ├── Migrations/                # Migraciones de Entity Framework
│   ├── Repository/                # Patrón Repository
│   │   ├── IRepository.cs         # Interfaz genérica
│   │   └── QuizRepository.cs      # Implementación para Quiz
│   ├── Services/                  # Servicios de negocio
│   │   ├── CreateQuizOpenRouterService.cs  # Generación de quiz con IA
│   │   ├── GetAiModelsService.cs  # Obtiene modelos disponibles
│   │   ├── QuizService.cs         # Lógica de quiz
│   │   ├── UserService.cs         # Lógica de usuarios
│   │   ├── ICreateQuizService.cs
│   │   ├── IGetAiModelsService.cs
│   │   ├── IQuizService.cs
│   │   └── IUserService.cs
│   ├── Utils/                     # Utilidades
│   │   ├── AiPromptGenerator.cs   # Generador de prompts
│   │   └── DifficultyLevel.cs     # Enum de niveles
│   ├── Validators/                # Validadores Fluent
│   │   ├── QuizRequestValidator.cs
│   │   └── QuizUpdateValidator.cs
│   ├── Properties/
│   │   └── launchSettings.json
│   ├── Program.cs                 # Configuración de aplicación
│   ├── docker-compose.yaml        # PostgreSQL en Docker
│   ├── quiz-ai-app.csproj         # Archivo de proyecto
│   ├── quiz-ai-app.sln            # Solución .NET
│   └── appsettings.json           # Configuración
```

##  Uso

### Crear un Quiz con IA

1. **Hacer clic en "Create with AI"**
2. **Completar el formulario**:
   - Tema específico (ej: "React Hooks")
   - Categoría (Programming, Science, etc.)
   - Dificultad (Easy, Medium, Hard)
   - Número de preguntas (1-20)
   - Idioma (English/Spanish)
   - Área de enfoque opcional
   - Instrucciones adicionales

3. **Generar**: La IA creará automáticamente el quiz

### Crear un Quiz Manual

1. **Hacer clic en "Create Manually"**
2. **Paso 1**: Información del quiz
   - Nombre del quiz
   - Descripción
   - Categoría
   - Dificultad
   - Límite de tiempo

3. **Paso 2**: Agregar preguntas
   - Texto de la pregunta
   - 4 opciones de respuesta
   - Respuesta correcta

### Responder un Quiz

1. **Seleccionar un quiz** de la página principal
2. **Leer la pregunta** y seleccionar una respuesta
3. **Navegar** entre preguntas usando los botones
4. **Ver el temporizador** en tiempo real
5. **Finalizar** y ver resultados

##  Scripts Disponibles

### Frontend (Next.js)
```bash
# Desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Ejecutar en producción
npm run start

# Linting de código
npm run lint
```

### Backend (.NET)
```bash
# Restaurar dependencias
dotnet restore

# Compilar proyecto
dotnet build

# Ejecutar en modo desarrollo
dotnet run

# Publicar para producción
dotnet publish -c Release

# Ejecutar migraciones
dotnet ef database update

# Crear nueva migración
dotnet ef migrations add NombreMigracion

# Ver estado de migraciones
dotnet ef migrations list

# Ejecutar tests
dotnet test
```

### Docker
```bash
# Iniciar PostgreSQL
docker-compose up -d

# Detener PostgreSQL
docker-compose down

# Ver logs
docker-compose logs -f
```

## 🤖 Modelos de IA Soportados

La aplicación utiliza un sistema de respaldo con 19+ modelos de IA:

- **DeepSeek**: deepseek/deepseek-chat
- **Claude**: anthropic/claude-3.5-sonnet
- **GPT**: openai/gpt-4o-mini
- **Llama**: meta-llama/llama-3.1-8b-instruct
- **Gemini**: google/gemini-pro
- **Y muchos más...**

## 🔧 Configuración Avanzada

### Variables de Entorno

```env
# Requerida
OPENROUTER_API_KEY=tu_clave_api


### Personalización de Modelos

Edita `src/data/prompts.ts` para:
- Agregar nuevos modelos de IA
- Modificar prompts del sistema
- Personalizar comportamiento de generación

### Estilos y Temas

Personaliza colores en `tailwind.config.js`:
- Colores dinámicos de tarjetas
- Temas oscuros/claros
- Gradientes personalizados

## 🔌 Backend - API REST con C# y .NET 8

### Descripción General
El backend es una API REST construida con **ASP.NET Core 8** que proporciona la lógica de negocio para la aplicación. Utiliza **PostgreSQL** como base de datos, **Entity Framework Core** para ORM, y se integra con **OpenRouter** para generar quizzes con inteligencia artificial.

### Características del Backend

#### Arquitectura y Patrones
- **Arquitectura en Capas**: Controllers → Services → Repository → Database
- **Patrón Repository**: Abstracción de acceso a datos
- **Dependency Injection**: Inyección de dependencias nativa de .NET
- **AutoMapper**: Mapeo automático entre entidades y DTOs
- **Fluent Validation**: Validación de datos robusta

#### Autenticación y Autorización
- **JWT (JSON Web Tokens)**: Autenticación basada en tokens
- **ASP.NET Identity**: Sistema de identidad y autorización
- **Bearer Authentication**: Protección de endpoints

#### Integración con IA
- **OpenRouter API**: Múltiples modelos de IA con sistema de respaldo
- **GeneraciónInteligente**: Si un modelo falla, intenta automáticamente con otro
- **19+ Modelos Soportados**: DeepSeek, Claude, GPT-4, Llama, Gemini, y más

### Tecnologías del Backend

```plaintext
ASP.NET Core 8.0          - Framework web
Entity Framework Core 9.0  - ORM para base de datos
PostgreSQL 15.3           - Base de datos relacional
AutoMapper 15.1.0         - Mapeo de objetos
FluentValidation 12.1.1   - Validación de datos
JWT Bearer 8.0.22         - Autenticación
Docker Compose            - Containerización
```

### Entidades Principales

#### Quiz
```csharp
- Id: int (PK)
- Name: string (100 caracteres máx)
- Description: string (opcional)
- TimeLimit: TimeSpan
- Difficulty: enum (Easy, Medium, Hard)
- Category: string (50 caracteres máx)
- Questions: List<Question>
- UserId: string (FK) - Relación con usuario
```

#### Question
```csharp
- Id: int (PK)
- QuestionText: string
- Options: List<Option>
- CorrectOptionId: int
- QuizId: int (FK)
```

#### Option
```csharp
- Id: int (PK)
- OptionText: string
- QuestionId: int (FK)
```

#### User
```csharp
- Hereda de IdentityUser
- DateOfBirth: DateTime
- Quizzes: List<Quiz> (relación uno-a-muchos)
```

### Servicios Principales

#### ICreateQuizService
Genera quizzes usando OpenRouter API:
- Parámetros: tema, dificultad, número de preguntas, idioma, categoría, área de enfoque
- Retorna: JSON estructurado con preguntas y opciones
- Sistema de respaldo: Intenta múltiples modelos hasta obtener una respuesta válida

#### IGetAiModelsService
Obtiene la lista de modelos disponibles de OpenRouter:
- Filtra modelos activos
- Ordena por rendimiento
- Proporciona lista para el sistema de respaldo

#### IQuizService
Lógica de negocio del quiz:
- Crear nuevos quizzes (manuales o con IA)
- Obtener quizzes del usuario
- Actualizar quizzes
- Eliminar quizzes

#### IUserService
Gestión de usuarios:
- Registro de usuarios
- Login/autenticación
- Generación de JWT tokens

### Endpoints API

#### Quiz Endpoints
```
GET    /api/quiz              - Obtener todos los quizzes del usuario [Autorizado]
GET    /api/quiz/{id}         - Obtener quiz por ID [Autorizado]
POST   /api/quiz              - Crear nuevo quiz [Autorizado]
PUT    /api/quiz/{id}         - Actualizar quiz [Autorizado]
DELETE /api/quiz/{id}         - Eliminar quiz [Autorizado]
POST   /api/quiz/generate-ai  - Generar quiz con IA [Autorizado]
```

#### User Endpoints
```
POST   /api/users/register    - Registrar nuevo usuario
POST   /api/users/login       - Login y obtener JWT
```

### DTOs (Data Transfer Objects)

#### QuizRequestDto
Para crear quizzes con IA:
- Topic: string
- Difficulty: DifficultyLevel
- NumberOfQuestions: int (1-20)
- Category: string
- Language: string (English/Spanish)
- FocusArea: string (opcional)
- AdditionalInstructions: string (opcional)

#### QuizUpdateDto
Para actualizar quizzes existentes:
- Name, Description, TimeLimit, Difficulty, Category

#### QuizDto
Respuesta con datos completos del quiz:
- Id, Name, Description, Difficulty, Category, TimeLimit
- Questions: QuestionDto[]
- UserId

### Base de Datos

#### Configuración
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=quiz_ai_app_db;Username=postgres;Password=postgres"
  }
}
```

#### Docker Compose
```yaml
services:
  quiz_ai_app-db:
    image: postgres:15.3
    ports: 5432:5432
    volumes: ./postgres:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: quiz_ai_app_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
```

### Configuración

#### appsettings.json
```json
{
  "OpenRouterApi": {
    "ApiKey": "tu_clave_api_aqui",
    "UrlBase": "https://openrouter.ai/api/v1"
  },
  "JwtSettings": {
    "SecretKey": "tu_clave_secreta_jwt",
    "ExpirationMinutes": 60
  }
}
```

#### Variables de Entorno Requeridas
```env
OpenRouterApi:ApiKey=sk_...
OpenRouterApi:UrlBase=https://openrouter.ai/api/v1
JwtSettings:SecretKey=clave_secreta_jwt_muy_segura
DefaultConnection=Host=localhost;Port=5432;Database=quiz_ai_app_db;...
```

### Instalación y Configuración del Backend

#### Prerrequisitos
- .NET 8 SDK
- PostgreSQL 15+
- Docker (opcional, para PostgreSQL)

#### Pasos

1. **Ir al directorio del backend**
```bash
cd backend
```

2. **Restaurar dependencias**
```bash
dotnet restore
```

3. **Configurar la base de datos**
```bash
# Usando Docker (recomendado)
docker-compose up -d

# O instalar PostgreSQL manualmente
```

4. **Crear archivo de configuración**
```bash
cp appsettings.Example.json appsettings.Development.json
```

5. **Configurar variables de entorno**
Editar `appsettings.Development.json` con:
- API Key de OpenRouter
- Conexión a PostgreSQL
- Clave secreta JWT

6. **Ejecutar migraciones**
```bash
dotnet ef database update
```

7. **Ejecutar la aplicación**
```bash
dotnet run
```

La API estará disponible en `https://localhost:5001` o `http://localhost:5000`

### Validación

El backend utiliza **FluentValidation** para validar:
- Estructura de requests
- Rangos de valores (ej: 1-20 preguntas)
- Campos requeridos
- Formatos válidos

Validadores:
- `QuizRequestValidator`: Valida solicitudes de creación de quiz
- `QuizUpdateValidator`: Valida actualizaciones de quiz

### Migraciones Entity Framework

Migraciones disponibles:
- `20251119215519_quizzes` - Modelo inicial de quizzes
- `20251123042011_usersSystem` - Sistema de usuarios
- `20251209233604_UserQuizzes` - Relación usuario-quiz
- `20251210001323_AddUserQuizRelationship` - Mejoras en relación

Comandos útiles:
```bash
# Ver migraciones aplicadas
dotnet ef migrations list

# Crear nueva migración
dotnet ef migrations add NombreMigracion

# Actualizar base de datos
dotnet ef database update
```

##  Deploy

### Frontend - Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Backend - Azure App Service / Railway / Heroku

#### Opción 1: Azure App Service
```bash
# Publicar para producción
dotnet publish -c Release

# Crear aplicación en Azure
az webapp create --resource-group myResourceGroup --plan myAppServicePlan --name myAppName

# Desplegar
az webapp up --name myAppName
```

#### Opción 2: Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login y deploy
railway login
railway link
railway up
```

#### Opción 3: Docker + Cualquier servidor
```bash
# Crear imagen Docker
docker build -t quiz-ai-app-backend .

# Ejecutar contenedor
docker run -d -p 5000:5000 \
  -e "OpenRouterApi:ApiKey=tu_clave" \
  -e "JwtSettings:SecretKey=tu_clave" \
  quiz-ai-app-backend
```

### Base de Datos Producción

Usar servicios administrados:
- **Azure Database for PostgreSQL**
- **AWS RDS PostgreSQL**
- **Railway PostgreSQL**
- **Render PostgreSQL**

Actualizar `ConnectionString` en configuración:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=tu-server-produccion.com;Database=quiz_ai_app_db;Username=admin;Password=..."
  }
}
```

## 🛠️ Desarrollo

### Ejecutar la Aplicación Completa Localmente

#### Terminal 1 - Backend
```bash
cd backend
docker-compose up -d          # Inicia PostgreSQL
dotnet ef database update     # Aplica migraciones
dotnet run                    # Inicia API en http://localhost:5001
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev                   # Inicia en http://localhost:3000
```

### Debugging

#### Backend (Visual Studio / Rider)
- Abrir `quiz-ai-app.sln`
- Establecer puntos de quiebre
- F5 para iniciar con debugger

#### Frontend (VS Code)
- Abrir carpeta `frontend`
- Instalar extensión "Debugger for Chrome"
- Presionar F5 para debuggear

### Estructura de Código del Backend

**Convenciones:**
- Interfaces con prefijo `I` (IQuizService, IRepository)
- DTOs en carpeta `DTOs` organizados por entidad
- Services con lógica de negocio
- Controllers como entrada HTTP
- Validators para validación de entrada

**Ejemplo de flujo de solicitud:**
```
Client → Controller (validación inicial)
      → Service (lógica de negocio)
      → Repository (acceso a datos)
      → Database (PostgreSQL)
      → Repository (retorna entidad)
      → Mapper (convierte a DTO)
      → Service (retorna DTO)
      → Controller (serializa JSON)
      → Client (JSON response)
```

### Testing

Las mejores prácticas a implementar:
- Unit tests para Services
- Integration tests para Controllers
- Tests para validadores

```bash
# Crear proyecto de tests
dotnet new xunit -n quiz-ai-app.Tests

# Ejecutar tests
dotnet test
```

##  Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Contribución para Backend

**Antes de hacer un PR:**
- Verificar que el código compila: `dotnet build`
- Ejecutar linter: `dotnet format`
- Las nuevas features deben incluir DTOs y validadores
- Agregar comentarios XML para documentación

**Estructura de un PR:**
- Descripción clara del cambio
- Razón del cambio
- Testing realizado
- Screenshots/ejemplos si aplica

##  Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

##  Autor

**TheBasol**
- GitHub: [@TheBasol](https://github.com/TheBasol)

##  Agradecimientos

- [OpenRouter](https://openrouter.ai/) por el acceso a múltiples modelos de IA
- [Vercel](https://vercel.com/) por la plataforma de deployment
- [Tailwind CSS](https://tailwindcss.com/) por el framework de estilos
- Comunidad de Next.js y React por las herramientas increíbles

---

 ¡Si te gusta este proyecto, no olvides darle una estrella en GitHub!
