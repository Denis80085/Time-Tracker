import DropDownInfo from "./DropDownInfo.tsx";

type User = {
  firstName: string;
  lastName: string;
  image: string;
  className?: string;
};

function UserIcon(userData: User) {
  return (
    <div
      className={
        "flex flex-col flex-wrap justify-center space-x-1.5 space-y-1.5 items-center h-full " +
        userData.className
      }
    >
      <img
        src={userData.image}
        alt={`${userData.firstName} ${userData.lastName}`}
        className="w-30 rounded-full"
      />
      {/*TODO: a Badge with the Name and role below icon*/}
      <DropDownInfo
        triggerContent={`${userData.firstName} ${userData.lastName}`}
        items={[
          {
            parName: "First Name",
            parContent: userData.firstName,
          },
          {
            parName: "Last Name",
            parContent: userData.lastName,
          },
          {
            parName: "Role",
            parContent: "Admin",
          },
          {
            parName: "Email",
            parContent: "example@email.com",
          },
          {
            parName: "Role",
            parContent: "Admin",
          },
          {
            parName: "Email",
            parContent: "example@email.com",
          },
          {
            parName: "Role",
            parContent: "Admin",
          },
          {
            parName: "Email",
            parContent: "example@email.com",
          },
        ]}
      />
    </div>
  );
}

export default UserIcon;
