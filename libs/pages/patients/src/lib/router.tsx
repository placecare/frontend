import { Route } from '@placecare/routes'
import PageGeneralPatients from './feature/page-general-patients'

export const ROUTER_PATIENTS: Route[] = [
  {
    path: '/',
    component: <PageGeneralPatients />
  }
]