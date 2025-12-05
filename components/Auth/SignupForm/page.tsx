'use client';

import { EmailIcon, PasswordIcon, UserIcon } from '@/assets/icons';
import InputGroup from '../../FormElements/InputGroup';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api'; // 👈 use your shared API helper

type RegisterForm = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

export default function SigninWithPassword() {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiFetch('/api/register/', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      toast.success('Account created. You can now log in.');
      router.push('signin');
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <InputGroup
            type='text'
            label='First Name'
            className='[&_input]:py-[11px]'
            placeholder='John'
            name='first_name'
            handleChange={handleChange}
            value={form.first_name}
            // icon={<UserIcon />}
          />
          <InputGroup
            type='text'
            label='Last Name'
            className='[&_input]:py-[11px]'
            placeholder='Doe'
            name='last_name'
            handleChange={handleChange}
            value={form.last_name}
            // icon={<UserIcon />}
          />
        </div>

        <InputGroup
          type='email'
          label='Email'
          className='[&_input]:py-[11px]'
          placeholder='you@example.com'
          name='email'
          handleChange={handleChange}
          value={form.email}
          // icon={<EmailIcon />}
          required
        />

        <InputGroup
          type='text'
          label='Username'
          className='[&_input]:py-[11px]'
          placeholder='yourusername'
          name='username'
          handleChange={handleChange}
          value={form.username}
          // icon={<UserIcon />}
        />

        <InputGroup
          type='password'
          label='Password'
          className='[&_input]:py-[11px]'
          placeholder='••••••••'
          name='password'
          handleChange={handleChange}
          value={form.password}
          // icon={<PasswordIcon />}
        />

        <div className='mb-4.5 mt-6'>
          <button
            type='submit'
            disabled={loading}
            className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-70'
          >
            {loading ? 'Creating account...' : 'Sign up'}
            {loading && (
              <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent' />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
