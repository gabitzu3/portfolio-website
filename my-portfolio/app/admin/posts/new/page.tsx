import { PostEditor } from "@/components/blog/post-editor";
import { PageHeader } from "@/components/shared/page-header";



export default function NewPostPage() {

  return (

    <main className="flex-1 p-6">


      <PageHeader title="New Post" description="Create a new blog post." />
      <PostEditor />

    </main>

  );

}
