
 'use client';
 import { AuthProvider } from '@/Context/authContext';
const AuthWrapper = ({children})=>{
  return (
    <AuthProvider>
        {
            children
        }
    </AuthProvider>
  );
}

export default AuthWrapper
