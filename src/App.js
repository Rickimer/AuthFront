import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import TodoList from './features/todos/TodoList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Rick Site')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />        
        {/* Protected Routes */}

        <Route element={<PersistLogin />}> 
                <Route path="dash" element={<DashLayout />}>          
                <Route index element={<Welcome />} />
                <Route element={<RequireAuth allowedRoles={['ConfirmedEmail']} />}>
                
                <Route element={<RequireAuth allowedRoles={['Admin']} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                                
                <Route path="todos">
                    <Route index element={<TodoList />} />
                </Route>
                
                </Route>

              </Route>{/* End Dash */}                      
              </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
