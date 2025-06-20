import { useEffect, useRef, useState } from "react";
import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../assets/up-arrow.svg";
function Comment() {
  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        <>
          <input
            type="text"
            className="inputContainer__input first_input"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type..."
          />
          <div className="reply comment" onClick={onAddComment}>
            Comment
          </div>
        </>
      </div>
    </div>
  );
}

export default Comment;
