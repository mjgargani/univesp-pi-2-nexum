# Nexum - Customer Service & Mechanical Services Management

A modern, monolithic web application built for customer service and mechanical services management. This project demonstrates a full-stack solution using ReactJS with TypeScript and Tailwind CSS for the frontend, NestJS for the backend API, and includes mocked database functionality.

## 🚀 Features

- **Customer Management**: Complete CRUD operations for customer records
- **Mechanical Services Management**: Track service requests, status updates, and priorities
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG(Web Content Accessibility Guidelines)-compliant components with proper ARIA labels
- **Real-time Updates**: Dynamic status management for services
- **Docker Support**: Containerized deployment for development and production

## 🏗️ Architecture

### Monolithic Structure
```
nexum/
├── frontend/          # React + TypeScript + Tailwind CSS
├── backend/           # NestJS API
├── Dockerfile
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
- Kysely (Query Builder and Migrations)

**DevOps:**
- Dockerfile (All-in-one) _It is not best practice, but rather an experiment._
- Multi-stage builds
- Nginx for production frontend/backend serving