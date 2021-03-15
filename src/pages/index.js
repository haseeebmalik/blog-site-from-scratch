import * as React from "react";
import { Link, graphql, navigate } from "gatsby";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../context/GlobalContextProvider";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const IndexPage = ({ data }) => {
  const { theme, toggleTheme, googleLogin, a } = React.useContext(
    GlobalContext
  );
  const classes = useStyles();
  const posts = data.allContentfulPost.edges;

  if (posts.length === 0) {
    return (
      <p>
        No blog posts found. Add markdown posts to "content/blog" (or the
        directory you specified for the "gatsby-source-filesystem" plugin in
        gatsby-config.js).
      </p>
    );
  }
  return (
    <Layout>
      <div>
        <ul>
          {posts.map(({ node }, index) => {
            if (a == false && index == 1) {
              return null;
            }
            return (
              <li>
                <Card
                  className={classes.root}
                  key={index}
                  onClick={() => {
                    navigate(node.slug);
                    //you may use Link instead of navigate
                    // <Link to={node.slug}>hhh</Link>
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={node.image.fixed.src}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {node.slug}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {node.subTitle}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <br />
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => {
            return googleLogin();
          }}
        >
          More Blogs
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allContentfulPost {
      edges {
        node {
          image {
            fixed {
              src
            }
          }
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
`;
