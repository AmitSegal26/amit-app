import axios from "axios";
import React, { useEffect } from "react";

const CRMPage = () => {
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/users/getAllUsers");
        console.log("🚀 ~ file: CRMPage.jsx:9 ~ data:", data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <div>CRMPage</div>;
};

export default CRMPage;
