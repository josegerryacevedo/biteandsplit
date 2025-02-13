import { useState } from "react"
import { Button } from "./Button";

interface FormProps {
    onAddFriend: (friend: { id: number; name: string; amount: number; url: string }) => void;
}

export default function AddFriendForm({ onAddFriend }: FormProps) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('https://i.pravatar.cc/48?u=');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Regular expression pattern for the URL
        const urlPattern = /^https:\/\/i\.pravatar\.cc\//;

        // if input field is empty or URL doesn't match the pattern, return false
        if (!name.trim() || !url.trim() || !urlPattern.test(url)) {
            return false;
        }
        const id = Date.now();
        const newFriend = {
            id,
            amount: 0,
            name,
            url: `${url}${id}`
        };

        onAddFriend(newFriend);

        setName('');
        setUrl('https://i.pravatar.cc/48?u=');
    }

    return (
        <form
            className="p-4 border flex flex-col gap-y-3 border-slate-200 rounded-md w-full"
            onSubmit={handleSubmit}
        >
            {/* Friend name input */}
            <div>
                <label
                    className="text-slate-800 font-semibold"
                    htmlFor="name"
                >
                    Friend Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your friend name"
                    className="w-full mt-2.5 px-3 py-2.5 bg-slate-200 rounded focus:outline-slate-700 text-slate-700"
                />
            </div>
            {/* Image url input */}
            <div>
                <label
                    className="text-slate-800 font-semibold"
                    htmlFor="image"
                >
                    Image Url
                </label>
                <input
                    id="image"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Type image url"
                    className="w-full mt-2.5 px-3 py-2.5 bg-slate-200 rounded focus:outline-slate-700 text-slate-700"
                />
            </div>
            <Button
                className="bg-slate-800 py-2.5 text-sm text-white font-semibold rounded cursor-pointer"
            >
                Add friend
            </Button>
        </form>
    )
}