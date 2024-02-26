import { FC, useState } from "react";
import { useAuth } from "@/store/auth";

interface UserAvatarProps {
  className: string;
  avatar?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ className, avatar = null }) => {
  const auth = useAuth();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function logout() {
    auth.logout();
  }

  return (
    <div className="relative flex items-center">
      <div
        className={`${className} rounded-full bg-cover`}
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          backgroundImage: `url(${
            avatar != null ? avatar : "/images/avatar.png"
          })`,
        }}
      ></div>
    </div>
  );
};

UserAvatar.defaultProps = {
  className: "w-12 h-12",
};

export default UserAvatar;
