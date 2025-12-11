import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loader/Loading';
import EventCard from './EventCard';
// import useAxiosSecure from '../../hooks/useAxiosSecure';

const Events = () => {

    const axiosSecure = useAxiosSecure();

    const {data: events = [],isLoading} = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosSecure.get('/events');
            return res.data;
        },
    });

    console.log("Events Data:", events);

    if(isLoading){
        return <Loading></Loading>;
    }
    return (
        <div className='z-20 mt-20 max-w-7xl mx-auto  text-white '>
           {
            events.map(event => <EventCard key={event._id} event={event}></EventCard>)
           }
        </div>
    );
};

export default Events;