
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Router.jsx'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
     <RouterProvider router={router}></RouterProvider>
     <ToastContainer position='top-right' reverseOrder={false} />
   </AuthProvider>
    </QueryClientProvider> 
  
)
