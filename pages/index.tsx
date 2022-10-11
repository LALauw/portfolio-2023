import { client } from "@/apolloClient";
import Projects from "@/components/projects/Projects";
import Works from "@/components/work/Works";
import type { NextPage } from "next";
import { gql } from "@apollo/client";
import Hero from "@/components/hero/Hero";
import Layout from "@/components/Layout";
import Tech from "@/components/tech/Tech";

const Home: NextPage = ({ articles }: any) => {
  return (
    <Layout>
      <div className="h-[10vh]"></div>
      <Hero />
      <Projects {...articles} />
      <Works />
      <Tech />
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
  const { data: articles } = await client.query({
    query: QUERY,
  });

  return {
    revalidate: 60,
    props: {
      articles,
    },
  };
}

export default Home;
