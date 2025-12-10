import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../Loader/Loading';
import { ClubCard } from './ClubCard';

const Clubs = () => {
  const axiosSecure = useAxiosSecure();

const {data: clubs = [], isLoading} = useQuery({
    queryKey: ['clubs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/clubs/approved');
      return res.data;
    }
  });

  console.log(clubs);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className='relative z-10 mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {clubs.map((club) => (
        <ClubCard key={club._id} club={club}></ClubCard>
      ))}   

      
    </div>
  );
};

export default Clubs;