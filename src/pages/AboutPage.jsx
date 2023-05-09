import Typography from "@mui/material/Typography";
import { Container, Divider } from "@mui/material";
import { Box } from "@mui/material";
import myImage from "../assets/imgs/myImage.jpg";
import { useSelector } from "react-redux";
const AboutPage = () => {
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);

  return (
    <Container>
      <Box
        sx={{
          marginX: { xs: "", sm: "", md: "", lg: "" },
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          fontSize={{ xs: "2rem", lg: "6rem" }}
        >
          About Us Page
        </Typography>
        <Divider variant="middle" />
        <Typography align="justify" paragraph={true}>
          Welcome to our business card advertising website! Our website is
          designed to showcase various businesses through their business cards.
          You can easily access our Home Page by clicking on the logo. At the
          Home Page, you will find vary of information about each business. To
          view the full card, simply click on the image. If you find a business
          that you like, you can add their card to your fav-page{" "}
          <span style={{ fontWeight: "bold", color: "red" }}>
            Make sure you login first in order to enable the website to save
            your likes!
          </span>{" "}
          To take advantage of all the features of our website, we encourage you
          to log in or register by clicking on the relevant links at the
          Navigatior Bar Above.
        </Typography>
        {payload && payload.isAdmin ? (
          <Box>
            We also have a sandbox page where you can play with exercies we have
            done at the course and experiment with different features. You may
            delete any card you like, but be cautious! once you delet a card
            there is no going back!
          </Box>
        ) : (
          ""
        )}
        {payload && payload.biz ? (
          <Box>
            To edit your profile details, simply click on the Profile link at
            the cards themselves. You may delete any card you like,as long you
            are it's creator, but be cautious! once you delet a card there is no
            going back!
          </Box>
        ) : (
          ""
        )}
        <Typography align="justify" paragraph={true}>
          If you prefer a different theme, you can switch between light and dark
          mode by clicking on the sun/moon at the menu above. You can also
          personalize your account by setting a profile picture, which can be
          done by clicking on your avatar. Thank you for using our website and
          we hope you find it helpful in discovering new and exciting
          businesses!
        </Typography>
        <img src={myImage} alt="example card image" />
      </Box>
    </Container>
  );
};

export default AboutPage;
