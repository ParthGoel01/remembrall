import Post from "@/components/post/post";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"; 

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;

  const memory = await prisma.memory.findUnique({
    where: { id },
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
  const postUrl = `https://remembrall-five.vercel.app/memory/${id}`;

  return (
    <Post
      {...transformedPost}
      postUrl={postUrl}
      currentUserProfilePicture={
        user?.imageUrl ||
        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
      }
    />
  );
}
