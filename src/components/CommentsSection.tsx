import { db } from "@/src/lib/db";
import { Comment } from "@prisma/client";
import PostComment from "./comments/PostComment";

interface CommentsSectionProps {
  postId: string;
}

const CommentsSection = async ({ postId }: CommentsSectionProps) => {
  // Fetch comments for the specified post
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      author: true,
      replies: {
        // Include first-level replies
        include: {
          author: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />

      <div className="flex flex-col gap-y-6 mt-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col">
            <div className="mb-2">
              <PostComment postId={postId} comment={comment} />
            </div>

            {/* Render replies */}
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="ml-2 py-2 pl-4 border-l-2 border-zinc-200"
              >
                <PostComment postId={postId} comment={reply} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
