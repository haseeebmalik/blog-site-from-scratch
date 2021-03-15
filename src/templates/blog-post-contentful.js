import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Layout from "../components/layout";
import { GlobalContext } from "../context/GlobalContextProvider";

const BlogPostTemplate = ({ pageContext, location }) => {
  const { theme, toggleTheme, googleLogin, a } = React.useContext(
    GlobalContext
  );
  const c = documentToReactComponents(pageContext.content.json);
  let [b, setb] = React.useState(false);
  const resultingString = c[0].props.children[0].slice(0, 50);

  return (
    <Layout>
      <div>
        {pageContext.slug}
        <div>{b && a == true ? c : resultingString}</div>
        <button
          onClick={() => {
            setb(!b);
            if (a == true) {
              return null;
            }
            return googleLogin();
          }}
        >
          {a && b == true ? "showless" : "showmore"}
        </button>
      </div>
    </Layout>
  );
};
export default BlogPostTemplate;
