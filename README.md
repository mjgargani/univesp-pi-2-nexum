# Nexum - Customer Service & Mechanical Services Management

A modern, monolithic web application built for customer service and mechanical services management. This project demonstrates a full-stack solution using ReactJS with TypeScript and Tailwind CSS for the frontend, NestJS for the backend API, and includes mocked database functionality.

## 🚀 Features

- **Customer Management**: Complete CRUD operations for customer records
- **Mechanical Services Management**: Track service requests, status updates, and priorities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG-compliant components with proper ARIA labels
- **Real-time Updates**: Dynamic status management for services
- **Docker Support**: Containerized deployment for development and production

## 🏗️ Architecture

### Monolithic Structure
```
nexum/
├── frontend/          # React + TypeScript + Tailwind CSS
├── backend/           # NestJS API
├── docker-compose.yml # Production deployment
└── docker-compose.dev.yml # Development setup
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Responsive and accessible design

**Backend:**
- NestJS framework
- TypeScript
- RESTful API design
- In-memory mocked database

**DevOps:**
- Docker & Docker Compose
- Multi-stage builds
- Nginx for production frontend serving

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+ 
- Docker and Docker Compose
- Git

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/mjgargani/univesp-pi-2-nexum.git
cd univesp-pi-2-nexum
```

2. **Install dependencies:**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Run development servers:**

**Backend:**
```bash
cd backend
npm run start:dev
```
The API will be available at `http://localhost:3001`

**Frontend:**
```bash
cd frontend
npm run dev
```
The web application will be available at `http://localhost:5173`

### Docker Development

For a complete containerized development environment:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will start both services:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Production Deployment

For production deployment:

```bash
docker-compose up --build -d
```

This will start:
- Frontend: http://localhost (port 80)
- Backend: http://localhost:3001

## 📖 API Documentation

### Customers Endpoints

- `GET /customers` - List all customers
- `GET /customers/:id` - Get customer by ID
- `POST /customers` - Create new customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Services Endpoints

- `GET /services` - List all services
- `GET /services?customerId=:id` - List services by customer
- `GET /services/:id` - Get service by ID
- `POST /services` - Create new service
- `PUT /services/:id` - Update service
- `DELETE /services/:id` - Delete service

### Health Check

- `GET /health` - API health status

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Build Verification
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## 🔧 Development Guidelines

### KISS (Keep It Simple, Stupid)
- Simple, focused components
- Clear separation of concerns
- Minimal dependencies
- Straightforward data flow

### DRY (Don't Repeat Yourself)
- Reusable components
- Shared types between frontend and backend
- Common utility functions
- Consistent styling patterns

### Code Structure

**Frontend:**
```
src/
├── components/        # Reusable UI components
├── services/         # API service layers
├── types/           # TypeScript interfaces
├── hooks/           # Custom React hooks
└── App.tsx         # Main application
```

**Backend:**
```
src/
├── customers/       # Customer module
├── services/        # Services module
├── app.module.ts   # Main application module
└── main.ts         # Application entry point
```

## 🌐 Accessibility Features

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast design
- Focus management

## 📱 Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces
- Optimized for various screen sizes

## 🔒 Security Considerations

- Input validation
- CORS configuration
- Environment variable management
- Secure default configurations

## 🚀 Deployment Options

### Development
- Local development servers
- Docker Compose development setup

### Production
- Docker containerization
- Nginx reverse proxy
- Health checks and monitoring
- Scalable architecture

## 📋 Future Enhancements

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] User authentication and authorization
- [ ] File upload functionality
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Data export capabilities
- [ ] Audit logging
- [ ] API rate limiting

## 🤝 Contributing

This project is part of a collaborative academic assignment. For contributions:

1. Fork the repository
2. Create a feature branch
3. Follow the established coding patterns
4. Write tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**UNIVESP PI-2 Project Team**

This project was developed as part of the UNIVESP (Universidade Virtual do Estado de São Paulo) PI-2 course assignment, focusing on collaborative development of web software for customer service and mechanical services management.

---

**Assignment Requirements Implemented:**
- ✅ Web framework usage (React + NestJS)
- ✅ Database implementation (mocked data layer)
- ✅ Version control (Git)
- ✅ Cloud deployment ready (Docker)
- ✅ API development (RESTful endpoints)
- ✅ Accessibility features (ARIA, semantic HTML)
- ✅ Web scripts inclusion (TypeScript)
- ✅ Testing infrastructure