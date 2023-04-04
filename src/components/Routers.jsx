import { Route } from 'react-router-dom';
import Customer from '../pages/Customer';
import Dashboard from '../pages/Dashboard';

const pendingDevelop = ['/products', '/orders', '/analytics', '/categories', '/discount', '/inventory', '/settings'];

const Routers = () => {
    return (
        <>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/customers' element={<Customer/>} />
            {
                pendingDevelop.map(route => (
                    <Route
                        path={route}
                        element={
                            <main style={{ padding: "1rem" }}>
                            <p>Pending development ... </p>
                            </main>
                        }
                    />
                ))
            }
        </>
    )
}

export default Routers
