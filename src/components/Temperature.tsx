'use client'
import { useState, useEffect } from 'react';

const Temperature = () => {
    const [temperature, setTemperature] = useState(null);
    const [locationError, setLocationError] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchTemperature(latitude, longitude);
                },
                (error) => {
                    setLocationError('No se pudo obtener la ubicación.');
                    console.error(error);
                }
            );
        } else {
            setLocationError('La geolocalización no es compatible.');
        }
    }, []);

    const fetchTemperature = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const data = await response.json();
            setTemperature(data.current_weather.temperature);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {locationError ? (
                <p className="text-red-500">{locationError}</p>
            ) : (
                <p className='text-[#CCCCCC] font-semibold w text-[27px]'>{temperature !== null ? `${temperature}°` : ''}</p>
            )}
        </div>
    );
};

export default Temperature;
