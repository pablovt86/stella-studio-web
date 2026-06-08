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
// Obtener servicios por categoría (100% DINÁMICO)
export async function getServicesByCategory(category: string): Promise<Service[]> {
  const todos = await getServices();
  
  // Imprimimos en consola para auditar que el filtro reciba los datos
  console.log("🔍 Filtrando servicios para la categoría:", category, "Total recibidos:", todos.length);
  
  return todos.filter(s => {
    if (!s.category) return false;
    // Comparamos en minúsculas para que no falle jamás por un tema de tipeo
    return s.category.toLowerCase().trim() === category.toLowerCase().trim();
  });
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