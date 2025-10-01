# Deployment Guide - Missinggold

This guide provides step-by-step instructions for deploying the Missinggold event management platform to production.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- GitHub account
- Domain name (optional)

## Environment Setup

### Required Environment Variables

Create these environment variables in your production environment:

```bash
# Database - PostgreSQL connection string
DATABASE_URL="postgresql://username:password@hostname:5432/database_name"

# Authentication - Generate a random secret
NEXTAUTH_SECRET="your-super-secure-random-string-here"
NEXTAUTH_URL="https://yourdomain.com"

# Rate Limiting - Upstash Redis (recommended)
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# Email Service - Resend API
RESEND_API_KEY="re_your-resend-api-key"

# Analytics (Optional)
SENTRY_DSN="https://your-sentry-dsn@sentry.io/project-id"
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**:
   - Go to Project Settings > Environment Variables
   - Add all required environment variables
   - Ensure "Production", "Preview", and "Development" are checked as needed

4. **Database Setup**:
   - Set up PostgreSQL (recommended: Supabase, Railway, or PlanetScale)
   - Run migrations:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Custom Domain** (Optional):
   - Go to Project Settings > Domains
   - Add your custom domain
   - Configure DNS with your domain provider

### Option 2: Railway

1. **Deploy to Railway**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway link
   railway up
   ```

2. **Add Environment Variables**:
   ```bash
   railway variables set DATABASE_URL="your-database-url"
   railway variables set NEXTAUTH_SECRET="your-secret"
   # ... add other variables
   ```

3. **Database Setup**:
   - Railway provides PostgreSQL addon
   - Connect database and run migrations

### Option 3: Digital Ocean App Platform

1. **Create App Spec**:
   ```yaml
   name: missinggold
   services:
   - name: web
     source_dir: /
     github:
       repo: absulysuly/missinggold
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     routes:
     - path: /
     envs:
     - key: DATABASE_URL
       value: your-database-url
     - key: NEXTAUTH_SECRET
       value: your-secret
   ```

## Database Setup

### PostgreSQL Setup

1. **Choose a Provider**:
   - Supabase (recommended for ease)
   - Railway PostgreSQL
   - PlanetScale (MySQL compatible)
   - Amazon RDS
   - Google Cloud SQL

2. **Run Migrations**:
   ```bash
   npx prisma migrate deploy
   ```

3. **Seed Database**:
   ```bash
   npx prisma db seed
   ```

### Connection Pooling (Production)

For high-traffic applications, use connection pooling:

```bash
# Example with PgBouncer via Supabase
DATABASE_URL="postgresql://username:password@hostname:6543/database?pgbouncer=true"
```

## SSL and Security

### SSL Certificate

Most platforms (Vercel, Railway, etc.) provide SSL automatically. For custom deployments:

```bash
# Using Certbot (Let's Encrypt)
sudo certbot --nginx -d yourdomain.com
```

### Security Headers

The app includes security headers in `next.config.ts`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

### CORS Configuration

For API endpoints, configure CORS if needed:

```javascript
// pages/api/example.js
import cors from 'cors'

const corsMiddleware = cors({
  origin: ['https://yourdomain.com'],
  credentials: true,
})
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

### Image Optimization

Ensure images are optimized:
- Use Next.js Image component
- Configure image domains in `next.config.ts`
- Consider CDN for static assets

### Caching Strategy

```javascript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/events',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ]
  },
}
```

## Monitoring and Logging

### Error Tracking

Sentry is pre-configured. Set `SENTRY_DSN` environment variable.

### Performance Monitoring

```bash
# Add Vercel Analytics
npm install @vercel/analytics

# Add to _app.tsx
import { Analytics } from '@vercel/analytics/react'
```

### Database Monitoring

Monitor database performance:
- Connection pool usage
- Query performance
- Index usage

## CI/CD Pipeline

GitHub Actions workflow is included at `.github/workflows/ci.yml`:

- Runs on push to main branch
- Type checking with TypeScript
- Linting with ESLint
- Build verification
- Optional: Run tests

## Backup and Recovery

### Database Backups

```bash
# Automated backups (example with pg_dump)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Code Backups

- Use Git tags for releases
- Keep deployment artifacts
- Document rollback procedures

## Health Checks

The application includes health check endpoints:

```
GET /api/health
```

Returns database connectivity and application status.

## Scaling Considerations

### Horizontal Scaling

- Use stateless design
- Store sessions in database/Redis
- Consider read replicas for database

### Vertical Scaling

- Monitor memory usage
- Optimize database queries
- Use connection pooling

## Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Check TypeScript errors
   npm run type-check
   
   # Check ESLint issues
   npm run lint
   ```

2. **Database Connection**:
   ```bash
   # Test database connectivity
   npx prisma db pull
   ```

3. **Environment Variables**:
   - Verify all required variables are set
   - Check variable names for typos
   - Ensure secrets are properly base64 encoded

### Debug Mode

Enable debug logging in production:

```bash
DEBUG=* npm start
```

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update
npm audit fix

# Update Prisma
npx prisma migrate dev
```

### Security Updates

- Monitor for security advisories
- Update dependencies regularly
- Review and rotate secrets periodically

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificate installed
- [ ] Custom domain configured (if applicable)
- [ ] Health check endpoint returning 200
- [ ] Error tracking configured
- [ ] Backups scheduled
- [ ] Monitoring alerts set up
- [ ] Documentation updated

For support or issues, please refer to the [README.md](./README.md) or create an issue in the repository.