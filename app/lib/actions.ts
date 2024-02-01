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
    // vehicleId?: string[];
    // final?: string[];
    // detail?:string[];
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
  final: z.coerce
    .number()
    .gt(0, { message: 'Please enter an final greater than 0.' }),
  // detail: z.string({
  //   invalid_type_error: 'Please select a Detail for movement.',
  // }),
  // detail:z.string().min(6, {message: 'Must be at least 2 characters'}),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an movement status.',
  }),
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
    status?: string[];
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
    final: formData.get('final'),
    // detail: formData.get('detail'),
    status: formData.get('status'),
  });

  // console.log(validatedFields)
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movement.',
    };
  }

  // Prepare data for insertion into the database
  const { vehicleId, final, status } = validatedFields.data;
  // const finalInCents = final * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO movements (vehicle_id, final, status, date)
      VALUES (${vehicleId}, ${final}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Movement.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
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
//----movement----

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
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
