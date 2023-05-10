import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import playas from "../data/playas.json";

const Beaches = () => {
  const [predictions, setPredictions] = useState([]);
  const [name, setName] = useState("");
  const [beachCode, setBeachCode] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      setBeachCode(id);
      const newName = playas.find(
        (beach) => beach.ID_PLAYA.toString() == id
      ).NOMBRE_PLAYA;
      setName(newName);
    }
  }, [id]);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmFpdHh1NzlAZ21haWwuY29tIiwianRpIjoiMjU2YTEwOTMtYmQwNi00MmNiLTk2NzktNjUyMzk2YmNlMjk1IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2ODM1MzU3NzAsInVzZXJJZCI6IjI1NmExMDkzLWJkMDYtNDJjYi05Njc5LTY1MjM5NmJjZTI5NSIsInJvbGUiOiIifQ.p0e1yEZkBYnsFaj3eQateayunMHxOq70IxvsZjLmX8Y";

  useEffect(() => {
    if (!beachCode) return;
    fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${beachCode}?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        fetch(data.datos) // aqui es donde devuelve los datos
          .then((response) => response.json())
          .then((data) => getPredictions(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [beachCode]);

  const getPredictions = (data) => {
    console.log(data);
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
  };

  const goTo = (location) => {
    navigate(`/beach/${location}`);
  };

  return (
    <div className='prediction'>
      <h1>Prediction for {name}</h1>
      <select
        onChange={(e) => goTo(e.target.value)}
        value={beachCode ? beachCode : ""}
      >
        {!beachCode && <option value=''>selecciona una playa</option>}
        {playas
          .filter((beach) => beach.ID_PROVINCIA === 48)
          .map((beach) => (
            <option key={beach.ID_PLAYA} value={beach.ID_PLAYA}>
              {beach.NOMBRE_PLAYA}
            </option>
          ))}
      </select>
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
