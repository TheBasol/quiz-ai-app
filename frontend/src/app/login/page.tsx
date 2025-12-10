import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">Quiz AI</h1>
          <p className="text-gray-400 text-sm">Intelligent Quiz Platform</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Sign In
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Access your account to continue
            </p>
          </div>

          <LoginForm />

          <div className="mt-6 border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-center text-sm">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>© 2025 Quiz AI App. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
