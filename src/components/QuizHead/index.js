import Head from "next/head";

function QuizHead({ title, description, imageUrl }) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} key="title" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="description"
        />
      )}
      {imageUrl && <meta property="og:image" content={imageUrl} key="image" />}
    </Head>
  );
}

export default QuizHead;
