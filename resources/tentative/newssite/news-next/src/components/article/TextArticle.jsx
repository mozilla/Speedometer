import ArticleHeader from "./ArticleHeader";
import ArticleImage from "./ArticleImage";
import ArticleTitle from "./ArticleTitle";
import ArticleContent from "./ArticleContent";

export default function TextArticle({ article }) {

    return (
        <article className={`column ${article.class ?? ""} article`}>
            <ArticleHeader className="article-header" text={article.header} />
            <section className="article-body">
                <ArticleImage className="article-image" image={article.image} />
                <ArticleTitle className="article-title truncate-singleline" text={article.title} />
                <ArticleContent type={article.type} content={article.content} />
            </section>
        </article>
    );
}