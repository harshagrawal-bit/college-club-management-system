import {createFileRoute} from '@tanstack/react-router';
import {EventDetail} from '@/components/clubhub/event-detail';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/events_/$id/registrations')({head:()=>pageHead('Event Registrations','Campus event registrations and student participation.'),component:Page});
function Page(){const {id}=Route.useParams();return <EventDetail id={id} />;}
