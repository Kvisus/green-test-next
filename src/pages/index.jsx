import { useState } from "react";
import Chat from "../Components/Chat";
import { RxAvatar } from "react-icons/rx";
import Contacts from "@/Components/Contacts";
import Account from "@/Components/Account";

function App() {
  const [userInfo, setUserInfo] = useState({
    IdInstance: "",
    ApiTokenInstance: "",
  });
  const [companionNumber, setCompanionNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (
      userInfo.IdInstance.length === 10 &&
      userInfo.ApiTokenInstance.length === 50
    ) {
      setIsValid(true);
    } else {
      console.log("неправильно заполнены поля");
    }
  }

  return (
    
    <div className="w-screen h-screen background absolute -z-10">

      {isValid ? (
        <div className="w-[93%] h-[93%] flex relative top-5 m-auto border-2 rounded-sm">
          <div className="bg-white w-2/5 flex flex-col border-r-4 ">
            <div className="h-36 border-b-4 relative">
              <div className="w-full h-12 bg-[#eeeeee] flex items-center">
                <RxAvatar size={30} className="   text-gray-500" /> Your id
                instance:{userInfo.IdInstance}
                <button
                  onClick={() => {
                    setIsValid(false);
                    setUserInfo({ IdInstance: "", ApiTokenInstance: "" });
                  }}
                  className="ml-4 bg-gray-400"
                >
                  Log out
                </button>
              </div>
              {/* use form? */}
              <input
                className="bg-[#eeeeee] absolute bottom-0 w-11/12 rounded-md left-2"
                placeholder="Введите номер собеседника и нажмите Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (e.target.value.length === 11) {
                      setCompanionNumber(e.target.value);
                      e.target.value = "";
                    } else window.alert("enter 11 numeral chars");
                  }
                }}
              />
            </div>
            <div className="h-full ">
              <Contacts companionNumber={companionNumber} />
            </div>
          </div>
          {companionNumber ? (
            <Chat companionNumber={companionNumber} userInfo={userInfo} key={companionNumber} />
          ) : (
            <div className="h-full bg-red-100 w-full flex items-center justify-center">
              {" "}
              Enter Number in inputfield to the left
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Account
            handleInputChange={handleInputChange}
            userInfo={userInfo}
            handleSubmit={handleSubmit}
          />
        </div>
      )}

  
    </div>
  );
}

export default App;
