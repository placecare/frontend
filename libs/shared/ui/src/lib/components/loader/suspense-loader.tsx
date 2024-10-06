import { PropsWithChildren, ReactElement } from 'react'
import { LoaderSpinner } from '../loader-spinner/loader-spinner'

export interface SuspenseLoaderProps {
  data?: unknown
  isLoading?: boolean
  loaderComponent?: ReactElement
  emptyComponent?: ReactElement
}

export function SuspenseLoader(props: PropsWithChildren<SuspenseLoaderProps>): ReactElement {
  if (props.isLoading) {
    return (
      <div>
        {props.loaderComponent ?? <LoaderSpinner />}
      </div>
    )
  }

  if (Array.isArray(props.data) && !props.data.length) {
    return (
      <div>
        {props.emptyComponent}
      </div>
    )
  }

  return (
    <div>
      {props.children}
    </div>
  )
}
