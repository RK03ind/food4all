import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddItem from "./pages/AddItem/AddItem";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home/Home";
import Listings from "./pages/Listings/Listing";
import UserPage from "./pages/UserPage/UserPage";

const queryClient = new QueryClient();

// const Home = () => (
//   <div>
//     <h1>Home Page</h1>
//     <p>Welcome to the Home Page</p>
//   </div>
// );

// const NotFound = () => (
//   <div>
//     <h1>404 - Not Found</h1>
//     <p>The page you are looking for does not exist.</p>
//   </div>
// );

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/list" element={<Listings />} />
          {authCtx.token ? (
            <>
              <Route path="/create-listing" element={<AddItem />} />
              <Route path="/profile" element={<UserPage />} />
            </>
          ) : (
            ""
          )}
          {!authCtx.token ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            ""
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
