// import { StateMovement } from './actions';
// import { vehicles } from '@/app/lib/placeholder-data';
'use server';
//Todas las funciones qeu se exportan en este archivo son de servidor (no se ejecutan ni se envian al cliente)
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod

  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const UpdateInvoice = UpdateInvoiceSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  // console.log(prevState)
  // console.log(id)
  // console.log(amount)

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  revalidatePath(`/dashboard/invoices/${id}/edit`);
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  // Unreachable code block
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice' };
  }
}

//----movement----

const FormSchemaMovement = z.object({
  id: z.string(),
  vehicleId: z.string({
    invalid_type_error: 'Please select a Vehicle.',
  }),
  initial: z.coerce
    .number()
    .gt(0, { message: 'Please enter an initial greater than 0.' }),
  final: z.coerce
    .number()
    .gt(0, { message: 'Please enter an final greater than 0.' }),
  tour: z.coerce
    .number()
    .gt(0, { message: 'Please enter an tour greater than 0.' }),
  detail: z.string().min(6, { message: 'Must be at least 2 characters' }),
  novelties: z.string().min(6, { message: 'Must be at least 2 characters' }),
  loc_originId: z.string({
    invalid_type_error: 'Please select a Locality.',
  }),
  prov_originId: z.string({
    invalid_type_error: 'Please select a Province.',
  }),
  loc_destinationId: z.string({
    invalid_type_error: 'Please select a Locality.',
  }),
  prov_destinationId: z.string({
    invalid_type_error: 'Please select a Province.',
  }),
  choferId: z.string({
    invalid_type_error: 'Please select a Chofer.',
  }),
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an movement status.',
  // }),
  date: z.string(),
});

const CreateMovement = FormSchemaMovement.omit({
  id: true,
  date: true,
});

export type StateMovement = {
  errors?: {
    vehicleId?: string[];
    final?: string[];
    initial?: string[];
    tour?: string[];
    detail?: string[];
    novelties?: string[];
    loc_originId?: string[];
    prov_originId?: string[];
    loc_destinationId?: string[];
    prov_destinationId?: string[];
    choferId?: string[];
    // status?: string[];
    // detail?: string[];
  };
  message?: string | null;
};

export async function createMovement(
  prevState: StateMovement,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateMovement.safeParse({
    vehicleId: formData.get('vehicleId'),
    initial: formData.get('initial'),
    tour: formData.get('tour'),
    final: formData.get('final'),
    detail: formData.get('detail'),
    novelties: formData.get('novelties'),
    loc_originId: formData.get('loc_originId'),
    prov_originId: formData.get('prov_originId'),
    loc_destinationId: formData.get('loc_destinationId'),
    prov_destinationId: formData.get('prov_destinationId'),
    choferId: formData.get('choferId'),
    // status: formData.get('status'),
  });

  // console.log(validatedFields);
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movement.',
    };
  }

  // Prepare data for insertion into the database
  const {
    vehicleId,
    initial,
    final,
    tour,
    detail,
    novelties,
    loc_originId,
    prov_originId,
    loc_destinationId,
    prov_destinationId,
    choferId,
    // status,
  } = validatedFields.data;
  // const finalInCents = final * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    // console.log(vehicleId, status, final);
    await sql`
      INSERT INTO movements (vehicle_id, initial, final, tour, detail, novelties, loc_origin_id, prov_origin_id, loc_destination_id, prov_destination_id, chofer_id, average, status, date)
      VALUES (${vehicleId}, ${initial}, ${final}, ${tour}, ${detail}, ${novelties}, ${loc_originId}, ${prov_originId}, ${loc_destinationId}, ${prov_destinationId}, ${choferId}, ' ', 'paid', ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Movement.',
    };
  }

  // Revalidate the cache for the movement page and redirect the user.
  revalidatePath('/dashboard/movement');
  redirect('/dashboard/movement');
}

// Use Zod to update the expected types
const UpdateMovementSchema = z.object({
  id: z.string(),
  vehicleId: z.string({
    invalid_type_error: 'Please select a vehicle.',
  }),
  final: z.coerce
    .number()
    .gt(0, { message: 'Please enter an final greater than 0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const UpdateMovement = UpdateMovementSchema.omit({ id: true, date: true });

// ...

export async function updateMovement(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateMovement.safeParse({
    vehicleId: formData.get('vehicleId'),
    final: formData.get('final'),
    status: formData.get('status'),
  });

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movement.',
    };
  }

  const { vehicleId, final, status } = validatedFields.data;

  try {
    await sql`
      UPDATE movements
      SET vehicle_id = ${vehicleId}, final = ${final}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Movement.' };
  }

  revalidatePath('/dashboard/movement');
  revalidatePath(`/dashboard/movement/${id}/edit`);
  redirect('/dashboard/movement');
}

export async function deleteMovement(id: string) {
  // throw new Error('Failed to Delete Invoice');

  // Unreachable code block
  try {
    await sql`DELETE FROM movements WHERE id = ${id}`;
    revalidatePath('/dashboard/movement');
    return { message: 'Deleted Movement' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Movement' };
  }
}
//----authenticate----

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // console.log('holaaa')
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const FormSchemaLogin = z.object({
name: z.string(),
password:z.string()
})

//----vehicle----

const FormSchemaVehicle = z.object({
  id: z.string(),
  patente: z.string().min(6, { message: 'Must be at least 6 characters' }),
  description: z.string().min(12, { message: 'Must be at least 12 characters' }),
});
// date: z.string(),
// status: z.enum(['pending', 'paid'], {
//   invalid_type_error: 'Please select an movement status.',
// }),

const CreateVehicle = FormSchemaVehicle.omit({
  id: true,
});
// date: true,

export type StateVehicle = {
  errors?: {
    patente?: string[];
    description?: string[];
    // status?: string[];
    // detail?: string[];
  };
  message?: string | null;
};

export async function createVehicle(
  prevState: StateVehicle,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateVehicle.safeParse({
    patente: formData.get('patente'),
    description: formData.get('description'),
    // status: formData.get('status'),
  });

  // console.log(validatedFields);
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Vehicle.',
    };
  }

  // Prepare data for insertion into the database
  const {
    patente,
    description,
  } = validatedFields.data;
  // status,
  // const finalInCents = final * 100;
  // const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
     console.log(typeof patente, description);
    await sql`
      INSERT INTO vehicles (patente, description)
      VALUES (${patente}, ${description})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Vehicle.',
    };
  }

  // Revalidate the cache for the movement page and redirect the user.
  revalidatePath('/dashboard/vehicle');
  redirect('/dashboard/vehicle');
}

// Use Zod to update the expected types
// const UpdateMovementSchema = z.object({
//   id: z.string(),
//   vehicleId: z.string({
//     invalid_type_error: 'Please select a vehicle.',
//   }),
//   final: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an final greater than 0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });

// const UpdateMovement = UpdateMovementSchema.omit({ id: true, date: true });

// // ...

// export async function updateMovement(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateMovement.safeParse({
//     vehicleId: formData.get('vehicleId'),
//     final: formData.get('final'),
//     status: formData.get('status'),
//   });

//   // console.log(validatedFields);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Movement.',
//     };
//   }

//   const { vehicleId, final, status } = validatedFields.data;

//   try {
//     await sql`
//       UPDATE movements
//       SET vehicle_id = ${vehicleId}, final = ${final}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Movement.' };
//   }

//   revalidatePath('/dashboard/movement');
//   revalidatePath(`/dashboard/movement/${id}/edit`);
//   redirect('/dashboard/movement');
// }

// export async function deleteMovement(id: string) {
//   // throw new Error('Failed to Delete Invoice');

//   // Unreachable code block
//   try {
//     await sql`DELETE FROM movements WHERE id = ${id}`;
//     revalidatePath('/dashboard/movement');
//     return { message: 'Deleted Movement' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Movement' };
//   }
// }
