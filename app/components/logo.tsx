import { FunctionComponent } from "react";

interface LogoProps {
    custom: string;
}

const Logo: FunctionComponent<LogoProps> = ({ custom }) => {
  return <div className={`text-white font-extrabold w-fit h-fit ${custom}`}>0-context</div>;
};

export default Logo;
