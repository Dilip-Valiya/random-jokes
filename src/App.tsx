import React, { useState } from "react";
import "./App.css";
import {
  useRandomJokeGetQuery,
  useTenRandomJokesGetQuery,
} from "./Common/Queries/jokesQueries";

function App() {
  const [enabled, setEnabled] = useState({ randomJoke: 0, tenRandomJoke: 0 });

  const randomJoke: any = useRandomJokeGetQuery(
    { count: enabled.randomJoke },
    { enabled: enabled.randomJoke > 0 }
  );

  const randomTenJokes: any = useTenRandomJokesGetQuery(
    { count: enabled.tenRandomJoke },
    { enabled: enabled.tenRandomJoke > 0 }
  );

  const handleRandomJoke = () => {
    setEnabled({ ...enabled, randomJoke: enabled.randomJoke + 1 });
  };

  const handleTenRandomJoke = () => {
    setEnabled({ ...enabled, tenRandomJoke: enabled.tenRandomJoke + 1 });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleRandomJoke}>Random Joke!</button>
        <p>{randomJoke.data?.setup}</p>
        <p>{randomJoke.data?.punchline}</p>
        <button onClick={handleTenRandomJoke}>Random Ten Jokes!</button>
        {randomTenJokes.data?.map((item: any) => (
          <div key={item.id}>
            <p>{item.setup}</p>
            <p>{item.punchline}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
