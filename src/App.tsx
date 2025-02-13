import './App.css';
import Friends from './components/Friends';
import { Button } from './components/Button';
import { useState } from 'react';
import AddFriendForm from './components/AddFriendForm';
import SplitBillForm from './components/SplitBillForm';

const friendsList = [
  { id: 123, name: 'Alice', amount: -7, url: "https://i.pravatar.cc/48?u=118836" },
  { id: 124, name: 'Bob', amount: 20, url: "https://i.pravatar.cc/48?u=933372" },
  { id: 125, name: 'Charlie', amount: 0, url: "https://i.pravatar.cc/48?u=499476" }
];

interface Friend {
  id: number;
  name: string;
  amount: number;
  url: string;
}

function App() {
  const [isShowAddFriendForm, setShowAddFriendForm] = useState<boolean>(false);
  const [friends, setFriends] = useState<Friend[]>(friendsList);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const handleShowAddFriend = () => {
    setShowAddFriendForm(!isShowAddFriendForm);
  };

  const handleAddFriend = (friend: Friend) => {
    setFriends([...friends, friend]);
    setShowAddFriendForm(false);
  };

  const handleSelection = (friend: Friend) => {
    setSelectedFriend((selected) => selected?.id === friend.id ? null : friend);
    setShowAddFriendForm(false);
  };

  const handleSplitBill = (value: { amount: number; }) => {
    console.log(value.amount)
    setShowAddFriendForm(false);
    setFriends((friends) =>
      friends.map(friend =>
        friend.id === selectedFriend?.id
          ? { ...friend, amount: friend.amount + value.amount }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <>
      <div className='min-h-screen flex-col flex items-center justify-center'>
        <h1 className='text-3xl mb-12 font-bold text-slate-400'><span className='text-slate-800 text-xl font-extrabold -mr-2'>BITE</span> & <span className='text-slate-800 text-4xl font-extrabold -ml-2'>SPLIT</span></h1>
        <div className='flex gap-x-6'>
          <div className='flex flex-col items-end gap-y-6'>
            {/* Friend list */}
            <Friends
              friends={friends}
              selectedFriend={selectedFriend}
              onHandleBill={handleSelection}
            />
            {/* Add friend form */}
            <div
              className={`grid w-full transition-all duration-500 ease-in-out overflow-hidden ${isShowAddFriendForm ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
              <div className="min-h-0">
                <AddFriendForm onAddFriend={handleAddFriend} />
              </div>
            </div>
            {/* Button to view add friend form */}
            <Button
              onClick={handleShowAddFriend}
              className='text-white text-xs hover: cursor-pointer hover:bg-slate-600 font-medium bg-slate-800 p-2 rounded'
            >
              {isShowAddFriendForm === false ? "Add Friend" : "Close"}
            </Button>
          </div>
          {/* Split bill form */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedFriend !== null
              ? 'opacity-100 scale-100' // Expand height and fade in
              : 'opacity-0 scale-95' // Collapse height and fade out
              }`}
          >
            {selectedFriend !== null && (
              <SplitBillForm selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />
            )}
          </div>
        </div>
      </div >
    </>
  );
}

export default App;