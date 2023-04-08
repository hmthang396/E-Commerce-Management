import React, { useEffect } from 'react'
import { Fragment } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { AccountState } from '../context/Account'
import LayoutRoutes from './LayoutRoutes'
import Login from './Login'
import Logout from './Logout'

const App = () => {
  const { account } = AccountState();
  return (
    <Fragment>
      <Routes>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/auth/login`}
          element={<Login />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/auth/logout`}
          element={<Logout />}
        />
        {account &&
          <Route path={`/*`} element={<LayoutRoutes />} />
        }
        {!account &&
          <Route path={`/*`} element={<Login />} />
        }
      </Routes>
    </Fragment>
  )
}

export default App