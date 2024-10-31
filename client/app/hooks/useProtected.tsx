import {redirect} from 'next/navigation'
import {useUserAuth} from './useUserAuth'

interface ProtectedProps{
    children:React.ReactNode
}

export default function Protected({children}:ProtectedProps){
    const isAuthenticated=useUserAuth()

    return isAuthenticated?children : redirect('/')
}