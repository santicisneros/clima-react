import { useState } from "react";

interface FormularioProps {
  city: string;
  setCity: (value: string) => void;
  newLocation: (value: string) => void;
}

const Formulario = ({ city, setCity, newLocation }: FormularioProps) => {
  const [ciudad, setCiudad] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ciudad }); // Verificar el valor del estado
    if (ciudad === "" || !ciudad) return; // Verificar que el valor no sea vacío
    // Realizar las acciones necesarias al enviar el formulario
    newLocation(ciudad);
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="onSubmit">
        <div className="input-group mb-3 mx-auto ">
          <input
            type="text"
            className="form-control"
            placeholder="Ciudad"
            onChange={(e) => setCiudad(e.target.value)}
          />
          <button
            className="btn btn-primary input-group-text"
            type="submit"
            id="button-addon1"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;
