// frontend/src/lib/api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export interface Service {
  id: string;
  name: string;
  price: number;
  durationMins: number;
  category: string;
  deposit: number;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  dateTime: string;
  status: string;
  depositStatus: string;
  depositAmount: number;
}

// Obtener todos los servicios
export async function getServices(): Promise<Service[]> {
  const res = await fetch(`${API_URL}/api/services`);
  const data = await res.json();
  return data.data || [];
}

// Obtener servicios por categoría
export async function getServicesByCategory(category: string): Promise<Service[]> {
  const todos = await getServices();
  return todos.filter(s => s.category === category);
}

// Crear un turno
export async function createAppointment(data: {
  serviceId: string;
  date: string;
  hour: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}): Promise<Appointment> {
  const dateTime = new Date(`${data.date}T${data.hour}:00`).toISOString();
  
  const res = await fetch(`${API_URL}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      serviceId: data.serviceId,
      dateTime: dateTime,
    }),
  });
  
  const result = await res.json();
  if (!result.success) throw new Error(result.error);
  return result.data;
}