import { gql } from "@apollo/client";
import { client } from "@/apolloClient";
import { ProjectItem } from "@/components/projects/ProjectItem";
import Layout from "@/components/Layout";
import Markdown from "markdown-to-jsx";
import ImageComponent from "@/components/util/ImageComponent";

const ArticlePage = (article: ProjectItem) => {
  const markdown: string = article.content.markdown;
  return (
    <Layout>
      <section className="px-4">
        <h2 className="font-abcWhyteVar text-3xl text-neutral-600">
          {article.date}
        </h2>
        <h1 className="font-abcWhyteVar text-5xl text-white">
          {article.title}
        </h1>
        <div className="mx-auto md:max-w-[65%]">
          <Markdown
            options={{
              overrides: {
                img: {
                  component: ImageComponent,
                  props: { ...article.coverImage },
                },
                p: {
                  props: {
                    className: "font-abcWhyteVar text-white",
                  },
                },
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data: articles } = await client.query({
    query: QUERYPaths,
  });

  const paths = articles.articles.map((article: { slug: any }) => ({
    params: { slug: [article.slug] },
  }));

  return { paths, fallback: false };
}

const QUERYPaths = gql`
  {
    articles {
      slug
    }
  }
`;

const QUERYProps = gql`
  query ArticleBySlug($slug: String!) {
    articles(where: { slug: $slug }) {
      title
      smallTitle
      subtitle
      date
      coverImage {
        url
      }
      articleImage {
        url
      }
      content {
        markdown
      }
      slug
    }
  }
`;

export async function getStaticProps({ params }: any) {
  const slug = params.slug[0];
  const { data: articles } = await client.query({
    query: QUERYProps,
    variables: { slug },
  });

  const article = articles.articles[0];
  return {
    revalidate: 60,
    props: article,
  };
}

export default ArticlePage;
