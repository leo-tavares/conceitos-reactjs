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
    await api.delete(`repositories/${id}`);
    const updatedRepositories = repositories.filter((repo) => repo.id !== id);
    setRepositores(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
