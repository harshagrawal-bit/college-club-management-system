import {createFileRoute} from '@tanstack/react-router';
import {EventDetail} from '@/components/clubhub/event-detail';
import {pageHead} from '@/services/meta';
export const Route=createFileRoute('/events_/$id/feedback')({head:()=>pageHead('Event Feedback','Campus event feedback and student participation.'),component:Page});
function Page(){const {id}=Route.useParams();return <EventDetail id={id} feedback/>;}
