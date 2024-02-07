import Form from '@/app/ui/movements/create-form';
import Breadcrumbs from '@/app/ui/movements/breadcrumbs';
import { fetchVehicles, fetchChofers, fetchLocalities, fetchProvinces  } from '@/app/lib/data';
 
export default async function Page() {
  const vehicles = await fetchVehicles();
  const chofers = await fetchChofers();
  const localities = await fetchLocalities();
  const provinces = await fetchProvinces()
//   console.log(vehicles)
//   console.log(chofers)
//  console.log(localities)
console.log(provinces)

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movements', href: '/dashboard/movement' },
          {
            label: 'Movement load',
            href: '/dashboard/movement/create',
            active: true,
          },
        ]}
      />
      <Form vehicles={vehicles} chofers={chofers} localities ={localities} provinces={provinces} />
    </main>
  );
}