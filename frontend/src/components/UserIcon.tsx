type User = {
  firstName: string;
  lastName: string;
  image: string;
};

function UserIcon(userData: User) {
  return (
    <div>
      <img
        src={userData.image}
        alt={`${userData.firstName} ${userData.lastName}`}
        className="w-50 rounded-full"
      />
      <p>{`${userData.firstName} ${userData.lastName}`}</p>
    </div>
  );
}

export default UserIcon;
