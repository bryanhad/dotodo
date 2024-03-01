import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'
import './globals.css'

import { MainPage } from './pages/index.tsx'
import { SecondPage } from './pages/SecondPage.tsx'
import { RootLayout } from './layout/index.tsx'

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<RootLayout />}>
            <Route index element={<MainPage/>}/>
            <Route path='second-page' element={<SecondPage/>}/>
        </Route>,
    ])
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
