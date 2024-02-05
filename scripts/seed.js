const { db } = require('@vercel/postgres');
const {
  invoices,
  customers,
  revenue,
  users,
  vehicles,
  movements,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

//----------
async function seedMovements(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "movements" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS movements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vehicle_id UUID NOT NULL,
    date DATE NOT NULL,
    initial INT NOT NULL,
    tour INT NOT NULL,
    final INT NOT NULL,
    service INT,
    detail VARCHAR(255) NOT NULL,
    novelties VARCHAR(255),
    loc_origin VARCHAR(255) NOT NULL,
    prov_origin VARCHAR(255) NOT NULL,
    loc_destination VARCHAR(255) NOT NULL,
    prov_destination VARCHAR(255) NOT NULL,
    chofer VARCHAR(255) NOT NULL,
    average VARCHAR(255) NOT NULL,
    num_average INT, 
    branch INT,
    status VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "movements" table`);

    // Insert data into the "movements" table
    const insertedMovements = await Promise.all(
      movements.map(
        (movement) => client.sql`
        INSERT INTO movements (vehicle_id, date, initial, tour, final, detail, novelties, loc_origin, prov_origin, loc_destination, prov_destination, chofer, average, num_average, branch, status)
        VALUES (${movement.vehicle_id}, ${movement.date}, ${movement.initial}, ${movement.tour}, ${movement.final}, ${movement.detail}, ${movement.novelties}, ${movement.loc_origin}, ${movement.prov_origin}, ${movement.loc_destination}, ${movement.prov_destination}, ${movement.chofer}, ${movement.average}, ${movement.num_average}, ${movement.branch}, ${movement.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMovements.length} movements`);

    return {
      createTable,
      movements: insertedMovements,
    };
  } catch (error) {
    console.error('Error seeding movements:', error);
    throw error;
  }
}

//-----------

//============================================================================
async function seedVehicles(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "vehicles" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        patente VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
     );
    `;

    console.log(`Created "vehicles" table`);

    // Insert data into the "vehicles" table
    const insertedVehicles = await Promise.all(
      vehicles.map(async (vehicle) => {
        return client.sql`
        INSERT INTO vehicles (id, patente, description)
        VALUES (${vehicle.id},${vehicle.patente},${vehicle.description})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedVehicles.length} vehicles`);

    return {
      createTable,
      vehicles: insertedVehicles,
    };
  } catch (error) {
    console.error('Error seeding vehicles:', error);
    throw error;
  }
}

//================================================================
async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedVehicles(client);
  await seedMovements(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
