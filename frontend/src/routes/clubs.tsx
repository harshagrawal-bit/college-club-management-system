import {createFileRoute} from '@tanstack/react-router';
import {Clubs} from '@/components/clubhub/directories';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/clubs')({head:()=>pageHead('Campus Clubs','Explore chartered campus clubs, budgets and rosters.'),component:()=> <Clubs />});
