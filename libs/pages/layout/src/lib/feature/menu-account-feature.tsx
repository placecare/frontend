import { useSelector } from 'react-redux'
import { getUserState } from '@placecare/domains/user'
import { useOidc, useOidcAccessToken } from '@axa-fr/react-oidc'
import { LoaderSpinner } from '@placecare/ui'
import { MenuAccount } from '../ui/menu-account'

export function MenuAccountFeature () {
  const user = useSelector(getUserState).user
  const { accessTokenPayload } = useOidcAccessToken()

  const { logout } = useOidc()

  async function handleLogout() {
    await logout('/home')
  }

  return (
    <div>
      {user && accessTokenPayload ? (
        <MenuAccount
          user={{
            username: accessTokenPayload.name,
            email: accessTokenPayload.email,
            picture: user.avatar_url,
          }}
          handleLogout={handleLogout}
        />
      ) : (
        <LoaderSpinner />
      )}
    </div>
  )
}
