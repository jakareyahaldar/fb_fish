import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/react'
import { loading } from '../lib/Alert'

export function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return loading()
  loading(false)

  if (!isSignedIn) return <Navigate to="/admin-login" replace />

  return <Outlet />
}