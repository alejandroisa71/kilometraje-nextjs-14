// import { movements, vehicles } from '@/app/lib/placeholder-data';
// import { fetchVehicles } from '@/app/lib/data';
import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  VehicleField,
  VehiclesTableType,
  MovementForm,
  MovementsTable,
  LatestMovementRaw,
  ChoferField,
  localityField,
  provinceField
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id, customers.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    // console.log(data.rows)
    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    // console.log(latestInvoices);
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // console.log(query)

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    console.log(invoices.rows)
    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    // console.log(invoice);

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getVehicles() {
  try {
    const data = await sql<VehicleField>`
      SELECT
        id,
        patente
      FROM vehicles
      ORDER BY patente ASC
    `;

    const vehicles = data.rows;
    return vehicles;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all vehicles.');
  }
}


export async function fetchVehicles() {
  try {
    const data = await sql<VehicleField>`
      SELECT    
        id,
        patente,
        description
      FROM vehicles
      ORDER BY patente ASC
    `;

    const vehicles = data.rows;
    // console.log(data.rows)
    return vehicles;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all vehicles.');
  }
}

export async function fetchFilteredVehicles(query: string) {
  try {
    const data = await sql<VehiclesTableType>`
		SELECT
		  vehicles.id,
		  vehicles.patente,
		  vehicles.description,
		  COUNT(movements.id) AS total_movements,
		  SUM(CASE WHEN movements.status = 'pending' THEN movements.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN movements.status = 'paid' THEN movements.amount ELSE 0 END) AS total_paid
		FROM vehicles
		LEFT JOIN movements ON vehicles.id = movements.vehicle_id
		WHERE
		  vehicles.paente ILIKE ${`%${query}%`} OR
		GROUP BY vehicles.id, vehicles.patente
		ORDER BY vehicles.name ASC
	  `;

    const vehicles = data.rows.map((vehicle) => ({
      ...vehicle,
      total_pending: vehicle.total_pending,
      total_paid: vehicle.total_paid,
    }));
    console.log(vehicles);
    return vehicles;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch vehicles table.');
  }
}


export async function fetchLatestMovements() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await sql<LatestMovementRaw>`
      SELECT movements.final, vehicles.patente, movements.id, vehicles.id
      FROM movements
      JOIN vehicles ON movements.vehicle_id = vehicles.id
      ORDER BY movements.date DESC
      LIMIT 5`;

    //  console.log(data) 
    // console.log(data.rows)
    const latestMovements = data.rows.map((movement) => ({
      ...movement,
      final: movement.final,
    }));
    // console.log(latestMovements)
    return latestMovements;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest movements.');
  }
}

export async function fetchFilteredMovements(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;


  try {
    const movements = await sql<MovementsTable>`
      SELECT
        movements.id,
        movements.final,
        movements.date,
        movements.status,
        vehicles.patente
      FROM movements
      JOIN vehicles ON movements.vehicle_id = vehicles.id
      WHERE
        vehicles.patente ILIKE ${`%${query}%`} OR
        movements.final::text ILIKE ${`%${query}%`} OR
        movements.date::text ILIKE ${`%${query}%`} OR
        movements.status ILIKE ${`%${query}%`}
        ORDER BY movements.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
    return movements.rows;
  } catch (error) {

    console.error('Database Error:', error);
    throw new Error('Failed to fetch movements.');

  }
}

export async function fetchMovementsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM movements
    JOIN vehicles ON movements.vehicle_id = vehicles.id
    WHERE
      vehicles.patente ILIKE ${`%${query}%`} OR
      movements.final::text ILIKE ${`%${query}%`} OR
      movements.date::text ILIKE ${`%${query}%`} OR
      movements.date::text ILIKE ${`%${query}%`} OR
      movements.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of movements.');
  }
}

export async function fetchMovementById(id: string) {
  try {
    const data = await sql<MovementForm>`
      SELECT
        movements.id,
        movements.vehicle_id,
        movements.final,
        movements.status
      FROM movements
      WHERE movements.id = ${id};
    `;

    const movement = data.rows.map((movement) => ({
      ...movement,
      // Convert amount from cents to dollars
      // amount: invoice.amount / 100,
    }));

    // console.log(invoice);

    return movement[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movement.');
  }
}


export async function fetchChofers() {
  try {
    const data = await sql<ChoferField>`
      SELECT
        id,
        name
      FROM chofers
      ORDER BY name ASC
    `;

    const chofers = data.rows;
    return chofers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all chofers.');
  }
}

export async function getChofers() {
  try {
    const data = await sql<ChoferField>`
      SELECT
        id,
        name
      FROM chofers
      ORDER BY name ASC
    `;

    const chofers = data.rows;
    return chofers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all chofers.');
  }
}

export async function getLocalities() {
  try {
    const data = await sql<localityField>`
      SELECT
        id,
        name
      FROM localities
      ORDER BY name ASC
    `;

    const localities = data.rows;
    return localities;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all localities.');
  }
}
export async function fetchLocalities() {
  try {
    const data = await sql<localityField>`
      SELECT
        id,
        name
      FROM localities
      ORDER BY name ASC
    `;

    const localities = data.rows;
    return localities;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all localities.');
  }
}


export async function getProvinces() {
  try {
    const data = await sql<provinceField>`
      SELECT
        id,
        name
      FROM provinces
      ORDER BY name ASC
    `;

    const provinces = data.rows;
    return provinces;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all provinces.');
  }
}
export async function fetchProvinces() {
  try {
    const data = await sql<provinceField>`
      SELECT
        id,
        name
      FROM provinces
      ORDER BY name ASC
    `;

    const provinces = data.rows;
    return provinces;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all provinces.');
  }
}

export async function fetchVehiclesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM vehicles
    WHERE
      vehicles.patente ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of vehicles.');
  }
}