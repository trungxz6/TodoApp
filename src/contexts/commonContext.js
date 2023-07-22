import { createContext } from "react";

const langContext = createContext({
    lang: 'EN',
    setLang: () => {
    }
});


export { langContext };