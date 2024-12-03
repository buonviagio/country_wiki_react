import { useContext, useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { Grid2 } from "@mui/material";
import { Country } from "../types/commonTypes";
import { MyContext } from "../context/MyContext";
import { getUniqueLanguagesArray } from "../utils/helperFucntions";
import { Box } from "@mui/joy";
import Loader from "./Loader";

type CardContainerProps = {
  inputValue: string;
  continentsArray: string[];
  selectedLanguage: string;
};

export default function CardContainer({
  inputValue,
  continentsArray,
  selectedLanguage,
}: CardContainerProps) {
  /** Array ofcountries, which was recieved from API  */
  const [countries, setCountries] = useState<Country[]>([]);

  /* const [arrayOfLanguage, setArrayOfLanguage] = useState<Set<string> | null>(
    null
  ); */

  /** the function from context to set array of unique languages, which was received from helperFunction   */
  const { setArrayOfLanguage } = useContext(MyContext);

  /** function, which fetch data from API and sets up COUNTRIES array and sends data to helperFunction */
  async function getData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const result = (await response.json()) as Country[];
      setCountries(result);
      // it is better to use RESULT than send DATA
      /** the helperFunction is called here */
      const uniqueLanguagesArray = getUniqueLanguagesArray(result);
      /** the result of the helperFunction is stored in the state variable in the context */
      setArrayOfLanguage(uniqueLanguagesArray);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  /** ID for every card */
  let id = 1;

  /** this function performs logic, to pick up countries based on 3 criteria
   * 1 on name of country, which was typed by user
   * 2 on continents, which was chosen by user
   * 3 on language, which was chosen by user*/
  const filterFunction = countries.filter((country) => {
    let language: string[] = [];
    if (country.languages) {
      language = Object.values(country?.languages);
      //console.log("language", language);
    }

    return (
      // 1 criterion was applied here
      country.name.common.toLowerCase().includes(inputValue.toLowerCase()) &&
      // 2 criterion was applied here
      (country.continents.some((continent) => {
        return continentsArray.includes(continent);
      }) ||
        continentsArray.length == 0) &&
      //3 criterion was applied here
      (language.includes(selectedLanguage) ||
        selectedLanguage == "" ||
        selectedLanguage == "All languages")
    );
  });

  // const secondFilter = () => {
  //   const uniqueLanguagesArray = getUniqueLanguagesArray(filterFunction);
  //   setArrayOfLanguage(uniqueLanguagesArray);
  //   const result = filterFunction.filter((country) => {
  //     let language: string[] = [];
  //     if (country.languages) {
  //       language = Object.values(country?.languages);
  //       //console.log("language", language);
  //     }
  //     return (
  //       language.includes(selectedLanguage) ||
  //       selectedLanguage == "" ||
  //       selectedLanguage == "All languages"
  //     );
  //   });

  //   return result;
  // };

  return (
    <Grid2 container spacing={3}>
      {countries.length === 0 ? (
        <Loader />
      ) : (
        // here the cards of countries are created
        filterFunction.map((country) => {
          return (
            <MediaCard
              key={id++}
              name={country.name}
              flags={country.flags}
              capital={country.capital}
              region={country.region}
              map={country.maps.openStreetMaps}
            />
          );
        })
      )}
    </Grid2>
  );
}
