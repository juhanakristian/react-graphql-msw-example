import { graphql } from "msw";

const github = graphql.link("https://api.github.com/graphql");

export const handlers = [
  github.query("RepositoryQuery", (req, res, ctx) => {
    return res(
      ctx.data({
        repository: {
          id: "MDEwOlJlcG9zaXRvcnkzMzU0MTc5Mjc=",
          stargazerCount: 1,
          forkCount: 0,
          name: "next-graphql-msw-example",
          description:
            "A example of using MSW to mock GraphQL API in a NextJS app",
          __typename: "Repository"
        }
      })
    );
  }),
  github.mutation("AddStarMutation", (req, res, ctx) => {
    return res(
      ctx.data({
        addStar: {
          clientMutationId: "1",
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkzMzU0MTc5Mjc=",
            stargazerCount: 2,
            __typename: "Repository"
          }
        }
      })
    );
  }),
  github.mutation("RemoveStarMutation", (req, res, ctx) => {
    return res(
      ctx.data({
        removeStar: {
          clientMutationId: "2",
          starrable: {
            id: "MDEwOlJlcG9zaXRvcnkzMzU0MTc5Mjc=",
            stargazerCount: 1,
            __typename: "Repository"
          }
        }
      })
    );
  })
];
