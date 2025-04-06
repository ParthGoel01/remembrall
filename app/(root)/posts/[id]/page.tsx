import Post from "@/components/post/post";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"; 

export default async function PostPage({ params }: { params: {id:string}; }){
  const memory = await prisma.memory.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      media: true,
      comments: {
        include: {
          author: true,
        },
      },
      memoryTags: {
        include: { tag: true },
      },
      likes: true,
    },
  });

  if (!memory) return <div>Memory not found</div>;

  const transformedPost = {
    profilePicture: memory.author.profilePicture,
    username: memory.author.name,
    timestamp: memory.createdAt.toISOString(),
    mediaUrls: memory.media.map(m => m.url),
    mediaTypes: memory.media.map(m => m.type),
    heading: memory.heading,
    tags: memory.memoryTags.map(mt => mt.tag.tagName),
    description: memory.description ?? "",
    likes: memory.likes.length,
    comments: memory.comments.map(comment => ({
      username: comment.author.name,
      timestamp: comment.timestamps.toISOString(),
      text: comment.content,
      profilePicture: comment.author.profilePicture,
    })),
  };

  const user = await currentUser();
  const postUrl = `https://remembrall-five.vercel.app/memory/${params.id}`;
  // Test Url - http://localhost:3000/posts/7f4c6513-5af3-4495-bb03-b69439e7e853
  return <Post {...transformedPost} postUrl={postUrl} currentUserProfilePicture={user?.imageUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}/>;
}
