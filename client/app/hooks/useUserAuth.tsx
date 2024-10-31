import { useSelector } from 'react-redux';

export const useUserAuth = () => {
    const { user } = useSelector((state: any) => state.auth);

    return !!user; // This will return true if user exists, false otherwise
};
