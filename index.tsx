import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout as LayoutAntd, Result } from 'antd'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { selectAuth } from '@/store/auth/slice'
import { ContainerContent } from './styled'
import { getUserProfileThunk } from '@/store/auth/actionThunk'
import Loading from '@/components/Loading'
import Button from '@/components/Button'
import { ROUTER } from '@/constants/common'

const Layout = () => {
  const { isAuthenticated, user, role_path } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const location = useLocation()
  useEffect(() => {
    if (isAuthenticated === false && user == null) {
      navigate('/login')
    }
    if (!user) {
      dispatch(getUserProfileThunk())
    }
  }, [isAuthenticated, user, location.pathname])
  const isPathAllowedForRole = useMemo(() => {
    return role_path?.some((rolePath) => {
      return location.pathname === rolePath || location.pathname.startsWith(rolePath.replace('/:id', ''))
    })
  }, [location.pathname, role_path])
  return (
    <>
      {isAuthenticated && user ? (
        <>
          <LayoutAntd>
            {isPathAllowedForRole ? (
              <>
                <Header />
                <LayoutAntd>
                  <Sidebar />
                  <ContainerContent>
                    <LayoutAntd.Content>
                      <Outlet />
                    </LayoutAntd.Content>
                  </ContainerContent>
                </LayoutAntd>
              </>
            ) : (
              <>
                <Result
                  status='403'
                  title='403'
                  style={{ height: '100vh', background: '#F4F7FF' }}
                  subTitle='申し訳ありませんが、このページにアクセスする権限がありません。'
                  extra={
                    <Button
                      type='primary'
                      onClick={() => {
                        navigate(ROUTER.Home)
                      }}
                      style={{ width: 160 }}
                    >
                      ホームに戻る
                    </Button>
                  }
                />
              </>
            )}
          </LayoutAntd>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Layout
