import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    const getOTP = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/v1/getVdoCipherOTP", {
          videoId: videoUrl,
        });
        setVideoData({
          otp: res.data.otp,
          playbackInfo: res.data.playbackInfo,
        });
      } catch (error) {
        console.error("Failed to fetch OTP and Playback Info", error);
      }
    };
    getOTP();
  }, [videoUrl]);

  const { otp, playbackInfo } = videoData;

  return (
    <div style={{ paddingTop: "41%", position: "relative", overflow:"hidden" }}>
        
      {otp && playbackInfo && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&player=TLnrW5X5n99Db3ui`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
