'use client';

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CameraIcon } from './_components/icons';
import { SocialAccounts } from './_components/social-accounts';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthToken';

export default function Page() {
  const [data, setData] = useState({
    name: 'Danish Heilium',
    profilePhoto: '/images/user/user-03.png',
    coverPhoto: '/images/cover/cover-01.png',
  });

  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // 🔹 NEW

  const handleChange = (e: any) => {
    if (e.target.name === 'profilePhoto') {
      const file = e.target?.files[0];

      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === 'coverPhoto') {
      const file = e.target?.files[0];

      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  // If no token → redirect to login
    useEffect(() => {
      if (!authLoading && !user) {
        router.push('/auth/sigin');
      }
    }, [authLoading, user, router]);
  

  // 🔹 Modern loading skeleton
  if (authLoading) {
    return (
      <div className="mx-auto w-full max-w-[970px]">
        <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          {/* Cover skeleton */}
          <div className="relative z-20 h-30 md:h-50 overflow-hidden">
            <div className="h-full w-full animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-dark-3 dark:via-dark-2 dark:to-dark-3" />
          </div>

          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            {/* Avatar skeleton */}
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
              <div className="relative flex items-center justify-center drop-shadow-2">
                <div className="size-24 sm:size-40 rounded-full animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-dark-3 dark:via-dark-2 dark:to-dark-3" />
              </div>
            </div>

            {/* Name + username skeleton */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="h-4 w-40 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
              <div className="h-3 w-28 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
            </div>

            {/* Stats skeleton */}
            <div className="mx-auto mb-5.5 mt-6 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center gap-2 px-4 ${
                    i !== 2 ? 'border-r border-stroke dark:border-dark-3' : ''
                  }`}
                >
                  <div className="h-4 w-10 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
                  <div className="h-3 w-16 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
                </div>
              ))}
            </div>

            {/* About skeleton */}
            <div className="mx-auto mt-4 max-w-[720px]">
              <div className="h-4 w-24 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3 mb-4" />
              <div className="space-y-3">
                <div className="h-3 w-full rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
                <div className="h-3 w-11/12 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
                <div className="h-3 w-10/12 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3" />
              </div>
            </div>

            {/* Optional: skeleton where social accounts will be */}
            <div className="mx-auto mt-6 flex max-w-[280px] justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full animate-pulse bg-slate-200 dark:bg-dark-3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Normal UI once loaded
  return (
    <div className="mx-auto w-full max-w-[970px]">
      {/* <Breadcrumb pageName="Profile" /> */}

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-30 md:h-50">
          <Image
            src={data?.coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="coverPhoto"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-[15px] py-[5px] text-body-sm font-medium text-white hover:bg-opacity-90"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />

              <CameraIcon />

              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
            <div className="relative drop-shadow-2">
              {data?.profilePhoto && (
                <>
                  <Image
                    src={data?.profilePhoto}
                    width={160}
                    height={160}
                    className="overflow-hidden rounded-full"
                    alt="profile"
                  />

                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                  >
                    <CameraIcon />

                    <input
                      type="file"
                      name="profilePhoto"
                      id="profilePhoto"
                      className="sr-only"
                      onChange={handleChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-heading-6 font-bold text-dark dark:text-white">
              {user?.first_name} {user?.last_name}
            </h3>
            <p className="font-medium">@{user?.username}</p>

            <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-3 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  259
                </span>
                <span className="text-body-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  129K
                </span>
                <span className="text-body-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-medium text-dark dark:text-white">
                  2K
                </span>
                <span className="text-body-sm-sm">Following</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px]">
              <h4 className="font-medium text-dark dark:text-white">About Me</h4>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque posuere fermentum urna, eu condimentum mauris
                tempus ut. Donec fermentum blandit aliquet. Etiam dictum dapibus
                ultricies. Sed vel aliquet libero. Nunc a augue fermentum,
                pharetra ligula sed, aliquam lacus.
              </p>
            </div>

            <SocialAccounts />
          </div>
        </div>
      </div>
    </div>
  );
}
