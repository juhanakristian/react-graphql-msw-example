import { graphql } from "msw";

const github = graphql.link("https://api.github.com/graphql");

export const handlers = [
  github.query("RepositoryQuery", (req, res, ctx) => {
    const { repository, owner } = req.variables;
    if (repository === "msw" && owner === "mswjs") {
      return res(
        ctx.data({
          repository: {
            __typename: "Repository",
            id: "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM=",
            name: "msw",
            description:
              "Seamless REST/GraphQL API mocking library for browser and Node.",
            stargazerCount: 4926,
          },
        })
      );
    }

    return res(
      ctx.data({
        repository: {
          id: "MDEwOlJlcG9zaXRvcnkzMzgxNDQwNjM=",
          stargazerCount: 1,
          name: "react-graphql-msw-example",
          description:
            "A example of using MSW to mock GraphQL API in a React application",
          __typename: "Repository",
        },
      })
    );
  }),
  github.mutation("AddStarMutation", (req, res, ctx) => {
    const {
      starrable: { starrableId },
    } = req.variables;
    if (starrableId === "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM=") {
      return res(
        ctx.data({
          addStar: {
            clientMutationId: null,
            starrable: {
              id: "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM=",
              stargazerCount: 4927,
              __typename: "Repository",
            },
          },
        })
      );
    }
    return res(
      ctx.data({
        addStar: {
          clientMutationId: null,
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkzMzgxNDQwNjM=",
            stargazerCount: 2,
            __typename: "Repository",
          },
        },
      })
    );
  }),
  github.mutation("RemoveStarMutation", (req, res, ctx) => {
    const {
      starrable: { starrableId },
    } = req.variables;
    if (starrableId === "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM=") {
      return res(
        ctx.data({
          removeStar: {
            clientMutationId: null,
            starrable: {
              id: "MDEwOlJlcG9zaXRvcnkxNTczOTc1ODM=",
              stargazerCount: 4926,
              __typename: "Repository",
            },
          },
        })
      );
    }
    return res(
      ctx.data({
        removeStar: {
          clientMutationId: null,
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkzMzgxNDQwNjM=",
            stargazerCount: 1,
            __typename: "Repository",
          },
        },
      })
    );
  }),
];
