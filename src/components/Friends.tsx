import FriendList from "./FriendList";

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

export default function Friends({ friends, onHandleBill, selectedFriend }: FriendsProps) {
    return (
        <div>
            <FriendList selectedFriend={selectedFriend} friends={friends} onHandleBill={onHandleBill} />
        </div>
    )
}

