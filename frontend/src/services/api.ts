import { supabase } from '@/integrations/supabase/client';
import { mockData, type Records } from '@/data/mockData';

export const api = {
  async load(): Promise<Records> {
    try {
      const res = await fetch('/api/campus-data');
      if (res.ok) {
        const json = await res.json();
        if (json && json.students && json.students.length > 0) {
          return json as Records;
        }
      }
    } catch {
      // Fallback seamlessly to local state/mockData
    }
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return structuredClone(mockData);
    const { data, error } = await supabase.from('campus_workspaces').select('records').eq('user_id', user.user.id).single();
    if (error) return structuredClone(mockData);
    return (data?.records as unknown as Records) || structuredClone(mockData);
  },
  async save(records: Records) {
    try {
      const res = await fetch('/api/campus-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(records)
      });
      if (res.ok) return;
    } catch {
      // Continue to supabase if available
    }
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    const { error } = await supabase.from('campus_workspaces').update({ records: JSON.parse(JSON.stringify(records)) }).eq('user_id', data.user.id);
    if (error) throw error;
  },
  async personas() {
    try {
      const res = await fetch('/api/auth/status');
      if (res.ok) {
        const json = await res.json();
        if (json.role) {
          return [{ role: json.role, club_id: json.club_id || null }];
        }
      }
    } catch {
      // fallback
    }
    const { data, error } = await supabase.from('user_roles').select('role,club_id');
    if (error) return [];
    return data;
  },
};
