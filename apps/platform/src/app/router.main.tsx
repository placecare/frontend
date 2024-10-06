import { ReactElement } from "react"
import { PagePatients } from '@placecare/pages/patients'
interface RouterProps {
  path: string
  component: ReactElement
  protected: boolean
  layout?: boolean
}

export const ROUTER: RouterProps[] = [
  {
    protected: true,
    path: '/patients/*',
    component: <PagePatients />,
    layout: true,
  }
]