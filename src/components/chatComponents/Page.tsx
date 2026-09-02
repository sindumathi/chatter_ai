import React, { useState } from "react";
import Header from "./Header";
import TextBox from "../uiComponents/TextBox";
import { fetchAPI } from "../../services/fetch";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { MdErrorOutline } from "react-icons/md";
import { MESSAGES } from "../../data/data";
export default function Page() {
  const [chatPrompt, setChatPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState("");
  const [error, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      if (!response?.ok) {
        setIsLoading(false);
        setErrorMessage(MESSAGES[response?.status]);
      }
      const reader = response?.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
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
              setMessages((prev) => prev + content);
            } catch (error) {
              setIsLoading(false);
              setErrorMessage(MESSAGES[100]);
            }
          }
        }
      }
      setIsLoading(false);
      //setMessages(response.data.choices[0].message.content);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(MESSAGES[100]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-4/5 mx-auto">
        <div className="">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{messages}</ReactMarkdown>
        </div>
        <div className=" w-4/5 mx-auto fixed bottom-0 inset-x-0  p-4 flex flex-col text-center">
          <div className="flex w-full items-end justify-between gap-4">
            {error && (
              <div className="border rounded-md border-red-100 flex flex-row gap-3 p-2 mb-2">
                <div className="mt-1">
                  <MdErrorOutline className="text-red-300" />
                </div>
                <div className="text-small text-red-300 ">{error}</div>
              </div>
            )}
            <div className=" text-gray-600 self-end cursor-pointer hover:text-red-400 no-underline hover:underline ml-auto">
              clear chat
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col gap-1 w-full  mx-auto">
              <TextBox
                value={chatPrompt}
                isLoading={isLoading}
                handleChange={(value) => setChatPrompt(value)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
