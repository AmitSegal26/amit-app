import { useSearchParams } from "react-router-dom";

/*
  חייב להתחיל ב
  use
  חייב להיות פונקציה
*/

const useQueryParams = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let query = {};
  /*
        ?animal=dog&race=mammals

        query = {
            animal:"dog",
            race:"mammals"
        }
    */

  for (const [key, value] of searchParams) {
    query[key] = value;
    /*
        query = {
            animal:"dog",
            race:"mammals"
        }
    */
  }
  return query;
};

export default useQueryParams;
