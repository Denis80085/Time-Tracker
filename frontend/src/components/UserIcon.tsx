import DropDownInfo from "./DropDownInfo.tsx";

type User = {
  firstName: string;
  lastName: string;
  image: string;
  className?: string;
};

type UserIconProps = {
  userData: User;
  className?: string;
};

function UserIcon({ userData, className }: UserIconProps) {
  return (
    <div
      className={
        "flex flex-col flex-wrap justify-center space-x-1.5 space-y-1.5 items-center h-full " +
        className
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
            parName: "Vorname",
            parContent: userData.firstName,
          },
          {
            parName: "Nachname",
            parContent: userData.lastName,
          },
          {
            parName: "Job",
            parContent: "Developer",
          },
          {
            parName: "Unternehmen",
            parContent: "Unternehmen GmbH",
          },
          {
            parName: "Arbeitsort",
            parContent: (
              <p className="text-end">
                80333 München,
                <br />
                Musterstraße 123
              </p>
            ),
          },
          {
            parName: "Telefon",
            parContent: "0123456789",
          },
          {
            parName: "Email",
            parContent: (
              <a href="mailto:example@gmail.com">example@gmail.com</a>
            ),
          },
        ]}
      />
    </div>
  );
}

export default UserIcon;
