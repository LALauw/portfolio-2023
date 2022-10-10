import { client } from "@/apolloClient";
import Navbar from "@/components/menu/Navbar";
import Projects from "@/components/projects/Projects";
import Works from "@/components/work/Works";
import type { NextPage } from "next";
import Head from "next/head";
import { gql } from "@apollo/client";
import Hero from "@/components/hero/Hero";
import Layout from "@/components/Layout";

const Home: NextPage = ({ articles }: any) => {
  return (
    <Layout>
      <div className="h-[10vh]"></div>
      <Hero />
      <Projects {...articles} />
      <Works />
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
