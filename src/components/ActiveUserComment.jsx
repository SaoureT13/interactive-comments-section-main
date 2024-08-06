import { memo, useState } from "react";
import { useCommentsDispatch } from "../hooks/CommentsContext";
import DateComponent from "./DateComponent.jsx";

const ActiveUserComment = memo(function ActiveUserComment({
    id,
    content,
    createdAt,
    username,
    image,
    replyingTo,
    score,
}) {
    const dispatch = useCommentsDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [text, setText] = useState(
        replyingTo ? `@${replyingTo} ${content}` : content
    );

    const handleIncrementScore = (commentId) => {
        dispatch({ type: "IMCREMENT_COMMENT_SCORE", commentId: commentId });
    };

    const handleDecrementScore = (commentId) => {
        dispatch({ type: "DECREMENT_COMMENT_SCORE", commentId: commentId });
    };

    const handleUpdateComment = (commentId) => {
        if (text == false) {
            setContentError(true);
            return;
        }
        let newContent = text.trim().split(" ");
        if (newContent.length == 1 && newContent[0].includes("@")) {
            setContentError(true);
            return;
        }
        if (newContent[0].includes("@")) {
            newContent = newContent.slice(1).join(" ");
        } else {
            newContent = newContent.join(" ");
        }

        dispatch({
            type: "UPDATE_COMMENT",
            commentId: commentId,
            newContent: newContent,
        });

        setText(replyingTo ? `@${replyingTo} ${newContent}` : newContent);
        setContentError(false);
        setIsEditing((t) => !t);
    };

    const handleDeleteComment = (commentId) => {
        dispatch({ type: "DELETE_COMMENT", commentId: commentId });
    };

    let component;
    if (isEditing) {
        component = (
            <div className="">
                <textarea
                    placeholder="Add a comment..."
                    className={`text-Grayish_Blue placeholder:text-Grayish_Blue border-[1px] px-6 py-2 w-full rounded-lg h-[120px] focus:border-Moderate_blue focus:caret-Moderate_blue focus:ring-0 focus:outline-0 resize-none ${
                        contentError
                            ? "border-red-400 focus:border-red-400"
                            : ""
                    }`}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></textarea>
                {contentError && (
                    <span className="text-sm text-red-500">
                        You can't submit comment with empty content
                    </span>
                )}
                <div className="flex mt-4">
                    <button
                        onClick={() => {
                            handleUpdateComment(id);
                        }}
                        className="ml-auto bg-Moderate_blue text-white font-medium px-7 py-3 rounded-lg hover:bg-Light_grayish_blue transition duration-300 ease-in-out "
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        );
    } else {
        component = (
            <p>
                {replyingTo && (
                    <span className="text-Moderate_blue font-medium">
                        @{replyingTo}
                    </span>
                )}{" "}
                {content}
            </p>
        );
    }

    return (
        <li className="w-full list-none">
            <div
                id={`comment-${id}`}
                className="w-full bg-white p-5 rounded-md grid grid-areas-layout sm:grid-cols-layout gap-x-4 gap-y-4 sm:grid-areas-sm_layout"
            >
                <div className="grid-in-user flex items-center gap-3">
                    <span className="w-[40px] h-[40px] flex-shrink-0">
                        <img src={image} alt={username} className="w-full" />
                    </span>
                    <div className="flex gap-x-3 items-center flex-wrap">
                        <p className="text-Dark_blue font-medium">{username}</p>
                        <span className="bg-Moderate_blue px-1 text-white font-medium text-[12px] rounded-sm">
                            you
                        </span>
                        <p className="text-Grayish_Blue">
                            {<DateComponent date={createdAt} />}
                        </p>
                    </div>
                </div>
                <div className="grid-in-content text-Grayish_Blue">
                    {component}
                </div>
                <div className="grid-in-reply flex justify-end">
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => handleDeleteComment(id)}
                            className="group flex items-center gap-2 text-Soft_Red hover:text-Pale_red font-medium transition duration-150 ease-in-out"
                        >
                            <svg
                                height="14"
                                width="12"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
                            </svg>{" "}
                            Delete
                        </button>
                        <button
                            onClick={() => setIsEditing((t) => !t)}
                            className="group flex items-center gap-2 text-Moderate_blue hover:text-Light_grayish_blue font-medium transition duration-150 ease-in-out"
                        >
                            <svg
                                height="14"
                                width="14"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" />
                            </svg>{" "}
                            Edit
                        </button>
                    </div>
                </div>
                <div className="grid-in-react w-full sm:w-auto text-Moderate_blue font-medium">
                    <div className="flex sm:flex-col items-center justify-between py-2 sm:h-[90px] bg-Very_light_gray rounded-lg">
                        <button
                            onClick={() => handleIncrementScore(id)}
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
                        {score}
                        <button
                            onClick={() => handleDecrementScore(id)}
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
            {/* {replies} */}
        </li>
    );
});

export default ActiveUserComment;
