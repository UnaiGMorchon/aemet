import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Beaches = () => {
  const [predictions, setPredictions] = useState([]);
  const [name, setName] = useState("");

  let { id } = useParams();
  if (id === undefined) {
    id = 48004801;
  }
  console.log(id);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmFpdHh1NzlAZ21haWwuY29tIiwianRpIjoiMjU2YTEwOTMtYmQwNi00MmNiLTk2NzktNjUyMzk2YmNlMjk1IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2ODM1MzU3NzAsInVzZXJJZCI6IjI1NmExMDkzLWJkMDYtNDJjYi05Njc5LTY1MjM5NmJjZTI5NSIsInJvbGUiOiIifQ.p0e1yEZkBYnsFaj3eQateayunMHxOq70IxvsZjLmX8Y";

  useEffect(() => {
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${id}?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(data.datos) // aqui es donde devuelve los datos
          .then((response) => response.json())
          .then((data) => getPredictions(data));
      })
      .catch((error) => console.log(error));
  }, [id]);

  const getPredictions = (data) => {
    console.log(data);
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
    setName(data[0].nombre);
  };

  return (
    <div className='prediction'>
      <Link to='/'>Home</Link>
      <h1>Prediction for {name}</h1>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>fecha: {prediction.fecha}</h2>
          <p>temperatura del agua: {prediction.tAgua.valor1}</p>
          <p>Sensacion térmica: {prediction.sTermica.descripcion1}</p>
          <p>
            Oleaje:
            <span>Mañana: {prediction.oleaje.descripcion1} </span>
            <span>Tarde: {prediction.oleaje.descripcion2} </span>
          </p>
          <p>
            Viento:
            <span>Mañana: {prediction.viento.descripcion1} </span>
            <span>Tarde: {prediction.viento.descripcion2} </span>
          </p>
          <p>
            Estado del cielo:
            <span>Mañana: {prediction.estadoCielo.descripcion} </span>
            <span>Tarde: {prediction.estadoCielo.descripcion2}</span>
          </p>
        </article>
      ))}
    </div>
  );
};
export default Beaches;
