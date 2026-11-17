import {createFileRoute} from '@tanstack/react-router';
import {Triggers} from '@/components/clubhub/workbenches';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/triggers')({head:()=>pageHead('8 Triggers HUD','Test the eight campus data integrity rules and inspect the audit log.'),component:()=> <Triggers />});
