import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ROUTER } from "./router.main";
import { ItemNavigationProps, Layout } from '@placecare/pages/layout'
import { match } from 'ts-pattern'
import { useOidc, useOidcAccessToken } from "@axa-fr/react-oidc";
import { useSelector } from "react-redux";
import { getUserState } from "@placecare/domains/user";
import { useEffect } from "react";

const navigation: ItemNavigationProps[] = [
  {
    name: 'Home',
    path: '/home',
    icon: 'ic:round-home'
  },
  {
    name: 'Patients',
    path: '/patients/overview',
    icon: 'solar:users-group-rounded-bold-duotone'
  }
]

export default function App() {
  const { pathname } = useLocation()

  const { login, isAuthenticated, logout } = useOidc()
  const { accessToken, accessTokenPayload } = useOidcAccessToken()

  const { isLoading, token, user, payload } = useSelector(getUserState)

  useEffect(() => {

    if (!isAuthenticated) {
      login('/patients')
    }
  }, [isAuthenticated, login])

  return (
    <div>
      <Routes>
        {ROUTER.map((route) => 
          match(route)
          .when(
            (r) => r.layout,
            (r) => (
              <Route 
                key={r.path}
                path={r.path}
                element={
                  <Layout navigation={navigation}>
                    {r.component}
                  </Layout>
                }
              />
            )
          )
          .otherwise((r) => (
            <Route 
              key={r.path}
              path={r.path}
              element={r.component}
            />
          ))
        )}
        <Route path="*" element={<Navigate to='/patients' />} />
      </Routes>
    </div>
  )
}