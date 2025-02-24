import { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            // Check if the response is OK and is JSON
            if (!res.ok) {
                const errorText = await res.text(); // Get the error response as text
                throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
            }

            const data = await res.json();
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;
