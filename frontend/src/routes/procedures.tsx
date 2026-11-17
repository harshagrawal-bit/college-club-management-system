import {createFileRoute} from '@tanstack/react-router';
import {Procedures} from '@/components/clubhub/workbenches';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/procedures')({head:()=>pageHead('8 Cursors Workbench','Execute eight campus reporting procedures.'),component:()=> <Procedures />});
