import { RxAvatar } from "react-icons/rx";
const Contacts = ({ companionNumber }) => {
  return (
    <div>
      {companionNumber ? (
        <div className="flex text-lg bg-gray-200">
          <RxAvatar size={28} className="icons" />
          <span className="ml-5">+{companionNumber}</span>
        </div>
      ) : <div className="text-center">

        Contact list
      </div>
      }
    </div>
  );
};
export default Contacts;
