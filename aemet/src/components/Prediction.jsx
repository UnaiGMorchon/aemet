import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Prediction = () => {
  let { id } = useParams();
  if (id === undefined) {
    id = 48004;
  }
  console.log(id);

  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState("");

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmFpdHh1NzlAZ21haWwuY29tIiwianRpIjoiMjU2YTEwOTMtYmQwNi00MmNiLTk2NzktNjUyMzk2YmNlMjk1IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2ODM1MzU3NzAsInVzZXJJZCI6IjI1NmExMDkzLWJkMDYtNDJjYi05Njc5LTY1MjM5NmJjZTI5NSIsInJvbGUiOiIifQ.p0e1yEZkBYnsFaj3eQateayunMHxOq70IxvsZjLmX8Y";

  useEffect(() => {
    fetch(
      // sacamos la ruta de los datos
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${id}?api_key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data); la ruta de los datos
        fetch(data.datos) // aqui es donde devuelve los datos
          .then((response) => response.json())
          .then((data) => getPrediction(data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [id]);

  const getPrediction = (data) => {
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
    setLocation(data[0].nombre);
    console.log(newPredictions);
  };

  const getHourPredictions = (prediction) => {
    let result = [];
    for (let i = 0; i < 24; i++) {
      const estadoCielo = prediction.estadoCielo.find(
        (element) => element.periodo == i
      );
      const temperatura = prediction.temperatura.find(
        (element) => element.periodo == i
      );
      const hourPrediction = {
        hora: i,
        estadoCielo: estadoCielo ? estadoCielo.descripcion : "no hay datos",
        temperatura: temperatura ? temperatura.value : "no hay datos",
      };
      if (estadoCielo || temperatura) {
        result.push(hourPrediction);
      }
    }
    return result;
  };

  return (
    <div className='prediction'>
      <Link to='/Home'>Home</Link>
      <h1>Prediction for {location}</h1>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>fecha: {prediction.fecha.split("T")[0]}</h2>
          <h2>orto: {prediction.orto}</h2>
          <h2>ocaso: {prediction.ocaso}</h2>
          <ul>
            {getHourPredictions(prediction).map((hourPrediction) => (
              <li key={hourPrediction.hora}>
                <h2>hora: {hourPrediction.hora}</h2>
                <h2>estadoCielo: {hourPrediction.estadoCielo}</h2>
                <h2>temperatura: {hourPrediction.temperatura}</h2>
              </li>
            ))}
          </ul>
        </article>
      ))}
      ;
    </div>
  );
};

export default Prediction;
