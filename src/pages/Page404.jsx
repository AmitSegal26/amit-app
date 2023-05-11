import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../routers/ROUTES";

const Page404 = () => {
  return (
    <Container>
      <img
        style={{ float: "right", width: "30vw" }}
        src="https://media.tenor.com/w-ty995v5tsAAAAi/computerchallenged-it.gif"
        alt="Confused Computer"
      />
      <Typography component="h1" variant="h2" sx={{ fontWeight: "bold" }}>
        404 <span style={{ color: "red" }}>NOT FOUND!</span>
      </Typography>
      <Typography component="h1" variant="h2" sx={{ fontWeight: "bold" }}>
        And there is{" "}
        <span style={{ color: "red" }}>NOTHING YOU CAN DO ABOUT IT </span>
        <br />
        <span style={{ color: "pink", fontSize: "1.5rem" }}>
          besides clicking{" "}
          <Link
            to={ROUTES.HOME}
            style={{
              color: "#FFC06F",
              textDecoration: "underline",
              backgroundColor: "#313131",
            }}
          >
            back to home :D
          </Link>
        </span>
      </Typography>
    </Container>
  );
};

export default Page404;
