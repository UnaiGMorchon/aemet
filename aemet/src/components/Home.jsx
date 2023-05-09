import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Home page</p>
      <Link to='/prediction'>Predicciones</Link>
      <Link to='/about'>About</Link>
      <Link to='/beach'>Beach</Link>
    </div>
  );
};

export default Home;
