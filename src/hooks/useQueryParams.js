import { useSearchParams } from "react-router-dom";

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
