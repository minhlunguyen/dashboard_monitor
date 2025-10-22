import Layout from '@/layouts/report'
import ReportsPage from '@/pages/reports'
import { RouteObject, useRoutes } from 'react-router-dom'

type Props = {}

const Router = (_props: Props) => {
  let routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [{ index: true, element: <ReportsPage /> }]
    }
  ]
  let element = useRoutes(routes)
  return element
}

export default Router
