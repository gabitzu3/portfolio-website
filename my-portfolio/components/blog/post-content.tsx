import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
interface PostContentProps {
  content: string;
}
export function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose prose-neutral max-w-none dark:prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
