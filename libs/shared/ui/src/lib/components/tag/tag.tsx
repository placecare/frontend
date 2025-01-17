import { classNames } from '@placecare/utils'
import { PropsWithChildren } from 'react'

export enum TagSize {
  NORMAL = 'normal',
  BIG = 'big',
  SMALL = 'small',
}

export interface TagProps {
  className?: string;
  size?: TagSize;
  dataTestId?: string;
  fontWeight?: string;
}

export function Tag({
  children,
  className = '',
  size = TagSize.NORMAL,
  fontWeight = 'font-bold',
  dataTestId = 'tag',
}: PropsWithChildren<TagProps>) {
  const normalClassName = size === TagSize.NORMAL ? 'h-7 px-2' : ''
  const bigClassName = size === TagSize.BIG ? 'h-8 px-3' : ''
  const smallClassName = size === TagSize.SMALL ? 'h-5 px-1.5' : ''

  return (
    <span
      data-testid={dataTestId}
      className={classNames(
        'rounded text-xs items-center inline-flex',
        fontWeight,
        normalClassName,
        bigClassName,
        smallClassName,
        className
      )}
    >
      {children}
    </span>
  )
}
