import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import MemberDashboard from './components/pages/MemberDashboard.jsx'
import TrainerDashboard from './components/pages/TrainerDashboard.jsx'
import SessionDashboard from './components/pages/SessionDashboard.jsx'
import RoomDashboard from './components/pages/RoomDashboard.jsx'
const router = createBrowserRouter([
  {
    path: "/UTS_YafiAllamJunaedi_FE/",
    element: <LoginPage />
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/summary",
    element: <Dashboard />,
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/room",
    element: <RoomDashboard />
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/member",
    element: <MemberDashboard />,
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/trainer",
    element: <TrainerDashboard />
  },
  {
    path: "/UTS_YafiAllamJunaedi_FE/session",
    element: <SessionDashboard />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
