import React, { useState } from "react";
import "./comment.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

const Comment = ({ comments, fullComments, setComments }) => {
  const [isExpanded, setIsExpanded] = useState({});

  const handleExpanded = (index) => {
    setIsExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // safer than using isExpanded[index]
    }));
  };

  const addCommentByNode = (target, fullComments, newComment) => {
    return fullComments.map((comment) => {
      if (comment.id === target.id) {
        return {
          ...comment,
          replies: [...comment.replies, newComment],
        };
      }
      return {
        ...comment,
        replies: addCommentByNode(target, comment.replies, newComment),
      };
    });
  };

  const deleteCommentByNode = (targetComment, comments) => {
    return comments
      .filter((comment) => comment.id !== targetComment.id)
      .map((comment) => ({
        ...comment,
        replies: deleteCommentByNode(targetComment, comment.replies),
      }));
  };

  const handleCommentDelete = (parentComment) => {
    const newComments = deleteCommentByNode(
      parentComment,
      fullComments
    );
    setComments(newComments);
  };

  const handleCommentAdd = (parentComment) => {
    const comment = prompt("Enter new comment");
    console.log(comment);

    const newComment = {
      id: Math.floor(Date.now() * Math.random()),
      text: comment,
      author: "New Comment",
      replies: [],
    };

    const newComments = addCommentByNode(
      parentComment,
      fullComments,
      newComment
    );
    setComments(newComments);
  };

  return comments.map((comment, index) => (
    <div key={index} className="comment-box">
      <div className="comment" onClick={(e) => handleExpanded(index)}>
        <b>{comment.author}</b>: {comment.text}
        <button onClick={(e) => handleCommentAdd(comment)}>Add</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCommentDelete(comment);
          }}
        >
          Delete
        </button>
        {comment.replies?.length > 0 ? (
          isExpanded[index] ? (
            <SlArrowDown />
          ) : (
            <SlArrowUp />
          )
        ) : (
          ""
        )}
      </div>

      {isExpanded[index] && comment.replies?.length > 0 && (
        <div className="replies">
          <Comment
            comments={comment.replies}
            fullComments={fullComments}
            setComments={setComments}
          />
        </div>
      )}
    </div>
  ));
};

export default Comment;
