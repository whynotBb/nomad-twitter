import React, { useState } from "react";
import { dbService } from "fBase";
import { addDoc, collection } from "firebase/firestore";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("click");
    console.log(tweet);

    await addDoc(collection(dbService, "tweets"), {
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };
  const onChange = (event) => {
    //구조분해할당 - event 로 부터 target 객체 안에 있는 value 가져 와줘
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="What's your mind?"
          value={tweet}
          maxLength={120}
        />
        <input type="submit" value="tweet" />
      </form>
    </div>
  );
};
export default Home;
