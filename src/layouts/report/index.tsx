import { Outlet } from 'react-router-dom'

type Props = {}

const Layout = (_props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default Layout
