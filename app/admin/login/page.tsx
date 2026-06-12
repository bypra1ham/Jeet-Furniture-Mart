'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ShieldAlert } from 'lucide-react';

function AdminLoginForm() {
  const [passphrase, setPassphrase] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Set the cookie client-side
    document.cookie = `admin_session=${passphrase}; path=/; max-age=86400; SameSite=Strict`;

    // Attempt to navigate to the protected analytics dashboard
    router.push('/admin/analytics');
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white border border-[#E0DDD8] p-8 shadow-sm">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto h-12 w-12 bg-amber-50 border border-gold-accent/30 rounded-full flex items-center justify-center text-gold-accent">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="mt-6 text-3xl font-display font-light text-stone-900">
          Admin <span className="font-bold text-gold-accent italic">Access</span>
        </h2>
        <p className="mt-2 text-xs font-sans text-stone-500 uppercase tracking-widest">
          Enter passphrase to view analytics
        </p>
      </div>

      {/* Errors */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 flex items-start space-x-3 text-xs">
          <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <span className="font-bold uppercase tracking-wider text-[10px]">Access Denied:</span>
            <p className="mt-1">The passphrase you entered is incorrect. Please try again.</p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="passphrase" className="sr-only">
            Passphrase
          </label>
          <input
            id="passphrase"
            name="passphrase"
            type="password"
            required
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-[#E0DDD8] placeholder-stone-400 text-stone-900 focus:outline-none focus:ring-1 focus:ring-gold-accent focus:border-gold-accent text-sm"
            placeholder="Enter Admin Passphrase"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xs font-sans uppercase font-bold tracking-widest text-white bg-black hover:bg-stone-900 focus:outline-none transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Unlock Dashboard'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-md w-full bg-white border border-[#E0DDD8] p-8 text-center text-xs font-sans text-stone-500 uppercase tracking-widest">
          Loading Access Portal...
        </div>
      }>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
