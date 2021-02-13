import React from "react";
import styles from "./App.module.css";

import Repository from "./components/Repository";

export default function App() {
  const repositories = [
    {
      owner: "juhanakristian",
      repository: "react-graphql-msw-example",
    },
    {
      owner: "mswjs",
      repository: "msw",
    },
  ];

  return (
    <div className={styles.container}>
      {repositories.map((r) => (
        <Repository
          key={`${r.owner}-${r.repository}`}
          owner={r.owner}
          repository={r.repository}
        />
      ))}
    </div>
  );
}
