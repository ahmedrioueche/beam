import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FaPeopleGroup } from 'react-icons/fa6';
import { dict } from '@/lib/dict';
import { FaSort } from 'react-icons/fa';

interface User {
  id: string;
  username: string;
  dateBlocked: string; // Format: 'MM/DD/YYYY'
}

const Community: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'username' | 'dateBlocked'>('username');
  const selectedLanguage = "english";

  // Mock data for demonstration
  const users: User[] = [
    { id: '1', username: 'antonio', dateBlocked: '07/12/2023' },
    { id: '2', username: 'michael', dateBlocked: '06/15/2023' },
    { id: '3', username: 'sarah', dateBlocked: '08/10/2023' },
    // Add more users as needed
  ];

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0;

    if (sortField === 'username') {
      comparison = a.username.localeCompare(b.username);
    } else if (sortField === 'dateBlocked') {
      const dateA = new Date(a.dateBlocked);
      const dateB = new Date(b.dateBlocked);
      comparison = dateA.getTime() - dateB.getTime();
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const toggleSort = (field: 'username' | 'dateBlocked') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc'); 
    }
  };

  const handleUnblock = (id: number) => {

  }

  return (
    <div className="dark:bg-dark-background bg-light-background text-light-text-primary dark:text-dark-text-primary p-6">
      <div className='flex flex-row '>
        <FaPeopleGroup className='mr-3 mt-1' size={22}/>
        <h1 className="text-2xl font-bold mb-4">{dict[selectedLanguage].community}</h1>
      </div>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Filter users..."
          className="w-64 dark:bg-dark-surface bg-light-surface text-light-text-primary dark:text-dark-text-primary border border-dark-text-secondary rounded-md py-2 px-4 pl-10 focus:outline-none focus:border-dark-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-text-secondary" size={18} />
      </div>

      <div className="dark:bg-dark-surface bg-light-surface rounded-md overflow-hidden">
        <div className="grid grid-cols-2 py-3 px-4 border-b border-dark-text-secondary">
          <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary" onClick={() => toggleSort('username')}>
            {dict[selectedLanguage].username}
            <FaSort size={18} className="ml-1" />
          </button>
          <button className="flex items-center text-light-text-secondary dark:text-dark-text-secondary" onClick={() => toggleSort('dateBlocked')}>
            {dict[selectedLanguage].dateBlocked}
            <FaSort size={18} className="ml-1" />
          </button>
        </div>

        {/* Display No Results if no users found */}
        {sortedUsers.length === 0 ? (
          <div className="dark:bg-dark-surface bg-light-surface text-light-text-secondary dark:text-dark-text-secondary p-8 text-center rounded-md">
            {dict[selectedLanguage].noResults}
          </div>
        ) : (
          sortedUsers.map(user => (
            <div key={user.id} className="grid grid-cols-2 py-3 px-4 border-b border-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-dark-primary text-white flex items-center justify-center mr-3">
                  {user.username[0].toUpperCase()}
                </div>
                {user.username}
              </div>
              <div className="flex items-center justify-between">
                <span>{user.dateBlocked}</span>
                <button onClick={()=> handleUnblock(parseInt(user.id, 10))} className="bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary transition duration-300 text-white py-2 px-4 rounded">
                  {dict[selectedLanguage].unblock}
                </button> 
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <button className="text-dark-text-secondary hover:text-dark-text-primary">{dict[selectedLanguage].previous}</button>
        <button className="text-dark-text-secondary hover:text-dark-text-primary">{dict[selectedLanguage].next}</button>
      </div>
    </div>
  );
};

export default Community;
