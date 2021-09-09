// Modules or lib content
import { FC, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import light from './styles/light';
import dark from './styles/dark';
import usePersistedState from './utils/usePersistedState';
import { DefaultTheme } from 'styled-components';
// Components
import Reset from './styles/reset';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
// Context
import userContext, { UserData } from './context/UserContext';

const App: FC = () => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);
    const [userData, setUserData] = useState<UserData | null>(null);
    const history = useHistory();

    const toggleTheme = () => {
        setTheme(theme.title === 'light' ? dark : light);
    };

    useEffect(() => {
        history.push('/home');
    }, [history]);

    return (
        <>
            <userContext.Provider value={{ userData, setUserData }}>
                <ThemeProvider theme={theme}>
                    <Reset />
                    <Switch>
                        <Route path="/home">
                            <Main toggleTheme={toggleTheme} />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </ThemeProvider>
            </userContext.Provider>
        </>
    );
};

export default App;
