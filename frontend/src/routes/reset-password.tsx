import {createFileRoute} from '@tanstack/react-router';
import {AuthPage} from '@/components/clubhub/auth';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/reset-password')({head:()=>pageHead('Reset Password','Securely reset your ClubHub password.'),component:()=> <AuthPage reset/>});
