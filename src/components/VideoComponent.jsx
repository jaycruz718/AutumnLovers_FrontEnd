import React from "react";
import myVideo from "../assets/Background1.mp4";

function VideoComponent(){
    return (
       <div className="video_wrap">
        <video src={myVideo} autoPlay muted loop></video>
        <h1>Happy Halloween</h1>
       </div> 
    );
}

export default VideoComponent;
