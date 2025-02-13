import { useState } from "react";
import { Button } from "./Button";

interface SplitBillProps {
    selectedFriend: {
        id: number;
        name: string;
        amount: number;
        url: string;
    };
    // pass the amount
    onSplitBill: (amount: { amount: number }) => void;
}

const SplitBillForm = ({ selectedFriend, onSplitBill }: SplitBillProps) => {
    const [bill, setBill] = useState<number>(0);
    const [paidByUser, setPaidByUser] = useState<number>(0);
    const [whoIsPaying, setWhoIsPaying] = useState<string>("user");


    const totalFriendBill = bill - paidByUser;

    const handleBill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!bill || !paidByUser) return;
        onSplitBill({ amount: whoIsPaying === "user" ? totalFriendBill : -paidByUser });
    }

    return (
        <>
            <form className="bg-slate-200 p-4 rounded shadow-xs text-slate-700" onSubmit={handleBill}>
                <h1 className="font-bold text-slate-800 mb-6">Split bill w/ {selectedFriend.name}</h1>
                <div className="flex flex-col gap-y-4 items-end">
                    <div className="flex justify-between items-center w-72">
                        <label className="font-semibold text-sm" htmlFor="bill-value">Bill value</label>
                        <input
                            type="text"
                            id="bill-value"
                            value={bill}
                            onChange={(e) => setBill(Number(e.target.value))}
                            className="w-24 bg-white p-1 rounded focus:outline-slate-700 text-center font-semibold"
                        />
                    </div>
                    <div className="flex justify-between items-center w-72 mt-3">
                        <label className="font-semibold text-sm" htmlFor="my-expenses">Your expense</label>
                        <input
                            type="text"
                            id="my-expenses"
                            value={paidByUser}
                            onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}
                            className="w-24 bg-white p-1 rounded focus:outline-slate-700 text-center font-semibold"
                        />
                    </div>
                    <div className="flex justify-between items-center w-72 mt-3">
                        <label className="font-semibold text-sm" htmlFor="friend-bill">{selectedFriend.name}'s expense</label>
                        <input
                            type="text"
                            id="friend-bill"
                            value={totalFriendBill}
                            className="w-24 bg-white p-1 rounded text-center focus:outline-none font-semibold" readOnly
                        />
                    </div>
                    <div className="flex justify-between items-center w-72 mt-3">
                        <label className="font-semibold text-sm" htmlFor="who-pay-bill">Who is paying the bill</label>
                        <select
                            id="who-pay-bill"
                            value={whoIsPaying}
                            onChange={(e) => setWhoIsPaying(e.target.value)}
                            className="w-24 bg-white p-1 rounded focus:outline-slate-700 text-center font-semibold"
                        >
                            <option value="user">You</option>
                            <option value="friend">{selectedFriend.name}</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <Button className="px-2 py-1 bg-slate-800 text-white text-sm rounded mt-6 cursor-pointer hover:bg-slate-600">Split bill</Button>
                </div>
            </form>
        </>
    );
}

export default SplitBillForm;