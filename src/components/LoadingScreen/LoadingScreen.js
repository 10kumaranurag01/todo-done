'use client'

import { useLoading } from '@/lib/context/LoadingContext';

const LoadingScreen = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className='bg-primary/30 fixed h-screen left-0 top-0 w-screen z-50'>
            <div className="animate-waterfall_025 bg-secondary h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[10px]"/>
            <div className="animate-waterfall_05 bg-secondary h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 ml-[15px]"/>
            <div className="animate-waterfall_075 bg-secondary h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[35px]"/>
            <div className="animate-waterfall_1 bg-secondary h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 ml-[40px]"/>
            <div className="animate-waterfall_125 bg-secondary h-5 left-2/4 -mt-[10px] opacity-0 absolute top-2/4 w-5 -ml-[60px]"/>
        </div>
    );
};

export default LoadingScreen;
