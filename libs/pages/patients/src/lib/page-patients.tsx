import { Route, Routes } from 'react-router-dom'
import { ROUTER_PATIENTS } from './router'

export function PagePatients() {
  return (
    <Routes>
      {ROUTER_PATIENTS.map((route) => (
        <Route 
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))}
    </Routes>
  )
}