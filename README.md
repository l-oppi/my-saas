# My SaaS Learning Project

This is a personal project built to learn and practice modern web development technologies. It serves as a learning platform for Next.js, React, Firebase, and web development best practices.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Firebase** - Backend services (Authentication & Firestore)
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## Features

- User Authentication (Email/Password & Google Sign-in)
- Protected Routes
- Responsive Design
- TypeScript Integration
- Modern UI/UX

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your Firebase configuration:
   - Create a Firebase project
   - Add your Firebase config to `src/firebase/BaseConfig.ts`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learning Objectives

This project was created to:
- Master Next.js App Router and its features
- Learn Firebase Authentication and Firestore
- Practice TypeScript in a real-world context
- Understand modern React patterns and hooks
- Implement responsive design with Tailwind CSS
- Learn about web security best practices

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── context/         # React Context providers
├── firebase/        # Firebase configuration
└── interfaces/      # TypeScript interfaces
```

## Contributing

This is a personal learning project, but feel free to fork it and use it as a reference for your own learning journey.

## License

MIT
