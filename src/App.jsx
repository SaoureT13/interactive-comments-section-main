import { useState } from "react";
import "./App.css";
import { data } from "./data.jsx";
import Comment from "./components/Comment.jsx";
import CommentForm from "./components/CommentForm.jsx";
import ListComment from "./components/ListComment.jsx";
import { CurrentUserContext } from "./hooks/UserContext.jsx";
import { useComments, useCommentsDispatch } from "./hooks/CommentsContext.jsx";
import ActiveUserComment from "./components/ActiveUserComment.jsx";

function App() {
    const [currentUser, setCurrentUser] = useState(data.currentUser);

    const comments = useComments();
    const dispatch = useCommentsDispatch();

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <ListComment>
                    {comments.map((comment) => {
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
            </CurrentUserContext.Provider>
            <CommentForm />
        </>
    );
}

export default App;
