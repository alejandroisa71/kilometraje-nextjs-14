import Form from '@/app/ui/movements/create-form';
import Breadcrumbs from '@/app/ui/movements/breadcrumbs';
import { fetchVehicles } from '@/app/lib/data';
 
export default async function Page() {
  const vehicles = await fetchVehicles();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movements', href: '/dashboard/movement' },
          {
            label: 'Motion load',
            href: '/dashboard/movement/create',
            active: true,
          },
        ]}
      />
      <Form vehicles={vehicles} />
    </main>
  );
}