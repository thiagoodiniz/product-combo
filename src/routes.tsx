import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, matchPath } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './pages/Header';
import NewCombo from './pages/NewCombo';
import { IProductComboData } from './services/ProductCombo/types';
import { ProductComboService } from './services/ProductCombo';

export enum ERoutes {
    LOGIN = '/login',
    HOME = '/home',
    NEW_COMBO = '/new-combo',
}

const Routes: React.FC = () => {
    const { pathname } = useLocation();

    const [combos, setCombos] = useState<IProductComboData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCombos = () => {
            const comboSvc = new ProductComboService();
            setLoading(true);
            setError(false);

            comboSvc.loadCombos()
                .then(combos => {
                    setTimeout(() => {
                        setCombos(combos);
                        setLoading(false);
                    }, 2500);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setError(true);
                });
        }

        if(!matchPath(pathname , ERoutes.LOGIN) && !loading && !error && combos.length === 0) {
            fetchCombos();
        }
    });

    return (
        <>
            {   !matchPath(pathname , ERoutes.LOGIN) &&
                <Header />
            }

            <Switch>
                <Route path={ERoutes.LOGIN} component={Login} />

                <Route path={ERoutes.HOME} render={() => 
                    <Home 
                        combos={combos}
                        loading={loading}
                        error={error}
                    />} 
                />
                
                <Route path={ERoutes.NEW_COMBO} component={NewCombo} />

                <Route path="/">
                    <Redirect to={ERoutes.LOGIN} />
                </Route>

            </Switch>
        </>
    );
}

export default Routes;