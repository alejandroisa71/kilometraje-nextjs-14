import Form from '@/app/ui/movements/edit-form';
import Breadcrumbs from '@/app/ui/movements/breadcrumbs';
import { fetchMovementById, fetchVehicles } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [movement, vehicles] = await Promise.all([
    fetchMovementById(id),
    fetchVehicles(),
  ]);
  
  if (!movement) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movements', href: '/dashboard/movement' },
          {
            label: 'Edit Movement',
            href: `/dashboard/movement/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form movement={movement} vehicles={vehicles} />
    </main>
  );
}
