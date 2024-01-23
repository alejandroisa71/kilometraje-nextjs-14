import Image from 'next/image';
import { UpdateMovement, DeleteMovement } from '@/app/ui/movements/buttons';
// import MovementStatus from '@/app/ui/movements/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredMovements } from '@/app/lib/data';

export default async function MovementsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const movements = await fetchFilteredMovements(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {movements?.map((movement) => (
              <div
                key={movement.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={movement.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${movement.patente}'s profile picture`}
                      /> */}
                      <p>{movement.description}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{movement.email}</p> */}
                  </div>
                  {/* <MovementStatus status={movement.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <p className="text-xl font-medium">
                      {formatCurrency(movement.amount)}
                    </p> */}
                    <p>{formatDateToLocal(movement.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMovement id={movement.id} />
                    <DeleteMovement id={movement.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            {/* <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead> */}
            <tbody className="bg-white">
              {movements?.map((movement) => (
                <tr
                  key={movement.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={movement.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${movement.name}'s profile picture`}
                      /> */}
                      {/* <p>{movement.patente}</p> */}
                    </div>
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {movement.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(movement.amount)}
                  </td> */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(movement.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <MovementStatus status={movement.status} /> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateMovement id={movement.id} />
                      <DeleteMovement id={movement.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
