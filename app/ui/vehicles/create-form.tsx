'use client';
// import {
//   VehicleField,
// } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createVehicle } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form()
  {
//   vehicles
// }: {
//   vehicles: VehicleField[];
//    {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createVehicle, initialState);
//   // console.log(state.errors);

  return (
    <form action={dispatch} >
      <div className="mb-2 w-full">
            <label htmlFor="patente" className="mb-1 block text-sm font-medium">
              Patente
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="patente"
                  name="patente"
                  type="string"
                  placeholder="Enter Patente"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div id="patente-error" aria-live="polite" aria-atomic="true">
              {state.errors?.patente &&
                state.errors.patente.map((error: string) => (
                  <p className="mt-0.5 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-2 w-full">
            <label htmlFor="description" className="mb-1 block text-sm font-medium">
              Description
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="string"
                  placeholder="Enter Description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-0.5 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        
          
    
        {/* movements Status */}
        {/* <fieldset>
          <legend className="mb-1 block text-sm font-medium">
            Set the movement status
          </legend>
          <div className="flex rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-0.5 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset> */}
      <div className="mt-6 md:mt-2 flex justify-end gap-4">
        <Link
          href="/dashboard/vehicle"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create vehicle</Button>
      </div>
    </form>
  );
}
