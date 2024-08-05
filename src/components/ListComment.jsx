function ListComment({ children, replies = false }) {
    let classes = "";
    if (replies) {
        classes = "replies flex flex-col gap-y-4 mt-4 pl-8 border-l-2";
    } else {
        classes = "flex flex-col gap-y-4";
    }

    return <ul className={classes}>{children}</ul>;
}

export default ListComment;
