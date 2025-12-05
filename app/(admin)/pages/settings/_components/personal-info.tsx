'use client';

import { useState, useEffect } from 'react';
import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from '@/assets/icons';
import InputGroup from '@/components/FormElements/InputGroup';
import { TextAreaGroup } from '@/components/FormElements/InputGroup/text-area';
import { ShowcaseSection } from '@/components/Layouts/showcase-section';
import { useAuth } from '@/hooks/useAuthToken';

export function PersonalInfoForm() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    username: '',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui.',
  });

  // Initialize when user loads
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      fullName: `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim(),
      email: user?.email ?? '',
      username: user?.username ?? '',
    }));
  }, [user]);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // do something with form
    console.log(form);
  };

  return (
    <ShowcaseSection title='Personal Information' className='!p-7'>
      <form onSubmit={handleSubmit}>
        <div className='mb-5.5 flex flex-col gap-5.5 sm:flex-row'>
          <InputGroup
            className='w-full sm:w-1/2'
            type='text'
            name='fullName'
            label='Full Name'
            placeholder='David Jhon'
            value={form.fullName}
            handleChange={handleChange('fullName')}
            icon={<UserIcon />}
            iconPosition='left'
            height='sm'
          />

          <InputGroup
            className='w-full sm:w-1/2'
            type='text'
            name='phoneNumber'
            label='Phone Number'
            placeholder='+990 3343 7865'
            value={form.phoneNumber}
            handleChange={handleChange('phoneNumber')}
            icon={<CallIcon />}
            iconPosition='left'
            height='sm'
          />
        </div>

        <InputGroup
          className='mb-5.5'
          type='email'
          name='email'
          label='Email Address'
          placeholder='devidjond45@gmail.com'
          value={form.email}
          handleChange={handleChange('email')}
          icon={<EmailIcon />}
          iconPosition='left'
          height='sm'
        />

        <InputGroup
          className='mb-5.5'
          type='text'
          name='username'
          label='Username'
          placeholder='devidjhon24'
          value={form.username}
          handleChange={handleChange('username')}
          icon={<UserIcon />}
          iconPosition='left'
          height='sm'
        />

        <TextAreaGroup
          className='mb-5.5'
          label='BIO'
          placeholder='Write your bio here'
          defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia turpis tortor, consequat efficitur mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim arcu pellentesque lectus ac suscipit diam sem a felis. Cras sapien ex, blandit eu dui et suscipit gravida nunc. Sed sed est quis dui.'
          icon={<PencilSquareIcon />}
        />

        <div className='flex justify-end gap-3'>
          <button
            className='rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white'
            type='button'
          >
            Cancel
          </button>

          <button
            className='rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90'
            type='submit'
          >
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
