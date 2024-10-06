import { OidcConfiguration, OidcProvider } from '@axa-fr/react-oidc'
import { createRoot } from 'react-dom/client'
import { setupStore } from '@placecare/store'
import { BrowserRouter } from 'react-router-dom'
import { ReactNode, StrictMode } from 'react'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Provider } from 'react-redux'
import App from './app/app'
import { ModalProvider } from '@placecare/ui'

const container = document.getElementById('root') || document.createElement('div') as HTMLElement
const root = createRoot(container)

const store = setupStore()

const keycloakUrl = import.meta.env.VITE_PRODUCTION === 'true'
 ? `https://auth.${window.location.hostname}`
 : import.meta.env.VITE_KEYCLOAK

const oidcConfig: OidcConfiguration = {
  client_id: 'frontend',
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent_callback',
  scope: 'openid profile',
  authority: `${keycloakUrl}/realms/placecare`,
  service_worker_only: false,
  demonstrating_proof_of_possession: false
}

const render: ReactNode = (
  <StrictMode>
    <OidcProvider configuration={oidcConfig}>
      <Provider store={store}>
        <BrowserRouter>
          <TooltipProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </TooltipProvider>
        </BrowserRouter>
      </Provider>
    </OidcProvider>
  </StrictMode>
)

root.render(render)