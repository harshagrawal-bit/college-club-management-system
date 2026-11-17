import {createFileRoute} from '@tanstack/react-router';
import {Directory} from '@/components/clubhub/directories';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/students')({head:()=>pageHead('Students Directory','Explore and manage the VIT student directory.'),component:()=> <Directory kind="students"/>});
