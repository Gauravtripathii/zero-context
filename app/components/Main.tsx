import TextCard from "./TextCard";

const Main = ({ isLoggedIn }: any) => {
  return (
    <div className="h-5/6 px-5 sm:px-10 lg:px-14 xl:px-24 py-5">
      {!isLoggedIn ? <div></div> : <TextCard message="+" styles="text-[7vw] text-white bg-black border-2 border-black rounded-full w-10 h-10 hover:bg-white hover:text-black" />}
    </div>
  );
};

export default Main;
