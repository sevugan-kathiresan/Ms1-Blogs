import React from "react";

const CommentsList = ({ comments }) => {

    const renderedComments = comments.map(comment =>{
        return(<li key={comment.id}>{comment.content}</li>);
    });

    return(
        <ul>
            {renderedComments}
        </ul>
    );
}

export default CommentsList;