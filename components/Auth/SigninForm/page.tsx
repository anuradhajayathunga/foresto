'use client';

import { EmailIcon, PasswordIcon } from '@/assets/icons';
import Link from 'next/link';
import InputGroup from '../../FormElements/InputGroup';
import { Checkbox } from '../../FormElements/checkbox';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api'; // 👈 use shared API helper instead of local API_BASE_URL

type LoginForm = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  refresh: string;
};

export default function SigninWithPassword() {
  const router = useRouter();

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // apiFetch handles:
      // - BASE_URL and env
      // - JSON headers
      // - throwing on non-OK responses
      const data = await apiFetch<LoginResponse>('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Store tokens in localStorage (demo/simple approach)
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      router.push('/dashboard');
      toast.success('Account Login Successfully.');
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Optional error message display */}
      {error && (
        <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700'>
          {error}
        </div>
      )}

      <InputGroup
        type='email'
        label='Email'
        className='mb-4 [&_input]:py-[15px]'
        placeholder='you@example.com'
        name='email'
        handleChange={handleChange}
        value={form.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type='password'
        label='Password'
        className='mb-5 [&_input]:py-[15px]'
        placeholder='••••••••'
        name='password'
        handleChange={handleChange}
        value={form.password}
        icon={<PasswordIcon />}
      />

      <div className='mb-6 flex items-center justify-between gap-2 pb-2 text-sm font-medium'>
        <Checkbox
          label='Remember me'
          name='remember'
          withIcon='check'
          withBg
          radius='md'
        />

        <Link
          href='/auth/forgot-password'
          className='text-xs hover:text-primary dark:text-white dark:hover:text-primary'
        >
          Forgot Password?
        </Link>
      </div>

      <div className='mb-4.5'>
        <button
          type='submit'
          disabled={loading}
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70'
        >
          {loading ? 'Signing in...' : 'Sign In'}
          {loading && (
            <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent' />
          )}
        </button>
      </div>
    </form>
  );
}
