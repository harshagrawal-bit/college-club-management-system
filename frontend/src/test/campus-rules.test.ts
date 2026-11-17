import {describe,it,expect} from 'vitest';
import {mockData} from '@/data/mockData';
import {canWrite,validate,validateRemoval} from '@/services/rules';
describe('Campus business rules',()=>{
 it('ships 75 students, 5 clubs, 12 events, and 92 memberships',()=>{expect(mockData.students).toHaveLength(75);expect(mockData.clubs).toHaveLength(5);expect(mockData.events).toHaveLength(12);expect(mockData.memberships).toHaveLength(92);});
 it('student members cannot edit campus records',()=>expect(canWrite('Student Member','CSI')).toBe(false));
 it('presidents are scoped to CSI in the demo',()=>{expect(canWrite('Club President','CSI')).toBe(true);expect(canWrite('Club President','EDC')).toBe(false);});
 it('guest demo has full write access',()=>expect(canWrite('Guest (Full Demo)','EDC')).toBe(true));
 it('rejects duplicate enrollment',()=>expect(()=>validate(mockData,'memberships',{...mockData.memberships[0],id:'new'})).toThrow('Duplicate membership'));
 it('rejects a second active president',()=>expect(()=>validate(mockData,'memberships',{id:'new',studentId:'other',clubId:'CSI',role:'President',status:'Active'})).toThrow('one active president'));
 it('blocks event budgets above the cap',()=>expect(()=>validate(mockData,'events',{id:'new',clubId:'CSI',budget:90001,date:'2099-01-01',status:'Planned'})).toThrow('budget cap'));
 it('accepts the exact budget cap',()=>expect(()=>validate(mockData,'events',{id:'new',clubId:'CSI',budget:90000,date:'2099-01-01',status:'Planned'})).not.toThrow());
 it('rejects past planned events',()=>expect(()=>validate(mockData,'events',{id:'new',clubId:'CSI',budget:0,date:'2000-01-01',status:'Planned'})).toThrow('past'));
 it('blocks registrations by non-members',()=>expect(()=>validate(mockData,'registrations',{id:'new',studentId:'unknown',eventId:'EV001'})).toThrow('active host-club'));
 it('blocks membership removal during elections',()=>{const records=structuredClone(mockData);const club=records.clubs[0];if(club)club['election']=true;expect(()=>validateRemoval(records,'memberships',{id:'new',clubId:'CSI'})).toThrow('elections');});
});
