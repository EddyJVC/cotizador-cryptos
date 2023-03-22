import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
import ImagenCrypto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const App = () => {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  // Se ejecuta unicamente cuando tenga algo
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCrypto = async () => {
        setCargando(true);
        setResultado({});

        //Object Destructuring
        const { moneda, crypto } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[crypto][moneda]);

        setCargando(false);
      };

      cotizarCrypto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCrypto} alt="Imagenes Crypto"></Imagen>

      <div>
        <Heading>Cotiza Cryptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas}></Formulario>

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  );
};

export default App;
