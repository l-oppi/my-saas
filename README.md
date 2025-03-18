# My SaaS Learning Project

This is a personal project built to learn and practice modern web development technologies. It serves as a learning platform for Next.js, React, Firebase, and web development best practices.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React** - UI library
- **Firebase** - Backend services (Authentication & Firestore)
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

## Features

### Authentication & User Management
- Email/Password Authentication
- Google Sign-in Integration
- Protected Routes with Auth Context
- User Profile Management
- Two-step Registration Process:
  1. Basic Account Creation
  2. Required Profile Completion

### Security Features
- Password Strength Indicator
- Form Validation
- Error Handling for Firebase Auth
- Protected Route Management
- Secure Session Management

### Profile Management
- Complete Profile Flow
- User Avatar with Initials Fallback
- User Data Management in Firestore
- Profile Completion Status Tracking

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── dashboard/      # Dashboard page
│   ├── signin/         # Sign-in page
│   └── signup/         # Sign-up and profile completion
├── components/         # Reusable React components
│   ├── Profile/        # User profile components
│   ├── Auth/          # Authentication components
│   └── UI/            # Common UI components
├── context/           # React Context providers
│   └── AuthContext    # Authentication state management
├── firebase/          # Firebase configuration & utils
│   ├── auth/          # Authentication functions
│   └── BaseConfig     # Firebase initialization
├── interfaces/        # TypeScript interfaces
└── utils/            # Utility functions
```

## Authentication Flow

1. **Initial Sign Up**
   - User creates account with email/password or Google
   - Basic account information stored in Firebase Auth
   - Initial Firestore document created

2. **Profile Completion**
   - Mandatory profile completion step
   - Additional user information collected
   - Profile marked as complete in Firestore

3. **Protected Routes**
   - Routes protected based on authentication status
   - Additional protection based on profile completion
   - Automatic redirects to appropriate pages

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
   - Enable Authentication (Email/Password and Google providers)
   - Set up Firestore Database
   - Add your Firebase config to `src/firebase/BaseConfig.ts`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Practices

- TypeScript for type safety
- Component-based architecture
- Context API for state management
- Custom hooks for reusable logic
- Error boundary implementation
- Responsive design principles
- Progressive enhancement
- Performance optimization

## Security Considerations

- Firebase Authentication best practices
- Protected route implementation
- Form validation and sanitization
- Error handling and user feedback
- Secure data management
- Environment variable usage

## Contributing

This is a personal learning project, but feel free to fork it and use it as a reference for your own learning journey.

## License

MIT
