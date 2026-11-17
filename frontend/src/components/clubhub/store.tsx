import { createContext,useContext,useState,useEffect,type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { mockData,type Records,type Row } from '@/data/mockData';
import { api } from '@/services/api';
import { canWrite,validate,validateRemoval,type Role } from '@/services/rules';
const Context=createContext<{records:Records;role:Role;demo:boolean;email:string;setRole:(r:Role)=>void;save:(kind:keyof Records,row:Row)=>Promise<void>;remove:(kind:keyof Records,row:Row)=>Promise<void>;audit:(name:string,status:string,details:string)=>void;logout:()=>Promise<void>}|null>(null);
export function HubProvider({children}:{children:ReactNode}){
 const [records,setRecords]=useState<Records>(structuredClone(mockData));const [role,changeRole]=useState<Role>('Guest (Full Demo)');const [demo,setDemo]=useState(true);const [email,setEmail]=useState('');const router=useRouter();
 useEffect(()=>{let alive=true;async function refresh(){const {data}=await supabase.auth.getUser();if(!alive)return;if(data.user){setEmail(data.user['email']??'');setDemo(false);try{const personas=await api.personas();changeRole(personas?.some(p=>p['role']==='admin')?'Super Admin':personas?.some(p=>p['role']==='president')?'Club President':personas?.some(p=>p['role']==='faculty')?'Faculty Coordinator':'Student Member');setRecords(await api.load());}catch(e){toast.error(String(e));}}else{setEmail('');setDemo(true);changeRole('Guest (Full Demo)');setRecords(structuredClone(mockData));}}
 void refresh();const {data}=supabase.auth.onAuthStateChange(event=>{if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event))return;void router.invalidate();if(event!=='SIGNED_OUT')void router.options.context.queryClient.invalidateQueries();setTimeout(()=>void refresh(),0);});return()=>{alive=false;data.subscription.unsubscribe();};},[router]);
 const setRole=(r:Role)=>{if(!demo){toast.error('Demo roles are only available in the isolated demo workspace.');return;}changeRole(r);toast.success(`Switched to ${r}`);};
 const audit=(name:string,status:string,details:string)=>setRecords(r=>({...r,audit:[{id:crypto.randomUUID(),time:new Date().toLocaleTimeString(),name,entity:'Campus',status,details},...r.audit]}));
 async function persist(next:Records){if(!demo)await api.save(next);setRecords(next);}
 async function save(kind:keyof Records,row:Row){if(!canWrite(role,String(row['clubId']??'')))throw Error('This role has no write access to this record.');validate(records,kind,row);const exists=records[kind].some(r=>r.id===row.id);await persist({...records,[kind]:exists?records[kind].map(r=>r.id===row.id?row:r):[row,...records[kind]]});toast.success(exists?'Changes saved':'Record added');}
 async function remove(kind:keyof Records,row:Row){if(!canWrite(role,String(row['clubId']??'')))throw Error('This role has no write access.');validateRemoval(records,kind,row);const next={...records,[kind]:records[kind].filter(r=>r.id!==row.id)};if(kind==='memberships')next.audit=[{id:crypto.randomUUID(),time:new Date().toLocaleTimeString(),name:'Membership Deletion Audit',entity:row.id,status:'SUCCESS',details:'Deleted membership recorded.'},...records.audit];await persist(next);toast.success('Record deleted');}
 async function logout(){await router.options.context.queryClient.cancelQueries();router.options.context.queryClient.clear();await supabase.auth.signOut();await router.navigate({to:'/login',replace:true});}
 return <Context.Provider value={{records,role,demo,email,setRole,save,remove,audit,logout}}>{children}</Context.Provider>;
}
export function useHub(){const value=useContext(Context);if(!value)throw Error('Campus workspace unavailable');return value;}
