import { Icon, Tooltip } from '@placecare/ui'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '@placecare/utils'

export interface ItemNavigationProps {
  path: string
  icon: string
  name: string
}

export function ItemNavigation({ path, icon, name }: ItemNavigationProps) {
  const { pathname } = useLocation()

  const matchRoute = pathname.includes(path)
  return (
    <Tooltip content={name} side="right">
      <Link
        to={path}
        className={classNames(
          'flex rounded-md p-3 mx-auto dark:hover:text-gray-100 hover:bg-neutral-200 dark:hover:bg-indigo-500 hover:text-brand-500 ease-in-out duration-200 dark:text-gray-400 ',
          matchRoute
            ? 'bg-neutral-200 !text-brand-500 dark:bg-indigo-500'
            : 'text-gray-400'
        )}
      >
        <Icon className='w-5' name={icon} />
      </Link>
    </Tooltip>
  )
}
