'use client';
import { VehicleField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMovement } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ vehicles }: { vehicles: VehicleField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMovement, initialState);
  console.log(state.errors);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-3">
        {/* Vehicle Name */}
        <div className="mb-4">
          <label htmlFor="vehicle" className="mb-2 block text-sm font-medium">
            Vehicle
          </label>
          <div className="relative">
            <select
              id="vehicle"
              name="vehicleId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="vehicle-error"
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.patente}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.vehicleId &&
              state.errors.vehicleId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className=" gap-x-8 md:flex">
          <div className="mb-4">
            <label htmlFor="initial" className="mb-2 block text-sm font-medium">
              Initial mileage
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="initial"
                  name="initial"
                  type="number"
                  placeholder="Enter initial"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.initial &&
                state.errors.initial.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
                {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}

          {/* movements Final */}
          <div>
            <div className="mb-4">
              <label htmlFor="final" className="mb-2 block text-sm font-medium">
                Final mileage
              </label>
              <div className="realtive mt-1 rounded-md">
                <div className="relative">
                  <input
                    id="final"
                    name="final"
                    type="number"
                    placeholder="Enter km"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                  />
                  {/* <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
              </div>
            </div>
            <div id="vehicle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.final &&
                state.errors.final.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="tour" className="mb-2 block text-sm font-medium">
              Tour
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="tour"
                  name="tour"
                  type="number"
                  placeholder="Enter route"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
              {state.errors?.tour &&
                state.errors.tour.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
        </div>

        <div className="gap-x-2 md:flex">
          <div className="mb-4 w-full">
            <label htmlFor="detail" className="mb-2 block text-sm font-medium">
              Detail
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="detail"
                  name="detail"
                  type="string"
                  placeholder="Enter final"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.detail &&
              state.errors.detail.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="final" className="mb-2 block text-sm font-medium">
              Novelties
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="novelties"
                  name="novelties"
                  type="string"
                  placeholder="Enter Noveltys"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.novelties &&
              state.errors.novelties.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="gap-x-2 md:flex">
          <div className="mb-4 w-full">
            <label htmlFor="loc_origin" className="mb-2 block text-sm font-medium">
              Locality of origin
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="loc_origin"
                  name="loc_origin"
                  type="string"
                  placeholder="Enter Locality of origin"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.loc_origin &&
              state.errors.loc_origin.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="prov_origin" className="mb-2 block text-sm font-medium">
              Province of Origin
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="prov_origin"
                  name="prov_origin"
                  type="string"
                  placeholder="Enter Province of Origin"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.prov_origin &&
              state.errors.prov_origin.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="gap-x-2 md:flex">
          <div className="mb-4 w-full">
            <label htmlFor="loc_destination" className="mb-2 block text-sm font-medium">
              Locality of Destination
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="loc_destination"
                  name="loc_destination"
                  type="string"
                  placeholder="Enter Origin"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.loc_destination &&
              state.errors.loc_destination.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="prov_destination" className="mb-2 block text-sm font-medium">
              Province of Destination
            </label>
            <div className="realtive mt-1 rounded-md">
              <div className="relative">
                <input
                  id="prov_destintation"
                  name="prov_destination"
                  type="string"
                  placeholder="Enter Destination"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.prov_destination &&
              state.errors.prov_destination.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="chofer" className="mb-2 block text-sm font-medium">
            Choose Chofer
          </label>
          <div className="relative">
            <select
              id="chofer"
              name="chofer"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="vehicle-error"
            >
              <option value="" disabled>
                Select a chofer
              </option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.patente}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="vehicle-error" aria-live="polite" aria-atomic="true">
            {state.errors?.chofer &&
              state.errors.chofer.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* movements Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the movement status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
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
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/movement"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create movements</Button>
      </div>
    </form>
  );
}
