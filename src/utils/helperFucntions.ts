import { Country } from "../types/commonTypes";

const getUniqueLanguagesArray = (data:Country[]) => {
    
    const array = data.map(value => value.languages).filter(value => value !== undefined);

    const setOfLanguages = new Set<string>() 
    array.forEach(language => {
     for (const [key, value] of Object.entries(language)) {
         setOfLanguages.add(value);
        } 
    }) 
    return setOfLanguages 
}

export {getUniqueLanguagesArray}