import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import codes from "../data/bizkaia.json";

const Prediction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState("");
  const [locationCode, setLocationCode] = useState(null);

  const api_key =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bmFpdHh1NzlAZ21haWwuY29tIiwianRpIjoiMjU2YTEwOTMtYmQwNi00MmNiLTk2NzktNjUyMzk2YmNlMjk1IiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE2ODM1MzU3NzAsInVzZXJJZCI6IjI1NmExMDkzLWJkMDYtNDJjYi05Njc5LTY1MjM5NmJjZTI5NSIsInJvbGUiOiIifQ.p0e1yEZkBYnsFaj3eQateayunMHxOq70IxvsZjLmX8Y";

  useEffect(() => {
    if (id !== undefined) {
      setLocationCode(id);
      const name = codes.find(
        (code) => getCode(code.CPRO, code.CMUN) === id
      ).NOMBRE;
      setLocation(name);
    }
  }, [id]);

  useEffect(() => {
    if (!setLocationCode) return;
    console.log(codes);
    fetch(
      // sacamos la ruta de los datos
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${locationCode}?api_key=${api_key}`
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
  }, [locationCode]);

  const getPrediction = (data) => {
    const newPredictions = data[0].prediccion.dia;
    setPredictions(newPredictions);
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

  const getCode = (CPRO, CMUN) => {
    // padding añadirle ceros delante y detras
    let result = CMUN.toString();
    while (result.length < 3) {
      result = "0" + result;
    }
    result = CPRO.toString() + result;
    return result;
  };

  const goTo = (location) => {
    navigate(`/prediction/${location}`);
  };

  return (
    <div className='prediction'>
      <h1>Prediction for {location}</h1>
      <select
        name='location'
        id='location'
        onChange={(e) => goTo(e.target.value)} // est goto es elq nos da la url con el codigo numerico del municipio
        value={locationCode ? locationCode : ""}
      >
        {!locationCode && <option value=''>selecciona un municipio</option>}
        {/* te da la opcion de seleccionar municipio sino esta seleciconado ninguno*/}
        {codes.map((code, index) => (
          <option key={index} value={getCode(code.CPRO, code.CMUN)}>
            {code.NOMBRE}
          </option>
        ))}
      </select>
      {predictions.map((prediction, index) => (
        <article key={index}>
          <h2>fecha: {prediction.fecha.split("T")[0]}</h2>{" "}
          {/* el split nos quito todo lo q haya apartir de la T*/}
          <h2>orto: {prediction.orto}</h2>
          <h2>ocaso: {prediction.ocaso}</h2>
          <ul>
            {getHourPredictions(prediction).map((hourPrediction) => (
              <li key={hourPrediction.hora}>
                {/* Hay q hacer un Key por cada map que se haga*/}
                <h2>hora: {hourPrediction.hora}</h2>
                <h2>estadoCielo: {hourPrediction.estadoCielo}</h2>
                <h2>temperatura: {hourPrediction.temperatura}</h2>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default Prediction;
