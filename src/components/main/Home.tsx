import React, { useState } from 'react';
import StreamCard from './stream/StreamCard';
import { Stream } from '@/lib/types';
import { dict } from '@/lib/dict';
import { useRouter } from 'next/navigation';
import CustomDropdown from './SelectDropDown';

const streams: Stream[] = [
  {
    id: 1,
    thumbnail: '/images/spiderman.webp',
    streamer: { id: 1, name: 'Gamer123', avatarUrl: '/images/cat.jpg' },
    title: 'Gaming Live Stream',
    info: 'Join us for an exciting gaming session!',
    viewerCount: 33,
    duration: '1 hour',
    isLive: true,
    topic: 'gaming',
  },
  {
    id: 2,
    thumbnail: '/images/chef.jpg',
    streamer: { id: 2, name: 'ChefAlice', avatarUrl: '/images/alice.webp' },
    title: 'Cooking with Chef Alice',
    info: 'Learn to cook delicious meals with Chef Alice.',
    viewerCount: 56,
    duration: '1.5 hours',
    isLive: false,
    topic: 'cooking',
  },
  {
    id: 3,
    thumbnail: '/images/jam.jpg',
    streamer: { id: 3, name: 'MusicianMike', avatarUrl: '/images/mike.jpg' },
    title: 'Music Jam Session',
    info: 'Enjoy a live music jam session with our talented musicians.',
    viewerCount: 103,
    duration: '4 hours',
    isLive: true,
    topic: 'music',
  },
  {
    id: 4,
    thumbnail: '/images/teck.jpg',
    streamer: { id: 4, name: 'TechGuy', avatarUrl: '/images/ike.jpg' },
    title: 'Tech Talk Live',
    info: 'Discussing the latest in tech trends and news.',
    viewerCount: 65,
    duration: '1 hour',
    isLive: false,
    topic: 'technology',
  },
  // Add more streams as needed
];

const Home: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'offline'>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const router = useRouter();
  const selectedLanguage = 'english';
  const topics = [
    { value: 'all', label: dict[selectedLanguage].allTopics },
    ...Object.entries(dict[selectedLanguage].streamTopics).map(([key, topic]) => ({
      value: key,
      label: topic,
    })),
  ];
  const filteredStreams = streams.filter((stream) => {
    const isLiveFilter = filter === 'all' || (filter === 'live' ? stream.isLive : !stream.isLive);
    const isTopicFilter = topicFilter === 'all' || stream.topic === topicFilter;

    return isLiveFilter && isTopicFilter;
  });

  const handleClick = (id : number) => {
    router.push(`/main/stream/${id}`);
  }

  return (
    <div className="flex flex-col p-4 bg-light-background dark:bg-dark-background">
      <div className="flex items-center justify-start mb-4">
        <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mr-4">
          {dict[selectedLanguage].liveStreams}
        </h2>
        <CustomDropdown
          options={topics}
          value={topicFilter}
          onChange={(value) => setTopicFilter(value)}
          className='w-36'
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-light-primary dark:bg-dark-primary text-white' : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary'}`}
          onClick={() => setFilter('all')}
        >
          {dict[selectedLanguage].all}
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'live' ? 'bg-light-primary dark:bg-dark-primary text-white' : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary'}`}
          onClick={() => setFilter('live')}
        >
          {dict[selectedLanguage].live}
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'offline' ? 'bg-light-primary dark:bg-dark-primary text-white' : 'bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary'}`}
          onClick={() => setFilter('offline')}
        >
          {dict[selectedLanguage].offline}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredStreams.map((stream) => (
            <div key={stream.id} onClick={()=> handleClick(stream.id)}>
                <StreamCard type="visitor" key={stream.id} stream={stream} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
