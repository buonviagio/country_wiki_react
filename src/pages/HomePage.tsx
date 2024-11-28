import { Box, Container, CssBaseline } from "@mui/material";
import { ChangeEvent, useState } from "react";
import CardContainer from "../components/CardContainer";
import SearchMenu from "../components/SearchMenu";
import GitHubIcon from "@mui/icons-material/GitHub";

function HomePage() {
  /** Name of the country, that was typed by user.
   * inputValue is passed down to the cardContainer as one one of the parameter to logic*/
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };
  /** The end of the input Value */

  /** Checkboxes. Here we create array of continents, every checkbox adds one continent
   * continents array is passed down to the cardContainer as one one of the parameter to logic
   */
  const [continents, setContinents] = useState<string[]>([]);
  /** this function adds or remove continents from the arrayOfContinents (continents state variable)
   * parameter of the function choosen continent, in order to add or remove it from array of continents
   */
  const nadleCheckBoxesValues = (chosenContinent: string) => {
    continents && continents.includes(chosenContinent)
      ? /** If continent in array we have to delete it. filter() returns array of continents without chosenContinent */
        setContinents((prevStatesOfContinents) => {
          return prevStatesOfContinents.filter((continent) => {
            return continent !== chosenContinent;
          });
        })
      : /** if continent is not in array, here we add it */
        setContinents((prevStatesOfContinents) => {
          return [...prevStatesOfContinents, chosenContinent];
        });
  };
  /** The end of check boxes */

  /** Select. Function handleSelectedLanguage reseives as parameter chosen language, that was selected by user
   * and sets up the state variabl. selectedLanguage variable is passed down to the card container as one of the parameter to logic
   */
  const [selectedLanguage, setLenguages] = useState("");
  const handleSelectedLanguage = (lang: string) => {
    setLenguages(lang);
  };
  /** The end of the select are */

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: "#FAFBFB" }}
    >
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
        marginBottom="20px"
      >
        <SearchMenu
          handleInputValue={handleInputValue}
          nadleCheckBoxesValues={nadleCheckBoxesValues}
          handleSelectedLanguage={handleSelectedLanguage}
        />
      </Box>

      <Container
        component="main"
        sx={{ flexGrow: 1, backgroundColor: "white" }}
      >
        <CardContainer
          inputValue={inputValue}
          continentsArray={continents}
          selectedLanguage={selectedLanguage}
        />
      </Container>
      <Box component="footer" bgcolor="#1C76D2" marginTop="20px">
        <Container
          sx={{
            margin: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <GitHubIcon fontSize="large" />
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
