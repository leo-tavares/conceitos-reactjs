import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositores] = useState([]);
  useEffect(() => {
    const fetchRepositories = async () => {
      const response = await api.get("repositories");
      setRepositores(response.data);
    };
    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const { data: newRepositorie } = await api.post("repositories", {
      title: `Awesome App ${Date.now()}`,
      techs: ["React-Native", "NodeJs"],
    });
    setRepositores((repositories) => [...repositories, newRepositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
