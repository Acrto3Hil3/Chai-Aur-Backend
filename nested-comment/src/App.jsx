import { useEffect } from "react";
import "./App.css";
import Comment from "./components/Comment";

const comments = {
  id: 1,
  items: [],
};
export default function App() {
  const [commentsData, setCommentsData] = useEffect(comments);

  return (
    <div className="App">
      <Comment comment={commentsData} />
    </div>
  );
}
