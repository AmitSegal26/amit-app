import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { prevPageActions } from "../../store/whereFrom";
//*<NavlinkComponent  url="stringrek" label="keilu" onClick={handleClick} className="redBackground"/>
const NavLinkComponent = ({ url, label, ...rest }) => {
  const dispatch = useDispatch();
  return (
    // <NavLink to={url} onClick={onClick} className={className}>
    <NavLink to={url} {...rest}>
      {({ isActive }) => (
        <Typography
          sx={{
            my: 2,
            display: "block",
            p: 2,
          }}
          color={isActive ? "warning.main" : "text.primary"}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;
