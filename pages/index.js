import logo from "../public/images/GroupBuddies.png";
import Image from "next/image";


const HomePage = () => {
  return (
    <>
      <div>Welcome to Group Buddies</div>
      <Image src={logo}/>
    </>
  );
}

export default HomePage;