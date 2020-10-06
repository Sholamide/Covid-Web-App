import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false)

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');

        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
            setMode('dark') :
            localTheme ?
                setTheme(localTheme) :
                setMode('light');
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler, mountedComponent]
};
