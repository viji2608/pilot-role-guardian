import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DemoItem {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useDemoItems = () => {
  const [items, setItems] = useState<DemoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('demo_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching demo items:', error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    };

    fetchItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('demo-items-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'demo_items'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setItems(prev => [...prev, payload.new as DemoItem]);
          } else if (payload.eventType === 'UPDATE') {
            setItems(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as DemoItem : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setItems(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const createItem = async (name: string, description: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('demo_items')
      .insert([{ name, description, created_by: user?.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateItem = async (id: string, updates: Partial<DemoItem>) => {
    const { data, error } = await supabase
      .from('demo_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('demo_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem
  };
};
