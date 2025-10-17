import DropDownInfo from "./DropDownInfo.tsx";

type User = {
  firstName: string;
  lastName: string;
  image: string;
};

function UserIcon(userData: User) {
  return (
    <div className="flex flex-row items-center">
      <img
        src={userData.image}
        alt={`${userData.firstName} ${userData.lastName}`}
        className="w-45 rounded-full"
      />
      {/*TODO: a Badge with the Name and role below icon*/}
      <DropDownInfo
        triggerContent={`IHRE DATEN`}
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
