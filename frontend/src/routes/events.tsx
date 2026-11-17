import {createFileRoute} from '@tanstack/react-router';
import {Directory} from '@/components/clubhub/directories';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/events')({head:()=>pageHead('Campus Events','Plan events, track attendance, budgets and reviews.'),component:()=> <Directory kind="events"/>});
