'use client';
import { EmailIcon, PasswordIcon } from '@/assets/icons';
import Link from 'next/link';
import InputGroup from '../../FormElements/InputGroup';
import { Checkbox } from '../../FormElements/checkbox';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useToast } from '@/hooks/useToast';

const API_BASE_URL = 'http://localhost:8000';

export default function SigninWithPassword() {
  const router = useRouter();
  // const { success, error } = useToast();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      // Simple approach: store in localStorage (for demo).
      // For production: use httpOnly cookies via Next.js API routes.
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      router.push('/dashboard');
      toast.success('Account Login Successfully.');
    } catch (err: any) {
      const msg = setError(err.message || 'Login failed');
      toast.error(`failed:${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type='email'
        label='Email'
        className='mb-4 [&_input]:py-[15px]'
        placeholder='you@example.com'
        name='email'
        handleChange={handleChange}
        value={form.email}
        // icon={<EmailIcon />}
      />

      <InputGroup
        type='password'
        label='Password'
        className='mb-5 [&_input]:py-[15px]'
        placeholder='••••••••'
        name='password'
        handleChange={handleChange}
        value={form.password}
        // icon={<PasswordIcon />}
      />

      <div className='mb-6 flex items-center justify-between gap-2 pb-2 text-sm font-medium'>
        <Checkbox
          label='Remember me'
          name='remember'
          withIcon='check'
          withBg
          radius='md'
          // onChange={(e) =>
          //   setData({
          //     ...form,
          //     remember: e.target.checked,
          //   })
          // }
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
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90'
        >
          Sign In
          {loading && (
            <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent' />
          )}
        </button>
      </div>
    </form>
  );
}
