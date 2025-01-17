import { ReactNode, useEffect, useState } from 'react'
import { sortByKey } from '@placecare/utils'
import { MenuDivider } from '@szhsin/react-menu'
import { InputSearch } from '../inputs'
import { MenuItem, type MenuItemProps } from './menu-item'

export interface MenuGroupProps {
  menu: {
    items: MenuItemProps[];
    label?: string;
    title?: string;
    sortAlphabetically?: boolean;
    button?: {
      label?: string | ReactNode;
      onClick?: () => void;
    };
    search?: boolean;
  };
  isLast: boolean;
  paddingMenuY?: number;
  paddingMenuX?: number;
  style?: object;
  isFilter?: boolean;
  dontOrderAlphabetically?: boolean;
}

export function MenuGroup(props: MenuGroupProps) {
  const {
    menu = { items: [] },
    isLast = true,
    paddingMenuX = 12,
    paddingMenuY = 12,
    style = {},
    isFilter,
  } = props

  const [currentItems, setCurrentItems] = useState(menu.items)
  const [filteredItems, setFilteredItems] = useState(menu.items)
  const [currentSearch, setCurrentSearch] = useState('')

  useEffect(() => {
    setCurrentItems(menu.items)
  }, [menu.items])

  useEffect(() => {
    const filtered = currentItems.filter((item) => {
      if (!item.name) return true
      return item.name?.toUpperCase().includes(currentSearch.toUpperCase())
    })

    setFilteredItems(
      menu.sortAlphabetically ? sortByKey(filtered, 'name') : filtered
    )
  }, [currentSearch, currentItems, menu.sortAlphabetically])

  const filteredData = (value: string) => {
    setCurrentSearch(value)
  }

  const paddingStyle = {
    paddingTop: paddingMenuY,
    paddingBottom: paddingMenuY,
    paddingLeft: paddingMenuX,
    paddingRight: paddingMenuX,
  }

  const headPaddingStyle = {
    paddingTop: paddingMenuY,
    paddingLeft: paddingMenuX,
    paddingRight: paddingMenuX,
  }

  return (
    <div style={style}>
      {!isFilter && menu?.title && (
        <div
          className="flex justify-between items-center"
          style={headPaddingStyle}
        >
          {menu?.title && (
            <p data-testid="title" className="text-sm text-neutral-350">
              {menu?.title}
            </p>
          )}
          {menu?.button && (
            <span
              className="link text-sm text-brand-500 cursor-pointer font-medium inline-block"
              onClick={menu?.button.onClick}
            >
              {menu?.button.label}
            </span>
          )}
        </div>
      )}

      {menu.search && (
        <div className="px-4 pt-2">
          <InputSearch
            autofocus
            placeholder="Search"
            emptyContent={<span>Aucun résultat</span>}
            isEmpty={filteredItems.length === 0}
            onChange={(value: string) => {
              filteredData(value)
            }}
          />
        </div>
      )}

      {isFilter && menu.title && filteredItems.length !== 0 && (
        <p className="text-sm text-neutral-350 ml-2" style={headPaddingStyle}>
          {menu.title}
        </p>
      )}

      {filteredItems.length > 0 && (
        <div style={paddingStyle} className="overflow-y-auto max-h-80">
          {filteredItems.map((item, index) => {
            if (Object.keys(item).length === 0) {
              return null
            } else {
              return <MenuItem key={index} {...item} />
            }
          })}
        </div>
      )}

      {!isFilter && !isLast && filteredItems.length > 0 && (
        <MenuDivider className="bg-neutral-200 dark:bg-neutral-600 m-0 mx-3" />
      )}
    </div>
  )
}
