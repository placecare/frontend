import { createElement, ReactNode } from 'react'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export * from './lib/tw-merge'
export * from './lib/sort-by-key'
export * from './lib/uppercase-first-letter'

type ReactElementProps = {
  tag: (...props: unknown[]) => JSX.Element;
  children?: ReactNode | JSX.Element;
  [props: string]: unknown;
}

export function ReactElement({ tag, children, ...props}: ReactElementProps): JSX.Element {
  return createElement(tag, props, children)
}

export function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
