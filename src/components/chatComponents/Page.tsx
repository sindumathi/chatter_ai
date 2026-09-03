import React, { useState, useRef, useId, useEffect } from "react";
import Header from "./Header";
import TextBox from "../uiComponents/TextBox";
import { fetchAPI } from "../../services/fetch";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { MdErrorOutline } from "react-icons/md";
import { MESSAGES } from "../../data/data";

interface MessageHistoryDataType {
  id: string;
  prompt: string;
  response: string;
}

export default function Page() {
  const baseId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [chatPrompt, setChatPrompt] = useState("");
  const [messageHistory, setMessageHistory] = useState<
    MessageHistoryDataType[]
  >(() => {
    const rawData = localStorage.getItem("chat_session");
    return rawData ? JSON.parse(rawData) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataupdateStatus, setDataUpdateStatus] = useState("DONE");
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    if (dataupdateStatus === "DONE") {
      localStorage.setItem("chat_session", JSON.stringify(messageHistory));
    }
  }, [dataupdateStatus]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Return if empty field
    if (chatPrompt?.trim().length === 0) return;

    //Add prompt data to state
    const messageHistoryData = {
      id: `${baseId}_${Date.now()}`,
      prompt: chatPrompt,
      response: "",
    };
    setMessageHistory([...messageHistory, messageHistoryData]);

    //Fetch data from Api and streams data
    try {
      setIsLoading(true);
      const response = await fetchAPI("/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",
          messages: [{ role: "user", content: chatPrompt }],
          stream: true,
        }),
      });

      //After sending prompt clear and reset focus
      setChatPrompt("");
      inputRef.current?.focus();

      //Error handle: If failed response update the state to display message.
      if (!response?.ok) {
        setIsLoading(false);
        setErrorMessage(MESSAGES[response?.status]);
        return;
      }
      setDataUpdateStatus("LOADING");
      //Read the stream of data from response body
      const reader = response?.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        //reads data value- actual content and done is the end of stream
        const { value, done } = await reader.read();

        //Break the loop if end of statement
        if (done) break;

        //Decode the bit stream
        buffer += decoder.decode(value, { stream: true });
        //extract content
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";
        for (const event of events) {
          const lines = event.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const content = json.choices?.[0]?.delta?.content;
              if (!content) continue;

              //Extract and add content to the field and update in the setMessage
              messageHistoryData.response += content;
              setMessageHistory((message) =>
                message.map((data) =>
                  data.id === messageHistoryData.id
                    ? { ...data, ...messageHistoryData }
                    : data,
                ),
              );
            } catch (error) {
              console.log("error", error);
              setIsLoading(false);
              setErrorMessage(MESSAGES[422]);
            }
          }
        }
      }
      //Update local storage with data on state status update, once after its done loading the entire response
      setDataUpdateStatus("DONE");

      //Disable loading icon and enable new search
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(MESSAGES[422]);
    } finally {
      setIsLoading(false);
    }
  };

  //Clear chat by clearing local storage
  const handleClearChat = () => {
    localStorage.removeItem("chat_session");
    setMessageHistory([]);
  };

  //Display Messages and prompts on screen
  const displayMessages = (message: MessageHistoryDataType) => {
    return (
      <div key={message.id}>
        {/* Display prompt*/}
        <div className="border border-blue-50 p-4 m-2 text-right rounded-md  bg-blue-50 self-end">
          {message.prompt}
        </div>
        {/* Display Response with Markdown*/}
        <div className="flex-1 min-h-0 overflow-y-auto border border-gray-50 rounded-md bg-gray-50 p-4 m-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.response}
          </ReactMarkdown>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-4/5 mx-auto flex-1 overflow-y-auto mb-4">
        {messageHistory.map((message) => displayMessages(message))}
      </div>
      {/* Display the error message*/}
      <div className=" w-4/5 mx-auto p-4 flex flex-col text-center">
        <div className="flex w-full items-end justify-between gap-4">
          {error && (
            <div className="border rounded-md border-red-100 flex flex-row gap-3 p-2 mb-2">
              <div className="mt-1">
                <MdErrorOutline className="text-red-300" />
              </div>
              <div className="text-small text-red-300 ">{error}</div>
            </div>
          )}
          <div
            className=" text-gray-600 self-end cursor-pointer hover:text-red-400 no-underline hover:underline ml-auto"
            onClick={handleClearChat}
          >
            clear chat
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-1 w-full  mx-auto">
            <TextBox
              value={chatPrompt}
              isLoading={isLoading}
              handleChange={(value) => setChatPrompt(value)}
              ref={inputRef}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
