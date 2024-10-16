import React from "react";
import { streamViewType, User } from "@/lib/types";
import Chat from "./Chat";
import StreamDetails from "./StreamDetails";
import VideoPlayer from "./VideoPlayer";
import AboutStream from "./AboutStream";

const Stream: React.FC<{ id: number; type: streamViewType }> = ({ id, type }) => {
  const streamer: User = {
    name: "CoolStreamer123",
    isLive: false,
    avatarUrl: "/images/cat.jpg",
    followersCount: 1023,
  };

  return (
    <div className="flex flex-col md:flex-row bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary md:p-4 p-1 scrollbar-hide space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex-grow flex flex-col space-y-4 w-full">
        {/* Video Player */}
        <div className="flex-grow">
          <VideoPlayer streamer={streamer} title="Awesome Stream Title" isLive={true} />
        </div>

        {/* Stream Details */}
        <div className="flex-grow">
          <StreamDetails
            type={type}
            streamer={streamer}
            title="Awesome Stream Title"
            isLive={true}
            viewerCount={1234}
            duration="2h 30min"
          />
        </div>

        {/* About Stream Section with Fixed Width */}
        <div className="w-full">
          <AboutStream
            type={type}
            streamer={streamer}
            streamDetails={{ title: "Some gaming", description: "Spiderman new game!" }}
          />
        </div>
      </div>

      {/* Chat Section */}
      <div className="md:w-80 w-full mt-4 md:mt-0">
        <Chat isLive={streamer.isLive} />
      </div>
    </div>
  );
};

export default Stream;
