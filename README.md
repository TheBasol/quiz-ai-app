# 🧠 Quiz AI App

Una aplicación moderna de quiz desarrollada con Next.js 15 que utiliza inteligencia artificial para generar cuestionarios educativos personalizados.

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange?style=flat-square)

## Características

### Funcionalidades Principales
- **Generación AI de Cuestionarios**: Crea quizzes personalizados usando 19+ modelos de IA diferentes
- **Creación Manual**: Diseña tus propios cuestionarios con un editor intuitivo
- **Sistema de Temporizador**: Cronómetro configurable con límites de tiempo personalizables
- **Diseño Responsivo**: Interfaz adaptable para dispositivos móviles y desktop
- **Tema Oscuro**: Diseño moderno con colores dinámicos y gradientes
- **Gestión de Estado**: Almacenamiento eficiente con Zustand
- **Navegación Inteligente**: Rutas dinámicas con Next.js App Router

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

### Estado y Gestión de Datos
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado ligera
- **React Hooks** - Hooks personalizados para lógica de negocio

### IA y APIs
- **[OpenAI SDK](https://github.com/openai/openai-node)** - Cliente para APIs de IA
- **[OpenRouter](https://openrouter.ai/)** - Agregador de modelos de IA
- **Múltiples Proveedores**: DeepSeek, Claude, GPT, Llama, y más

### Herramientas de Desarrollo
- **[ESLint](https://eslint.org/)** - Linting y calidad de código
- **[Turbopack](https://turbo.build/pack)** - Bundler de alta velocidad

## Instalación

### Prerrequisitos
- Node.js 18.17 o superior
- npm, yarn, pnpm o bun
- Clave API de OpenRouter

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TheBasol/quiz-ai-app.git
cd quiz-ai-app
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Añadir tu clave API de OpenRouter en `.env.local`:
```env
OPENROUTER_API_KEY=tu_clave_api_aqui
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en el navegador**
Visita [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
quiz-ai-app/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (quiz)/            # Grupo de rutas de quiz
│   │   │   ├── page.tsx       # Página principal
│   │   │   ├── questions/[id]/# Página de preguntas dinámicas
│   │   │   └── results/       # Página de resultados
│   │   ├── api/               # API Routes
│   │   │   └── get-quiz/      # Endpoint de generación AI
│   │   ├── globals.css        # Estilos globales
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes React
│   │   ├── modal/             # Modales de creación
│   │   ├── quizContent/       # Componentes de quiz
│   │   ├── quizzes/           # Grid y tarjetas de quizzes
│   │   └── results/           # Componentes de resultados
│   ├── config/                # Configuración de IA
│   ├── data/                  # Prompts y datos estáticos
│   ├── hooks/                 # Custom React Hooks
│   ├── interfaces/            # Tipos TypeScript
│   ├── services/              # Servicios de IA
│   ├── store/                 # Estado global (Zustand)
│   └── utils/                 # Utilidades y helpers
├── public/                    # Archivos estáticos
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
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

##  Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

##  Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

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
