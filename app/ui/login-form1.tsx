'use client';

import { useForm } from 'react-hook-form';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation'
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState, useFormStatus } from 'react-dom';
import {zodResolver} from '@hookform/resolvers/zod'
import { authenticate } from '@/app/lib/actions';
// import {FormSchemaLogin} from '@/app/lib/actions'

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    // const [errorMessage, dispatch] = useFormState(FormSchemaLogin, undefined);
  // console.log(useFormStatus);

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {

  
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email:data.email,
        password:data.password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(res.ok){
      router.push('/login')
    }
    // console.log(res)
    // const resJSON = await res.json();
    // console.log(resJSON);
  });

  // console.log(errors);

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        {/* <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1> */}

        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
              // htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                // id="username"
                type="text"
                // name="username"
                placeholder="Enter your username"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                })}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {errors.name && (
            <span className="text-xs text-red-500">
              {errors.name?.message?.toString()}
            </span>
          )}
         
          
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="******"
                {...register('password', {
                  required: true,
                })}
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
      
        </div>

        <button className="mt-2 w-full rounded-lg bg-blue-500 p-3 text-white">
          Login
        </button>

        {/* <LoginButton /> */}
        {/* Add form errors here */}
        {/* <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div> */}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
