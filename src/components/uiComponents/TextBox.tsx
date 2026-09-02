import { TbLoader3 } from "react-icons/tb";
import { RiSendPlane2Fill } from "react-icons/ri";
export type TextAreaChange = React.ChangeEvent<HTMLTextAreaElement>;
interface TextAreaProps {
  value: string;
  handleChange: (value: string) => void;
  className?: string;
  isLoading?: boolean;
}

export default function TextBox(props: TextAreaProps) {
  const { value, handleChange, isLoading = false, ...rest } = props;

  const handleBlur = () => {};

  return (
    <div className="relative rounded-md  border border-gray-300 bg-white shadow-sm">
      <textarea
        aria-label="Enter message"
        autoFocus
        name="chatInput"
        className="w-full field-sizing-content min-h-[3lh] max-h-[40vh]  focus:outline-none focus:ring-0 resize-none overflow-y-auto border-transparent text-gray-900 p-2 "
        rows={2}
        value={value}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e?.target?.value)}
        placeholder=""
        {...rest}
      />
      <div className="absolute bottom-2 right-3 flex items-center justify-between">
        <div className="">
          {isLoading ? (
            <button type="button">
              <TbLoader3 className="h-8 w-8 animate-spin text-blue-500" />
            </button>
          ) : (
            <button
              type="submit"
              //disabled={!message.trim()}
              className="text-blue-500 hover:cursor-pointer hover:text-blue-800 disabled:text-gray-400 "
              aria-label="Send message"
            >
              <RiSendPlane2Fill className="text-3xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
