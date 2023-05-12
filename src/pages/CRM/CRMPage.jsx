import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import TableForCRM from "./TableForCRM";
import ROUTES from "../../routers/ROUTES";
const CRMPage = () => {
  const navigate = useNavigate();
  const [usersArrState, setUsersArrState] = useState([]);

  useEffect(() => {
    axios
      .get("users/getAllUsers")
      .then(({ data: { users } }) => {
        setUsersArrState(users);
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error("ERR" + err.response.data);
      });
  }, []);

  const handleDeleteUser = (ev) => {
    axios
      .delete("/users/deleteUser/" + ev.target.id)
      .then(() => {
        let newUsersArr = JSON.parse(JSON.stringify(usersArrState));
        newUsersArr = newUsersArr.filter((user) => user._id !== ev.target.id);
        setUsersArrState(newUsersArr);
        toast.success("user deleted");
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error("ERR " + err.response.data);
      });
  };

  const handleEditUser = async (ev) => {
    try {
      let newUsersArr = JSON.parse(JSON.stringify(usersArrState));
      let currentUser = newUsersArr.find((user) => user._id == ev.target.id);
      await axios.put("/users/userInfo/" + currentUser._id, {
        firstName: currentUser.firstName,
        middleName: currentUser.middleName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
        imageAlt: currentUser.imageAlt,
        state: currentUser.state,
        country: currentUser.country,
        city: currentUser.city,
        street: currentUser.street,
        houseNumber: currentUser.houseNumber,
        zipCode: currentUser.zipCode,
        biz: !currentUser.biz,
      });
      currentUser.biz = !currentUser.biz;
      newUsersArr.map((user) => {
        if (user._id == currentUser._id) {
          user = { ...currentUser };
        }
      });
      setUsersArrState(newUsersArr);
      if (!window.location.href.endsWith("/crm")) {
        navigate(ROUTES.CRM);
      }
    } catch (err) {
      toast.error("ERR: something went wrong.");
    }
  };
  const handleSeeProfileClick = (ev) => {
    let { id } = ev.target;
    navigate(`${ROUTES.CRM}/${id}`); //localhost:3000/crm/XXX
  };

  return (
    <Fragment>
      {window.location.href.endsWith("/crm") ||
      window.location.href.endsWith("/crm/") ? (
        <Fragment>
          <h1>Customer Relationship Management (CRM)</h1>
          <h3>
            This system is designed for admins only! Here you can view the whole
            users on this site!
          </h3>

          <ul>
            <h4>In here, you may:</h4>
            <li>You may change the authority of business accounts.</li>
            <li>
              You may delete users from the website so they will lose their
              account. be cautious!
            </li>
            <li>Be noted for the fact you cannot affect admin accounts!</li>
            <li>
              If you want to view a user's profile, click on the 'expand' button
            </li>
          </ul>
        </Fragment>
      ) : (
        ""
      )}
      <Outlet />
      <TableForCRM
        usersArrStateProp={usersArrState}
        handleDeleteUserFunc={handleDeleteUser}
        handleSeeProfileClickFunc={handleSeeProfileClick}
        handleEditUserFunc={handleEditUser}
      />
    </Fragment>
  );
};

export default CRMPage;
