import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMonedas }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  // Como se utiliza un hook personalizado
  const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas);
  const [crypto, SelectCryptomoneda] = useSelectMonedas(
    "Elige tu Cryptomoneda",
    cryptos
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      // Manipulacion de Arreglos
      const arrayCriptos = resultado.Data.map((cripto) => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName,
        };
        return objeto;
      });

      setCryptos(arrayCriptos);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([moneda, crypto].includes("")) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    setError(false);
    setMonedas({
      moneda,
      crypto,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCryptomoneda />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;
