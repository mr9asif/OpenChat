import FooterActions from "./FooterAction";
import UserAvatar from "./UserAvater";
import UserInfo from "./UserInfo";

const SidebarFooter = () => {
  return (
    <div className="border-t p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar />
          <UserInfo />
        </div>

        <FooterActions />
      </div>
    </div>
  );
};

export default SidebarFooter;
