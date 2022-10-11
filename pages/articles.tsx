import { gql } from "@apollo/client";
import { client } from "@/apolloClient";
import Layout from "@/components/Layout";
import Link from "next/link";
import { motion } from "framer-motion";
import Project from "@/components/projects/Project";

const Articles = (articles: any) => {
  return (
    <Layout>
      <section id="projects" className="my-32 flex flex-col gap-5 px-5">
        <Link href="/Articles" className="w-full">
          <h2 className="variable-text bg-gradient-to-tr from-amber-300 to-teal-300 bg-clip-text text-3xl font-black uppercase text-transparent md:text-5xl ">
            Articles
          </h2>
        </Link>
        <div className="grid grid-flow-row grid-cols-1 gap-5 md:grid-cols-2">
          {articles.articles.map((item: any, i: number) => (
            <motion.div
              key={i}
              whileInView={{ opacity: 1, translateY: 0 }}
              initial={{ opacity: 0, translateY: 100 }}
              //animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Project {...item} />
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

const QUERY = gql`
  query {
    articles {
      title
      smallTitle
      subtitle
      date
      coverImage {
        url
      }
      content {
        markdown
      }
      slug
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: QUERY,
  });

  const articles = data.articles;
  return {
    revalidate: 60,
    props: {
      articles,
    },
  };
}

export default Articles;
