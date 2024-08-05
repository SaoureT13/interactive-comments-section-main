import { createContext, useContext, useReducer, useCallback } from "react";
import { useLocalStorage } from "react-use";
import { data } from "../data";

const LOCAL_STORAGE_KEY = "COMMENTS";

const CommentsContext = createContext(null);
const CommentsDispatchContext = createContext(null);

export function CommentsProvider({ children }) {
    const [comments, dispatch] = usePersistReducer();

    return (
        <CommentsContext.Provider value={comments}>
            <CommentsDispatchContext.Provider value={dispatch}>
                {children}
            </CommentsDispatchContext.Provider>
        </CommentsContext.Provider>
    );
}

export function useComments() {
    return useContext(CommentsContext);
}

export function useCommentsDispatch() {
    return useContext(CommentsDispatchContext);
}

function reducer(state, action) {
    let count = 0;

    state.forEach((comment) => {
        count++;

        if (comment.replies && comment.replies.length > 0) {
            count += comment.replies.length;
        }
    });

    const msg = new Date();

    function incrementScore(state, commentId) {
        return state.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    score: comment.score + 1,
                };
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: incrementScore(comment.replies, commentId),
                };
            } else {
                return comment;
            }
        });
    }

    function decrementScore(state, commentId) {
        return state.map((comment) => {
            if (comment.id == commentId) {
                if (comment.score > 0) {
                    return {
                        ...comment,
                        score: comment.score - 1,
                    };
                } else {
                    return comment;
                }
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: decrementScore(comment.replies, commentId),
                };
            } else {
                return comment;
            }
        });
    }

    function updateComment(state, commentId, newContent) {
        return state.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    content: newContent,
                };
            } else if (comment.replies && comment.replies.length > 0) {
                return {
                    ...comment,
                    replies: updateComment(
                        comment.replies,
                        commentId,
                        newContent
                    ),
                };
            } else {
                return comment;
            }
        });
    }

    function deleteComment(state, commentId) {
        return state
            .filter((comment) => comment.id !== commentId)
            .map((comment) => {
                if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: deleteComment(comment.replies, commentId),
                    };
                }
                return comment;
            });
    }

    function replyToComment(state, commentId, content) {
        return state.map((comment) => {
            const replies = Array.isArray(comment.replies)
                ? comment.replies
                : [];
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [
                        ...replies,
                        {
                            id: count + 1,
                            content: content,
                            createdAt: msg.toLocaleDateString(),
                            score: 0,
                            user: {
                                image: {
                                    png: data.currentUser.image.png,
                                    webp: data.currentUser.image.webp,
                                },
                                username: data.currentUser.username,
                            },
                            replyingTo: comment.user.username,
                            replies: [],
                        },
                    ],
                };
            } else if (replies.length > 0) {
                return {
                    ...comment,
                    replies: replyToComment(replies, commentId, content),
                };
            } else {
                return comment;
            }
        });
    }

    switch (action.type) {
        case "INIT_DATA":
            return action.comments;
        case "ADD_COMMENT":
            return [
                ...state,
                {
                    id: count + 1,
                    content: action.content,
                    createdAt: msg.toLocaleDateString(),
                    score: 0,
                    user: {
                        image: {
                            png: data.currentUser.image.png,
                            webp: data.currentUser.image.webp,
                        },
                        username: data.currentUser.username,
                    },
                    replies: [],
                },
            ];

        case "REPLY_TO_COMMENT": {
            return replyToComment(state, action.commentId, action.content);
        }
        case "IMCREMENT_COMMENT_SCORE": {
            return incrementScore(state, action.commentId);
        }

        case "DECREMENT_COMMENT_SCORE": {
            return decrementScore(state, action.commentId);
        }

        case "UPDATE_COMMENT": {
            return updateComment(state, action.commentId, action.newContent);
        }

        case "DELETE_COMMENT": {
            return deleteComment(state, action.commentId);
        }

        default:
            throw Error("Unknow action" + action.type);
    }
}

const usePersistReducer = () => {
    const [savedState, setSavedState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        data.comments
    );

    const reducerLocalStorage = useCallback(
        (state, action) => {
            const newState = reducer(state, action);

            setSavedState(newState);

            return newState;
        },
        [setSavedState]
    );

    return useReducer(reducerLocalStorage, savedState);
};
