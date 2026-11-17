import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/clubhub/auth';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/login')({head:()=>pageHead('Sign In','Sign in to your ClubHub campus workspace.'),component:()=> <AuthPage />});
