import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexProviderWithAuth } from 'convex/react'
import { ConvexReactClient } from 'convex/react'
import { useSupabaseAuth } from './hooks/useSupabaseAuth.ts'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!)

function Root() {
    const auth = useSupabaseAuth();

    return (
        <ConvexProviderWithAuth client={convex} useAuth={() => auth}>
            <App />
        </ConvexProviderWithAuth>
    );
}

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
       <Root/>
    </React.StrictMode>

)
