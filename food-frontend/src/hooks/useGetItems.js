import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useGetItems = (url, isJWTTokenRequired = false) => {
  const authCtx = useContext(AuthContext);
  return useQuery(
    {
      key: url,
      queryFn: async () => {
        if (!isJWTTokenRequired) {
          const { data } = await axios.get(url);
          return data;
        } else if (isJWTTokenRequired) {
          const { data } = await axios.get(url, {
            headers: {
              "x-auth-token": isJWTTokenRequired ? authCtx.token : "",
            },
          });
          return data;
        }
      },
    }
    // {
    //   cacheTime: 50000,
    //   refetchOnWindowFocus: false,
    //   onError: (error) => {
    //     if (error.response.status === 401 || error.response.status === 403) {
    //       window.alert("Invalid Token");
    //     }
    //   },
    // }
  );
};

export default useGetItems;
