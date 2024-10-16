import React, { useState } from "react";
import { dict } from "@/lib/dict";
import { streamViewType, User } from "@/lib/types";

interface AboutStreamProps {
  type: streamViewType;
  streamer: User;
  streamDetails: { title: string; description: string };
}

const AboutStream: React.FC<AboutStreamProps> = ({ type, streamer, streamDetails }) => {
  const selectedLanguage = "english";
  const [title, setTitle] = useState(streamDetails.title || "");
  const [description, setDescription] = useState(streamDetails.description || "");

  const handleSave = () => {
    // Add functionality to save updated stream title and description
    alert("Stream info updated!");
  };

  return (
    <div className="bg-light-surface dark:bg-dark-surface rounded-lg shadow-lg p-4 h-full w-1000">
      {/* Streamer View */}
      {type === "streamerView" ? (
        streamer.isLive ? (
          <div>
            <h2 className="text-lg font-f1 font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].editStreamInfo}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                  Stream Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                  Stream Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-light-background dark:bg-dark-background border-2 border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-light-primary dark:focus:border-dark-primary text-light-text-primary dark:text-dark-text-primary focus:ring-primary focus:border-primary"
                  rows={4}
                />
              </div>

              <button
                type="button"
                onClick={handleSave}
                className="w-full py-2 px-4 bg-primary bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300 text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-f1 font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
              {dict[selectedLanguage].goLiveNow}
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              You are not currently live. Start a live stream to engage with your audience! 
            </p>
            <button className="mt-4 py-2 px-4 bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300 text-white font-semibold rounded-md hover:bg-secondary">
              Go Live Now
            </button>
          </div>
        )
      ) : (
        /* User View */
        <div>
          <h2 className="text-lg font-f1 font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
            {dict[selectedLanguage].aboutStream}
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            {streamDetails.description || "No description available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutStream;
