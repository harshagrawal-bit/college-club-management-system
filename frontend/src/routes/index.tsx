import {createFileRoute} from '@tanstack/react-router';
import {Dashboard} from '@/components/clubhub/dashboard';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/')({head:()=>pageHead('Campus Cockpit','A connected campus workspace for students, clubs, memberships and events.'),component:()=> <Dashboard />});
