import { FaGithub } from "react-icons/fa6";

import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md border px-4 py-2 text-neutral-500 ring-1 ring-inset ring-neutral-200 transition-all duration-300 hover:bg-neutral-100 hover:text-neutral-900"
    >
      <Icon />
    </button>
  );
};
export default AuthSocialButton;
