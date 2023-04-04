import { dbService } from "fBase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("delete?");
    // window.confirm => confirm alert을 띄워 주고 t/f 반환
    console.log(ok);
    if (ok) {
      await deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={newTweet} required onChange={onChange} />
            <input type="submit" value="update" />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>

          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Del</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Tweet;
