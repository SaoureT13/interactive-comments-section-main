import ListComment from "./ListComment";
import { useCommentsDispatch } from "../hooks/CommentsContext";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../hooks/UserContext";
import ActiveUserComment from "./ActiveUserComment";
import CommentForm from "./CommentForm";
import DateComponent from "./DateComponent.jsx";

function Comment({ comment }) {
    const currentUser = useContext(CurrentUserContext);
    const dispatch = useCommentsDispatch();
    const [isReplying, setIsReplying] = useState(false);

    const handleIncrementScore = (commentId) => {
        dispatch({ type: "IMCREMENT_COMMENT_SCORE", commentId: commentId });
    };

    const handleDecrementScore = (commentId) => {
        dispatch({ type: "DECREMENT_COMMENT_SCORE", commentId: commentId });
    };

    const handleToggleIsReplying = () => {
        setIsReplying((t) => !t);
    };

    let replies;
    if (comment.replies) {
        replies = (
            <ListComment replies={true}>
                {comment.replies.map((comment) => {
                    if (comment.user.username == currentUser.username) {
                        return (
                            <ActiveUserComment
                                key={comment.id}
                                comment={comment}
                            />
                        );
                    }
                    return <Comment key={comment.id} comment={comment} />;
                })}
            </ListComment>
        );
    }

    let replyingTo;
    if (comment.replyingTo) {
        replyingTo = (
            <span className="text-Moderate_blue font-medium">
                @{comment.replyingTo}
            </span>
        );
    }

    return (
        <li className="w-full list-none">
            <div
                id={`comment-${comment.id}`}
                className="w-full bg-white p-5 rounded-md grid grid-areas-layout sm:grid-cols-layout gap-x-4 gap-y-4 sm:grid-areas-sm_layout"
            >
                <div className="grid-in-user flex items-center gap-3">
                    <span className="w-[40px] h-[40px] flex-shrink-0">
                        <img
                            src={comment.user.image.png}
                            alt={comment.user.username}
                            className="w-full"
                        />
                    </span>
                    <div className="flex gap-x-3 items-center flex-wrap">
                        <p className="text-Dark_blue font-medium">
                            {comment.user.username}
                        </p>
                        <p className="text-Grayish_Blue">
                            {<DateComponent date={comment.createdAt} />}
                        </p>
                    </div>
                </div>
                <div className="grid-in-content text-Grayish_Blue">
                    <p>
                        {replyingTo} {comment.content}
                    </p>
                </div>
                <div className="grid-in-reply flex justify-end">
                    <button
                        onClick={handleToggleIsReplying}
                        className="group flex items-center gap-2 text-Moderate_blue hover:text-Light_grayish_blue font-medium transition duration-150 ease-in-out"
                    >
                        <svg
                            className="text-[#5357B6] fill-current group-hover:text-Light_grayish_blue transition duration-150 ease-in-out"
                            height="13"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                        >
                            <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" />
                        </svg>{" "}
                        Reply
                    </button>
                </div>
                <div className="grid-in-react w-full sm:w-auto text-Moderate_blue font-medium">
                    <div className="flex sm:flex-col items-center justify-between py-2 sm:h-[90px] bg-Very_light_gray rounded-lg">
                        <button
                            onClick={() => handleIncrementScore(comment.id)}
                            className="plus px-3 mr-2 sm:m-0 text-Light_grayish_blue hover:text-Moderate_blue"
                        >
                            <svg
                                className="transition duration-150 ease-in-out"
                                height="11"
                                width="11"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
                            </svg>
                        </button>
                        {comment.score}
                        <button
                            onClick={() => handleDecrementScore(comment.id)}
                            className="minus px-3 ml-2 sm:m-0 text-Light_grayish_blue hover:text-Moderate_blue"
                        >
                            <svg
                                className="transition duration-150 ease-in-out"
                                height="3"
                                width="11"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isReplying && (
                <CommentForm
                    commentReply={true}
                    commentId={comment.id}
                    onHandleToggleIsReplying={handleToggleIsReplying}
                />
            )}
            {replies}
        </li>
    );
}

export default Comment;
