import { useState } from "react";
import { useCommentsDispatch } from "../hooks/CommentsContext";

function CommentForm({
    commentReply = false,
    commentId,
    onHandleToggleIsReplying,
}) {
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState(false);
    const dispatch = useCommentsDispatch();

    const handleReplyToComment = () => {
        if (!content) {
            setContentError(true);
            return;
        }
        dispatch({
            type: "REPLY_TO_COMMENT",
            content: content,
            commentId: commentId,
        });
        setContent("");
        setContentError(false);
    };

    function handleSetContent(e) {
        setContent((t) => e.target.value);
    }

    function handleResetContent() {
        setContent("");
    }

    function handleAddTask() {
        return dispatch({ type: "ADD_COMMENT", content: content });
    }

    let button = commentReply ? (
        <button
            onClick={() => {
                handleReplyToComment();
            }}
            className="bg-Moderate_blue text-white font-medium px-7 py-3 rounded-lg hover:bg-Light_grayish_blue transition duration-300 ease-in-out"
        >
            REPLY
        </button>
    ) : (
        <button
            onClick={() => {
                handleAddTask(), handleResetContent();
            }}
            className="bg-Moderate_blue text-white font-medium px-7 py-3 rounded-lg hover:bg-Light_grayish_blue transition duration-300 ease-in-out"
        >
            SEND
        </button>
    );

    return (
        <div className="relative bg-white mt-6 p-5 rounded-md flex flex-col sm:flex-row flex-wrap gap-4">
            <div className="order-2 sm:order-1">
                <img
                    src="images/avatars/image-juliusomo.png"
                    alt=""
                    width={40}
                    height={40}
                />
            </div>
            <div className="flex-1 flex-shrink-0 order-1 sm:order-2">
                <textarea
                    name=""
                    id=""
                    placeholder="Add a comment..."
                    className={`text-Grayish_Blue placeholder:text-Grayish_Blue border-[1px] px-6 py-2 w-full rounded-lg h-[120px] focus:border-Moderate_blue focus:caret-Moderate_blue focus:ring-0 focus:outline-0 resize-none ${
                        contentError
                            ? "border-red-400 focus:border-red-400"
                            : ""
                    }`}
                    value={content}
                    onChange={(e) => handleSetContent(e)}
                ></textarea>
                {contentError && (
                    <span className="text-sm text-red-500">
                        You can't submit comment with empty content
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-y-2 order-2 sm:order-3 absolute bottom-5 right-5 sm:static">
                {button}
                {commentReply && (
                    <button
                        onClick={onHandleToggleIsReplying}
                        className="bg-Soft_Red text-white font-medium px-7 py-3 rounded-lg hover:bg-Pale_red transition duration-300 ease-in-out"
                    >
                        CANCEL
                    </button>
                )}
            </div>
        </div>
    );
}

export default CommentForm;
