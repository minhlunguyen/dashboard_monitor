# React Dashboard Monitor

A modern, responsive dashboard application built with React, TypeScript, and Vite. This project provides a comprehensive monitoring interface with data visualization capabilities, multi-language support, and a clean, professional UI.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Visualization**: Interactive charts using Recharts
- **Internationalization**: Multi-language support (English/Vietnamese)
- **Component Library**: Custom UI components with Radix UI
- **Date Filtering**: Advanced date range selection
- **Authentication**: JWT-based authentication system
- **API Integration**: RESTful API with Axios
- **Type Safety**: Full TypeScript support

## 📊 Dashboard Components

- **Student Reports**: Student growth and statistics
- **Instructor Reports**: Instructor performance metrics
- **Organization Reports**: Organization-level analytics
- **Interactive Charts**: Bar charts, line charts, and composed charts
- **Date Range Filtering**: Custom date selection with calendar

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Radix UI, Lucide React
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **Date Handling**: date-fns, moment-timezone
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd react-dashboard-monitor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create environment file:

```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Dashboard Monitor
VITE_APP_VERSION=1.0.0
```

## 🚀 Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Build

Build for production:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base UI components
├── containers/         # Page containers
│   └── reports/        # Reports dashboard
├── lib/                # Utilities and services
│   ├── constants/      # Application constants
│   ├── http/           # API client
│   ├── interfaces/     # TypeScript interfaces
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── pages/              # Page components
├── router/             # Routing configuration
└── layouts/            # Layout components
```

## 🎨 UI Components

The project includes a custom component library built on top of Radix UI:

- **Button**: Customizable button component
- **Card**: Card container with header and content
- **Chart**: Chart wrapper components for data visualization

## 🌐 Internationalization

The application supports multiple languages:

- English (en)
- Vietnamese (vi)

Language files are located in `public/locales/` and `src/lib/i18n/`.

## 📊 Chart Components

- **BarChart**: Bar chart visualization
- **LineChart**: Line chart visualization
- **ComposedChart**: Combined chart types

## 🔧 Configuration

### Vite Configuration

- Path aliases configured for clean imports
- Legacy browser support
- SWC for fast compilation

### TypeScript Configuration

- Strict type checking enabled
- Path mapping configured
- Separate configs for app and node

### ESLint Configuration

- React hooks rules
- TypeScript integration
- Modern ESLint flat config

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for production

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
