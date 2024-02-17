import Form from '@/app/ui/vehicles/create-form';
import Breadcrumbs from '@/app/ui/movements/breadcrumbs';
import { fetchVehicles, fetchChofers, fetchLocalities, fetchProvinces  } from '@/app/lib/data';
 
export default async function Page() {
  const vehicles = await fetchVehicles();
  // const chofers = await fetchChofers();
  // const localities = await fetchLocalities();
  // const provinces = await fetchProvinces()
//   console.log(vehicles)
//   console.log(chofers)
//  console.log(localities)
// console.log(provinces)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vehicles', href: '/dashboard/vehicle' },
          {
            label: 'Vehicle load',
            href: '/dashboard/vehicle/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}