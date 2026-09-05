import { useState } from "react";
import "./App.css";

function App() {
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState("X");
  const [ganador, setGanador] = useState(null);

  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const verificarGanador = (nuevoTablero) => {
    for (const combinacion of combinacionesGanadoras) {
      const [a, b, c] = combinacion;

      if (
        nuevoTablero[a] &&
        nuevoTablero[a] === nuevoTablero[b] &&
        nuevoTablero[a] === nuevoTablero[c]
      ) {
        return nuevoTablero[a];
      }
    }

    return null;
  };

  const jugar = (posicion) => {
    // No permitir jugar si la casilla está ocupada
    // o si ya terminó la partida
    if (tablero[posicion] || ganador) {
      return;
    }

    const nuevoTablero = [...tablero];

    nuevoTablero[posicion] = turno;

    const nuevoGanador = verificarGanador(nuevoTablero);

    setTablero(nuevoTablero);

    if (nuevoGanador) {
      setGanador(nuevoGanador);
      return;
    }

    // Verificar empate
    if (nuevoTablero.every((casilla) => casilla !== null)) {
      setGanador("Empate");
      return;
    }

    // Cambiar jugador
    setTurno(turno === "X" ? "O" : "X");
  };

  const reiniciar = () => {
    setTablero(Array(9).fill(null));
    setTurno("X");
    setGanador(null);
  };

  return (
    <div className="app">
      <h1>🎮 Triqui</h1>

      {!ganador ? (
        <h2>
          Turno del jugador: <span>{turno}</span>
        </h2>
      ) : ganador === "Empate" ? (
        <h2>🤝 ¡Empate!</h2>
      ) : (
        <h2>🏆 ¡Ganó el jugador {ganador}!</h2>
      )}

      <div className="tablero">
        {tablero.map((casilla, index) => (
          <button
            key={index}
            className="casilla"
            onClick={() => jugar(index)}
          >
            {casilla}
          </button>
        ))}
      </div>

      <button className="reiniciar" onClick={reiniciar}>
        🔄 Reiniciar partida
      </button>
    </div>
  );
}

export default App;