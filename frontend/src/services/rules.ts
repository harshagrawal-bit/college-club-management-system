import type { Records, Row } from '@/data/mockData';
export type Role='Guest (Full Demo)'|'Super Admin'|'Club President'|'Faculty Coordinator'|'Student Member';
export const roles:Role[]=['Guest (Full Demo)','Super Admin','Club President','Faculty Coordinator','Student Member'];
export function canWrite(role:Role,club?:string){return role==='Guest (Full Demo)'||role==='Super Admin'||((role==='Club President'||role==='Faculty Coordinator')&&club==='CSI');}
export function detectRole(email:string):Role{const e=email.toLowerCase();return e.endsWith('@admin.vit.edu')?'Super Admin':e.endsWith('@csi.vit.edu')?'Club President':e.endsWith('@faculty.vit.edu')?'Faculty Coordinator':'Student Member';}
export function validate(records:Records,kind:keyof Records,row:Row){
 if(kind==='memberships'){
  if(records.memberships.some(m=>m.id!==row.id&&m['studentId']===row['studentId']&&m['clubId']===row['clubId']))throw Error('Duplicate membership: this student is already enrolled in the club.');
  if(row['role']==='President'&&row['status']==='Active'&&records.memberships.some(m=>m.id!==row.id&&m['clubId']===row['clubId']&&m['role']==='President'&&m['status']==='Active'))throw Error('Only one active president is allowed per club.');
 }
 if(kind==='events'){
  const club=records.clubs.find(c=>c.id===row['clubId']);
  if(Number(row['budget'])>Number(club?.['budget']??0))throw Error('Event budget exceeds the club budget cap.');
  if(row['status']==='Planned'&&String(row['date'])<new Date().toISOString().slice(0,10))throw Error('Planned events cannot be scheduled in the past.');
 }
 if(kind==='registrations'&&!records.memberships.some(m=>m['studentId']===row['studentId']&&m['clubId']===records.events.find(e=>e.id===row['eventId'])?.['clubId']&&m['status']==='Active'))throw Error('Only active host-club members can register.');
}
export function validateRemoval(records:Records,kind:keyof Records,row:Row){if(kind==='memberships'&&records.clubs.find(c=>c.id===row['clubId'])?.['election'])throw Error('Membership removal is locked during active elections.');}
