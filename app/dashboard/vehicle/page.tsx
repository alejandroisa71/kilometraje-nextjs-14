
import { CreateVehicle } from '@/app/ui/vehicles/buttons';
import { lusitana } from '@/app/ui/fonts';

import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/vehicles/table';
import { MovementsTableSkeleton } from '@/app/ui/skeletonsMovements';
import { Suspense } from 'react';
import { fetchVehiclesPages } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // console.log(searchParams);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchVehiclesPages(query)
  //  console.log(currentPage)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Vehicles</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search vehicles..." />
        <CreateVehicle />
      </div>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
      {/* <Suspense key={query + currentPage} fallback={<MovementsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}