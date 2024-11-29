import {
  Box,
  Container,
  CssBaseline,
  Grid2,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapList from "../components/MapList";
import { DataFromWiki } from "../types/wikipediaTypes";
import { Hit } from "../types/pixabayTypes";
import Comments from "../components/Comments";
import InformationForCountryPage from "../components/InformationForCountryPage";
import Footer from "../components/Footer";

function CountryPage() {
  console.log("%c CountryPage  component run", "color:red");
  let imageID = 0;

  const { country } = useParams();

  /** Wiki */
  const [dataFromWiki, setWikiData] = useState<DataFromWiki | null>(null);

  async function getDataWiki(country: string) {
    try {
      const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" + country
      );
      const result = (await response.json()) as DataFromWiki;

      setWikiData(result);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /** the end of Wiki */

  /** pixabay */

  const [dataFromPixabay, setPixabayData] = useState<Hit | null>(null);

  async function getPixabayData(country: string) {
    try {
      const response = await fetch(
        "https://pixabay.com/api/?key=" +
          import.meta.env.VITE_PIXABAY_KEY +
          "&q=" +
          country.toLowerCase() +
          "image_type=photo&per_page=6"
      );
      const resolt = (await response.json()) as Hit;

      setPixabayData(resolt);
    } catch (error) {
      console.log("error :>> ", error);
    }
  }

  /** the end of pixabay */

  useEffect(() => {
    const makeRequests = async () => {
      await getDataWiki(country!);
      await getPixabayData(country);
    };
    if (country) {
      makeRequests();
    } else {
      throw new Error("country is not defined");
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{ backgroundColor: "#FAFBFB" }}
    >
      <CssBaseline />
      <Grid2
        container
        spacing={2}
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "80%",
            height: "300px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 2,
          }}
        >
          <MapList country={country} />
        </Box>
      </Grid2>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InformationForCountryPage
          info={dataFromWiki && dataFromWiki.extract}
        />
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ImageList
          key={++imageID}
          sx={{ width: 500, height: 450 }}
          cols={2}
          rowHeight={164}
        >
          {dataFromPixabay &&
            dataFromPixabay.hits.map(
              (
                item: {
                  img: Key | null | undefined;
                  largeImageURL: any;
                  tags: string | undefined;
                },
                index: number
              ) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item.largeImageURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.largeImageURL}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.tags}
                    loading="lazy"
                  />
                </ImageListItem>
              )
            )}
        </ImageList>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
      >
        <Comments country={country} />
      </Box>
      <Footer />
    </Box>
  );
}

export default CountryPage;
