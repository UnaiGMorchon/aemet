import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Home;
