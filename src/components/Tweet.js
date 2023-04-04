import React from "react";
const Tweet = ({ tweetObj, isOwner }) => (
  <div>
    <h4>{tweetObj.text}</h4>
    {/* isOwner 가 true 이면 button 생성 */}
    {isOwner && (
      <>
        <button>Del</button>
        <button>Edit</button>
      </>
    )}
  </div>
);
export default Tweet;
