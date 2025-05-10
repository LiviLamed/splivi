import HomeIcon from "@mui/icons-material/Home";
import {
  alpha,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import imageSource from "../images/page-not-found.png";

const StyledContainer = styled(Paper)(({ theme }) => ({
  padding: "80px",
  paddingBottom: "10px",
  paddingTop: "10px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  textAlign: "center",
  backgroundImage: `url('images/purple-bg.jpg')`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  [theme.breakpoints.down("sm")]: {
    padding: "0px",
  },
}));

const PageNotFound = () => {
  return (
    <StyledContainer>
      <Card
        sx={{
          p: { md: 4, xs: 0 },
          border: "3px solid white",
          borderRadius: "15px",
          bgcolor: alpha(purple[300], 0.7),
          width: { md: "700px", xs: "425px" },
          margin: "0px",
        }}
      >
        <CardContent sx={{ paddingX: "40px" }}>
          <Stack
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={imageSource}
              width="350"
              height="250"
              alt="Page not found."
            />

            <Typography
              variant="h1"
              sx={{ color: grey[400], fontWeight: "bolder" }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: grey[900],
                m: 1,
                paddingBottom: { md: "8px", xs: "0px" },
              }}
            >
              A Dog Ate this Page
            </Typography>

            <Button
              href="/"
              variant="contained"
              sx={{ m: 1, paddingBottom: "8px", width: "40%" }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>

            <Typography
              variant="h6"
              sx={{
                color: grey[900],
                m: 1,
                paddingBottom: "8px",
                width: "70%",
              }}
            >
              Sorry, we can't find that page. You will find lots to explore on
              our Home Page.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </StyledContainer>
  );
};

export default PageNotFound;
