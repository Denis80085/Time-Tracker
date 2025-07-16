type User = {
  firstName: string;
  lastName: string;
  image: string;
};

function UserIcon(userData: User) {
  return (
    <div className="flex flex-col items-center w-50">
      <img
        src={userData.image}
        alt={`${userData.firstName} ${userData.lastName}`}
        className="w-45 rounded-full"
      />
      <p className="font-bold text-2xl text-white">{`${userData.firstName} ${userData.lastName}`}</p>
    </div>
  );
}

export default UserIcon;
