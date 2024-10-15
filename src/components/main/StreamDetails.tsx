import { dict } from "@/lib/dict";
import { streamViewType, User } from "@/lib/types";
import { Clock, Heart, Users } from "lucide-react";
import { useState } from "react";

const StreamDetails: React.FC<{
  type: streamViewType;
  streamer: User;
  title: string;
  isLive: boolean;
  viewerCount: number;
  duration: string;
}> = ({ type, streamer, title, isLive, viewerCount, duration }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const toggleFollow = (): void => setIsFollowing(!isFollowing);
  const selectedLanguage = "english";

  return (
    <div className="p-4 dark:bg-dark-surface bg-light-background text-light-text-primary dark:text-dark-text-primary rounded-b-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-start space-x-3 w-full md:w-auto">
          <div className="relative">
            <img
              src={streamer.avatarUrl}
              alt={streamer.name}
              className={`w-12 h-12 rounded-full border-2 ${
                isLive ? "border-red-500 dark:border-red-500" : "border-light-primary dark:border-dark-primary"
              }`}
            />
            {isLive && (
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 rounded-full border-2 border-dark-surface text-[6px] font-bold text-white">
                {dict[selectedLanguage].liveCapital}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-f1 font-semibold">{title}</h2>
            <h3 className="text-base font-f2 text-light-text-secondary dark:text-dark-text-secondary font-medium leading-tight mt-1">
              {streamer.name}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>
                  {viewerCount} {dict[selectedLanguage].viewers}
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={toggleFollow}
          className={`flex text-lg mt-4 md:mt-0 ${
            type === "streamerView" ? "disabled cursor-auto hover:bg-light-primary dark:hover:bg-dark-primary" : "hover:bg-light-secondary dark:hover:bg-dark-secondary cursor-pointer"
          } items-center space-x-1 px-4 py-2 rounded-full transition-colors duration-300 bg-light-primary dark:bg-dark-primary text-dark-text-primary`}
        >
          <Heart size={16} className={isFollowing ? "fill-current" : ""} />
          {type === "streamerView" ? (
            <span className="font-f2 mt-1">{streamer.followersCount}</span>
          ) : (
            <span className="font-f2">{isFollowing ? dict[selectedLanguage].unfollow : dict[selectedLanguage].follow}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default StreamDetails;
