import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/clubhub/auth';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/signup')({head:()=>pageHead('Create Account','Create a ClubHub campus account and profile.'),component:()=> <AuthPage signup/>});
