// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};




export type Vehicle = {
  id: string;
  patente: string;
};

export type Chofer = {
  id: string;
  name: string;
};


export type Movement = {
  id: string;
  vehicle_id: string;
  final: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};


export type LatestMovement = {
  id: string;
  patente: string;
  final: string;
};


// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestMovementRaw = Omit<LatestMovement, 'final'> & {
  final: number;
};


export type MovementsTable = {
  id: string;
  vehicle_id: string;
  patente: string;
  date: string;
  final: number;
  status: 'pending' | 'paid';
};

//-----Vehicle-------------




export type VehiclesTableType = {
  id: string;
  patente: string;
  // description: string;
  total_movements: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedVehiclesTable = {
  id: string;
  patente: string;
  description: string;
  total_movements: number;
  total_pending: string;
  total_paid: string;
};


export type VehicleField = {
  id: string;
  patente: string;
  description: string;
};

export type ChoferField = {
  id: string;
  name: string;
};

export type localityField = {
  id: string;
  name: string;
};

export type provinceField = {
  id: string;
  name: string;
};






export type MovementForm = {
  id: string;
  vehicle_id: string;
  final: number;
  status: string;
};