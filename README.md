# Missinggold - Event Management Platform

A comprehensive event management and venue platform for Iraq & Kurdistan, featuring hotels, restaurants, activities, and entertainment venues.

## Features

- 🎯 **Multi-language Support**: English, Arabic, and Kurdish
- 🏨 **Venue Management**: Hotels, restaurants, cafes, and tourism activities
- 📱 **Progressive Web App**: Offline-capable mobile experience
- 🔐 **Authentication**: Secure user authentication with NextAuth.js
- 💎 **Modern Stack**: Next.js 15, React 19, TypeScript, Prisma
- 🎨 **Beautiful UI**: Tailwind CSS with responsive design
- 🌍 **RTL Support**: Full right-to-left language support

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Prisma CLI

### Installation

```bash
# Clone the repository
git clone https://github.com/absulysuly/missinggold.git
cd missinggold

# Install dependencies
npm ci

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and other secrets

# Set up the database
npm run db:deploy
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/missinggold"

# Authentication  
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="your-upstash-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Analytics (Optional)
SENTRY_DSN="your-sentry-dsn"
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checking
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with initial data

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility libraries
│   └── types/            # TypeScript type definitions
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── messages/            # i18n translation files
└── scripts/             # Build and maintenance scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Security

If you discover any security issues, please email [security@example.com](mailto:security@example.com) instead of using the issue tracker.

**Note**: After deployment, rotate all secrets that were removed during repository extraction.
