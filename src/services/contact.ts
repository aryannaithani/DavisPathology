import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { ContactEnquiry } from '@/types';

let demoEnquiries: ContactEnquiry[] = [
  {
    id: 'demo-enq-1',
    name: 'Dr. Ramesh Chandra (Demo)',
    email: 'dr.ramesh@example.com',
    phone: '9876500010',
    subject: 'Home collection enquiry for elderly patient',
    message: 'Can you provide home collection service near Dayalbagh area for senior citizen fasting tests?',
    is_read: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'demo-enq-2',
    name: 'Anita Verma (Demo)',
    email: 'anita.v@example.com',
    phone: '9876500011',
    subject: 'Complete health checkup package details',
    message: 'Looking for a complete health checkup package for my parents. Please share details on report turnaround time.',
    is_read: true,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  }
];

export async function submitContactEnquiry(
  data: Omit<ContactEnquiry, 'id' | 'is_read' | 'created_at'>
): Promise<ContactEnquiry> {
  if (!isSupabaseConfigured) {
    const newEnquiry: ContactEnquiry = {
      id: `demo-enq-${Date.now()}`,
      ...data,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    demoEnquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  const { data: enquiry, error } = await supabase
    .from('contact_enquiries')
    .insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      is_read: false,
    })
    .select()
    .single();

  if (error) throw error;
  return enquiry as ContactEnquiry;
}

export async function getContactEnquiries(): Promise<ContactEnquiry[]> {
  if (!isSupabaseConfigured) {
    return [...demoEnquiries];
  }

  const { data, error } = await supabase
    .from('contact_enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ContactEnquiry[];
}

export async function markEnquiryRead(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const item = demoEnquiries.find(e => e.id === id);
    if (item) item.is_read = true;
    return;
  }

  const { error } = await supabase
    .from('contact_enquiries')
    .update({ is_read: true })
    .eq('id', id);

  if (error) throw error;
}
