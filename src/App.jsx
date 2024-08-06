import { useState } from "react";
import "./App.css";
import { data } from "./data.jsx";
import Comment from "./components/Comment.jsx";
import CommentForm from "./components/CommentForm.jsx";
import ListComment from "./components/ListComment.jsx";
import { CurrentUserContext } from "./hooks/UserContext.jsx";
import { useComments } from "./hooks/CommentsContext.jsx";
import ActiveUserComment from "./components/ActiveUserComment.jsx";

function App() {
    const [currentUser, setCurrentUser] = useState(data.currentUser);

    const comments = useComments();

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <ListComment>
                    {comments.map((comment) => {
                        if (comment.user.username == currentUser.username) {
                            return (
                                <ActiveUserComment
                                    key={comment.id}
                                    id={comment.id}
                                    content={comment.content}
                                    createdAt={comment.createdAt}
                                    username={comment.user.username}
                                    image={comment.user.image.png}
                                    replyingTo={comment.replyingTo}
                                    score={comment.score}
                                />
                            );
                        }
                        return (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                content={comment.content}
                                createdAt={comment.createdAt}
                                username={comment.user.username}
                                image={comment.user.image.png}
                                replyingTo={comment.replyingTo}
                                score={comment.score}
                            />
                        );
                    })}
                </ListComment>
            </CurrentUserContext.Provider>
            <CommentForm />
        </>
    );
}

export default App;
