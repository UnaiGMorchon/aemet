import { useState, useEffect } from "react";

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmFpdHh1NzlAZ21haWwuY29tIiwianRpIjoiMjU2YTEwOTMtYmQwNi00MmNiLTk2NzktNjUyMzk2YmNlMjk1IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2ODM1MzU3NzAsInVzZXJJZCI6IjI1NmExMDkzLWJkMDYtNDJjYi05Njc5LTY1MjM5NmJjZTI5NSIsInJvbGUiOiIifQ.p0e1yEZkBYnsFaj3eQateayunMHxOq70IxvsZjLmX8Y";

  useEffect(() => {
    fetch(
      // sacamos la ruta de los datos
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/48004?api_key=${api_key}`
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
  }, []);

  const getPrediction = (data) => {
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
    console.log(newPredictions);
  };

  return (
    <div className='prediction'>
      <h1>Prediction</h1>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>fecha: {prediction.fecha}</h2>
          <h2>orto: {prediction.orto}</h2>
          <h2>ocaso: {prediction.ocaso}</h2>
        </article>
      ))}
      ;
    </div>
  );
};

export default Prediction;
