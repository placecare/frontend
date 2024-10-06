import { useLocation, Link } from 'react-router-dom'
import { MenuAccountFeature } from '../feature/menu-account-feature'
import { ItemNavigation } from './item-navigation'

export interface NavigationProps {
  navigation: any[]
}
export function Navigation({ navigation }: NavigationProps) {
  const { pathname } = useLocation()

  const matchHomeRoute = pathname.includes('/home')

  return (
    <div className="w-16 h-screen dark:bg-neutral-650 bg-white flex flex-col">
      <Link
        to={'/home'}
        className="flex w-16 h-[60px] items-center justify-center p-3 border-b z-10 dark:border-neutral-500 border-neutral-200"
      >
        <div className='rounded-md overflow-hidden'>
          <img src="/logo.png" className="" alt="dad" />
        </div>

      </Link>

      <div className="flex flex-col justify-between px-2.5 py-5 flex-grow">
        <div className="flex flex-col gap-3">
          {navigation.map((item, index) => (
            <ItemNavigation {...item} key={index} />
          ))}
          {/*<ItemNavigation path={"/home"} icon={'heroicons-solid:home'} name={"Accueil"} />*/}

        </div>
      </div>

      <div className="flex w-16 h-16 mb-5 items-center justify-center border-t dark:border-neutral-500 border-neutral-200">
        <MenuAccountFeature />
      </div>

    </div>
  )
}
