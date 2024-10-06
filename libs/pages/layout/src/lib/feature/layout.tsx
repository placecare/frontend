import { PropsWithChildren } from 'react'
import LayoutPage from '../ui/layout-page'

export interface LayoutProps {
  topbar?: boolean
  navigation: any[]
}

export function Layout({ children, navigation }: PropsWithChildren<LayoutProps>) {
  return (
    <LayoutPage navigation={navigation}>
      {children}
    </LayoutPage>
  )
}
