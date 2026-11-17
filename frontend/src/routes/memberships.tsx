import {createFileRoute} from '@tanstack/react-router';
import {Directory} from '@/components/clubhub/directories';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/memberships')({head:()=>pageHead('Memberships','Manage campus memberships and club leadership.'),component:()=> <Directory kind="memberships"/>});
