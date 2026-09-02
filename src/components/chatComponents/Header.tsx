import { TbRobot } from "react-icons/tb";
export default function Header() {
  return (
    <header className="bg-gray-100 border-b border-gray-200 p-5 ">
      <div className="flex gap-1">
        <div className="">
          <TbRobot className="text-2xl" />
        </div>
        <div className="font-turret text-xl font-semibold">Chatter</div>
      </div>
    </header>
  );
}
