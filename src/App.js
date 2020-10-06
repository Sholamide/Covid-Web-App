import React, { useState, useEffect } from "react";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { useDarkMode } from "./components/useDarkMode";
import { CountryPicker, Cards, Chart } from "./components";
import Toggle from "./components/Toggler";
import styles from "./App.module.css";

import { fetchData } from "./api";

import coronaImage from "./images/covid.jpg";

const App = () => {
    const [data, setData] = useState([]);
    const [country, setCountry] = useState([]);
    const [theme, themeToggler, mountedComponent] = useDarkMode();

    const themeMode = theme === 'light' ? lightTheme : darkTheme;


    const handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        setData(fetchedData);
        setCountry(country);
        console.log(fetchedData);
        console.log(country);
    }

    useEffect(() => {
        const fetchDataAPI = async () => {
            setData(await fetchData());
        }

        console.log(data);

        fetchDataAPI();
    }, [])


    if (!mountedComponent) return <div />

    return (
        <ThemeProvider theme={themeMode}>
            <>
                <GlobalStyles />
                <div className={styles.container}>
                    <div className={styles.mainHeader}>
                        <img className={styles.image} alt="COVID19" src={coronaImage} />
                        <h1 className={styles.header}>Corona Virus Tracker</h1>
                        <div className={styles.toggler}>
                            <Toggle theme={theme} toggleTheme={themeToggler}></Toggle>
                        </div>

                    </div>

                    <Cards data={data} />
                    <CountryPicker handleCountryChange={handleCountryChange} />
                    <Chart data={data} country={country} />
                </div>
                <footer>
                    <span><small> Credits:  </small> </span>
                    <small><b>Sun</b> icon made by <a href="https://www.flaticon.com/authors/smalllikeart">smalllikeart</a> from <a href="https://www.flaticon.com">www.flaticon.com</a></small>
                    <small><b> Moon</b> icon made by <a href="https://www.freepik.com/home"> Freepik</a> from <a href="https://www.flaticon.com">www.flaticon.com</a></small></footer>
            </>
        </ThemeProvider>
    );
};

export default App;

































// class App extends React.Component {

//     state = {
//         data: {},
//         country: '',
//         theme: 'light',
//     }

//     async componentDidMount() {
//         const fetchedData = await fetchData();
//         console.log(fetchedData);
//         this.setState({ data: fetchedData })
//     }

//     toggleTheme = (theme) => {
//         theme === 'light' ? this.setState({ theme: 'dark' }) : this.setState({ theme: 'light' });
//         // if (theme === 'light') {
//         //     this.setState({ theme: 'dark' });
//         // } else {
//         //     this.setState({ theme: 'light' });
//         // }
//         // console.log(theme);
//         // alert("This button has been clicked" + theme);
//     }

//     handleCountryChange = async (country) => {
//         const fetchedData = await fetchData(country);

//         this.setState({ data: fetchedData, country: country });
//         console.log(fetchedData);
//         console.log(country);
//     }

//     render() {
//         const { data, country, theme } = this.state;

//         return (
//             <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
//                 <>
//                     <GlobalStyles />
//                     <div className={styles.container}>
//                         <img className={styles.image} alt="COVID19" src={coronaImage} />
//                         <h1 className={styles.header}>Corona Virus Tracker</h1>
//                         <button onClick={this.toggleTheme}>Toggle theme</button>
//                         <Cards data={data} />
//                         <CountryPicker handleCountryChange={this.handleCountryChange} />
//                         <Chart data={data} country={country} />
//                     </div>
//                 </>
//             </ThemeProvider>
//         );
//     }
// }