exports.createPages = async function ({ graphql, actions }) {
  const result = await graphql(`
    query {
      allContentfulPost {
        edges {
          node {
            slug
            title
            subTitle

            content {
              json
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }
  const posts = result.data.allContentfulPost.edges;

  if (posts.length > 0) {
    posts.forEach(({ node }, index) => {
      const previous = index === 0 ? null : posts[index - 1].node;
      const next = index === posts.length - 1 ? null : posts[index + 1].node;

      actions.createPage({
        path: node.slug,
        component: require.resolve(`./src/templates/blog-post-contentful.js`),
        context: {
          id: node.id,
          slug: node.slug,
          content: node.content,
          previous,
          next,
        },
      });
    });
  }
};
