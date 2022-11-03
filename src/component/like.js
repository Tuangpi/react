import { useCreate, useRecordContext } from "react-admin";
const LikeButton = () => {
  const record = useRecordContext();
  const like = { postId: record.id };
  const [create, { isLoading, error }] = useCreate("likes", { data: like });
  const handleClick = () => {
    create();
  };
  if (error) {
    return <p>ERROR</p>;
  }
  return (
    <button onClick={handleClick}>
      Like
    </button>
  );
};

export {LikeButton};
