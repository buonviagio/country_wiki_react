import React, { ChangeEvent, useContext, useState } from "react";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MyContext } from "../context/MyContext";

type SearchMenuProps = {
  handleInputValue: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  nadleCheckBoxesValues: (addedContinent: string) => void;
  handleSelectedLanguage: (lang: string) => void;
};

export default function SearchMenu({
  handleInputValue,
  nadleCheckBoxesValues,
  handleSelectedLanguage,
}: SearchMenuProps) {
  /* Collapse are, when user press search button, 
  the area is extended and user can set parameter of searching   */
  const [open, setOpen] = useState(false);
  const handleSearchAre = () => {
    setOpen((prevState) => !prevState);
  };
  /* The end of the input area */

  /* Check boxes area, here we change the color of buttons, if user presses the button button is getting blue*/
  const [checkBoxes, setCheckBoxes] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  /** this function set up the state of checkBocxes, checks previous state and change it (from false to true)*/
  const handleButtonClick = (index: number) => {
    setCheckBoxes((previousStates) => {
      const newCheckBoxes = [...previousStates];
      //we change the state of the button if it was false we set true
      newCheckBoxes[index] = !newCheckBoxes[index];
      return newCheckBoxes;
    });
  };
  /* The end of check boxes area */

  /** Selected area. Here we set up country variable which was chosen by user */
  const [country, setCountry] = React.useState("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
    handleSelectedLanguage(event.target.value);
  };
  /** arrayOfLanguage is provided by reactContext to create a list of languages,
   * which is shown to the user
   */
  const { arrayOfLanguage } = useContext(MyContext);
  /** The end of selected area */

  //ID for the list of languages
  let ID = 0;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        color="primary"
        aria-label="detailed search"
        aria-expanded={open}
        onClick={handleSearchAre}
      >
        <TravelExploreOutlinedIcon />
      </IconButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box display="flex" flexDirection="column" gap="30px">
          <TextField
            id="outlined-basic"
            label="Name of a Country"
            variant="outlined"
            onChange={handleInputValue}
          />
          <Box>
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button
                onClick={() => {
                  handleButtonClick(0);
                  nadleCheckBoxesValues("Asia");
                }}
                color={checkBoxes[0] ? "primary" : "inherit"}
              >
                Asia
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("Africa");
                  handleButtonClick(1);
                }}
                color={checkBoxes[1] ? "primary" : "inherit"}
              >
                Africa
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("Antarctica");
                  handleButtonClick(2);
                }}
                color={checkBoxes[2] ? "primary" : "inherit"}
              >
                Antarctica
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("Oceania");
                  handleButtonClick(3);
                }}
                color={checkBoxes[3] ? "primary" : "inherit"}
              >
                Oceania
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("North America");
                  handleButtonClick(4);
                }}
                color={checkBoxes[4] ? "primary" : "inherit"}
              >
                North America
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("South America");
                  handleButtonClick(5);
                }}
                color={checkBoxes[5] ? "primary" : "inherit"}
              >
                South America
              </Button>
              <Button
                onClick={() => {
                  nadleCheckBoxesValues("Europe");
                  handleButtonClick(6);
                }}
                color={checkBoxes[6] ? "primary" : "inherit"}
              >
                Europe
              </Button>
            </ButtonGroup>
          </Box>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={country}
                //label="Country"
                onChange={handleChange}
              >
                {arrayOfLanguage &&
                  Array.from(arrayOfLanguage).map((lang) => (
                    <MenuItem key={++ID} value={lang}>
                      {lang}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
