import styles from "./App.module.css";
/*
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}*/

import React from "react";
import { EmptyStarIcon, FilledStarIcon } from "./components/icons";
//import styles from "../styles/Home.module.css";

import { gql, useQuery, useMutation } from "@apollo/client";

const GET_REPOSITORY = gql`
  query RepositoryQuery($repository: String!, $owner: String!) {
    repository(name: $repository, owner: $owner) {
      __typename
      id
      name
      description
      forkCount
      stargazerCount
    }
  }
`;

const ADD_STAR = gql`
  mutation AddStarMutation($starrable: AddStarInput!) {
    addStar(input: $starrable) {
      clientMutationId
      starrable {
        id
        stargazerCount
        __typename
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation RemoveStarMutation($starrable: RemoveStarInput!) {
    removeStar(input: $starrable) {
      clientMutationId
      starrable {
        id
        stargazerCount
        __typename
      }
    }
  }
`;

export default function App() {
  const [starred, setStarred] = React.useState(false);

  const { loading, error, data: queryData } = useQuery(GET_REPOSITORY, {
    variables: {
      owner: "juhanakristian",
      repository: "next-graphql-msw-example"
    }
  });

  const [addStar] = useMutation(ADD_STAR);
  const [removeStar] = useMutation(REMOVE_STAR);

  function handleClickStar(e) {
    e.preventDefault();
    if (starred) {
      addStar({ starrable: { starrableId: queryData.repository.id } });
    } else {
      removeStar({ starrable: { starrableId: queryData.repository.id } });
    }

    setStarred(!starred);
  }

  return (
    <div className={styles.container}>
      {loading || !queryData ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{queryData.repository.name}</h3>
          <p>{queryData.repository.description}</p>
          <div className={styles.star}>
            <button onClick={handleClickStar}>
              {starred ? <FilledStarIcon /> : <EmptyStarIcon />}
              <span>{starred ? "Unstar" : "Star"}</span>
            </button>
            <a href="https://github.com/juhanakristian/next-graphql-msw-example/stargazers">
              {queryData.repository.stargazerCount}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
