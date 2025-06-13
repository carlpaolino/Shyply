# Shyply - Modern E-commerce Platform

Shyply is a modern e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. It provides a seamless shopping experience for customers and a powerful dashboard for sellers.

## Features

- 🛍️ Modern, responsive product browsing
- 🔍 Advanced search and filtering
- 🛒 Shopping cart functionality
- 👤 User authentication
- 💳 Secure checkout process
- 📊 Seller dashboard
- 📱 Mobile-first design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma
- **Payment Processing**: Stripe
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.17 or later
- npm or yarn
- Git

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shyply.git
   cd shyply
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/shyply"

   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Stripe
   STRIPE_PUBLIC_KEY="your-stripe-public-key"
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shyply/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (shop)/            # Shop-related routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
└── styles/              # Global styles
```

## Development

- **Code Style**: We use ESLint and Prettier for code formatting
- **Type Checking**: TypeScript for type safety
- **Testing**: Jest and React Testing Library
- **Git Workflow**: Feature branches and pull requests

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@shyply.com or join our Slack channel.