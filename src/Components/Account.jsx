const Account = ({ handleInputChange, userInfo, handleSubmit }) => {
  return (
    <form className="rounded-sm bg-[#009788] border-4 px-16 py-4 text-center">
      <p className="m-4">Enter Your Account Info</p>
      <a href="https://console.green-api.com/instanceList" className="underline">Green API</a>
      <div className="m-4 ">
        <p>IdInstance</p>
        <input
          name="IdInstance"
          id=""
          className="rounded-sm"
          onChange={handleInputChange}
          value={userInfo.IdInstance}
        />
      </div>
      <div className="m-4 ">
        <p>ApiTokenInstance</p>
        <input
          name="ApiTokenInstance"
          id=""
          className="rounded-sm"
          onChange={handleInputChange}
          value={userInfo.ApiTokenInstance}
        />
      </div>
      {/* TODO on hover info?*/}
      <div className="">
        <button onClick={handleSubmit} className="bg-gray-300 mx-auto w-full">
          submit
        </button>
      </div>
    </form>
  );
};
export default Account;
