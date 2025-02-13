import { Button } from "./Button";

interface Friend {
    id: number;
    name: string;
    amount: number;
    url: string;
}

interface FriendsProps {
    friends: Friend[];
    onHandleBill: (friend: Friend) => void;
    selectedFriend: Friend | null;
}

export default function FriendList({ friends, onHandleBill, selectedFriend }: FriendsProps) {
    const isSelected = (friendId: number) => selectedFriend?.id === friendId;

    return (
        <>
            <div className="max-h-[282px] overflow-y-auto p-4 flex flex-col gap-y-4 border border-slate-200 rounded-md">
                {friends.slice().reverse().map((friend) => (
                    <div key={friend.id} className="w-80 bg-slate-200 flex justify-between items-center shadow-xs p-3 rounded-md">
                        <div className="flex items-center gap-x-3">
                            <img className="rounded-full w-12 h-12" src={friend.url} alt={friend.name} />
                            <div>
                                <h2 className="font-bold text-lg text-slate-700">{friend.name}</h2>
                                {friend.amount < 0 && (
                                    <p
                                        className="text-red-500 text-sm"
                                    >
                                        You owe {friend.name} {Math.abs(friend.amount)}
                                    </p>
                                )}
                                {friend.amount > 0 && (
                                    <p
                                        className="text-green-500 text-sm"
                                    >
                                        {friend.name} owes you {Math.abs(friend.amount)}
                                    </p>
                                )}
                                {friend.amount === 0 && (
                                    <p
                                        className="text-gray-500 text-sm"
                                    >
                                        You and {friend.name} are even
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            onClick={() => onHandleBill(friend)}
                            className={`text-xs text-white py-1 px-3 rounded hover:bg-slate-800 cursor-pointer ${isSelected(friend.id) ? "bg-slate-800" : "bg-slate-600"}`}
                        >
                            {isSelected(friend.id) ? "Close" : "Select"}
                        </Button>
                    </div>
                ))}
            </div >
        </>
    );
}