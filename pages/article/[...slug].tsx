import { gql } from "@apollo/client";
import { client } from "@/apolloClient";
import { ProjectItem } from "@/components/projects/ProjectItem";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RichText } from "@graphcms/rich-text-react-renderer";

const ArticlePage = (article: ProjectItem) => {
  return (
    <Layout>
      <section className="flex flex-col px-5 font-abcWhyte text-base text-white md:text-lg">
        <div className="mb-10 flex w-full flex-col gap-5 rounded-lg bg-accent-dark p-2 pb-0 md:min-h-[20vh] md:p-5 md:pb-0">
          <div className="mb-2 flex cursor-pointer hover:underline md:hidden">
            <Link href={"/#home"}>
              <li className="flex items-center justify-center">
                <span className="mr-2 flex items-center justify-center">
                  <IoIosArrowBack />
                </span>
                Article
              </li>
            </Link>
          </div>
          <ol className="mb-2 hidden list-none md:flex">
            <div className="flex cursor-pointer hover:underline">
              <Link href={"/#home"}>
                <li className="flex">
                  Home
                  <span className="ml-2 flex items-center justify-center text-xl">
                    <IoIosArrowForward />
                  </span>
                </li>
              </Link>
            </div>
            <div className="flex cursor-pointer hover:underline">
              <Link href={"/articles"}>
                <li className="flex">
                  Article
                  <span className="mx-2 flex items-center justify-center text-xl">
                    <IoIosArrowForward />
                  </span>
                </li>
              </Link>
            </div>
            <div className="flex cursor-pointer hover:underline">
              <Link href={`/article/${article.slug}`}>
                <li className="flex">{article.title}</li>
              </Link>
            </div>
          </ol>
          <div className="mx-auto flex max-w-full flex-col md:max-w-[75%]">
            <h2 className="font-abcWhyteVar text-xl text-neutral-200">
              {article.date}
            </h2>
            <h1 className="mb-4 font-abcWhyteVar text-3xl text-white md:text-7xl">
              {article.title}
            </h1>
            <p className="">{article.summary}</p>
          </div>

          <div className="relative mx-auto flex min-h-[100px] w-[95%] rounded-lg bg-black object-cover md:min-h-[500px] md:max-w-[75%]">
            <Image
              layout="fill"
              objectFit="cover"
              src={article.articleImage.url}
            />
          </div>
        </div>
        <article className="flex flex-col items-center justify-center">
          <div className="container prose prose-base w-full text-white prose-headings:text-neutral-300 prose-pre:bg-neutral-900 prose-pre:p-0 prose-img:rounded-lg md:prose-lg">
            <RichText
              content={article.content.raw.children}
              renderers={{
                code_block: ({ children }) => (
                  <pre>
                    <code className="js">{children}</code>
                  </pre>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
          {article.demoVideo && article.demoVideo.url.length > 0 ? (
            <video
              src={article.demoVideo.url + "#t=0.001"}
              preload="metadata"
              controls
            ></video>
          ) : (
            <></>
          )}
        </article>

        <div className="h-[20vh] w-full"></div>
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
      summary
      date
      coverImage {
        url
      }
      articleImage {
        url
      }
      content {
        raw
      }
      demoVideo {
        url
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
