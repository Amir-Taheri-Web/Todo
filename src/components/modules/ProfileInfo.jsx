const ProfileInfo = ({ firstName, lastName }) => {
  return (
    <div>
      <p>
        First Name: <span>{firstName}</span>
      </p>
      <p>
        Last Name: <span>{lastName}</span>
      </p>

      <button type="button">Edit</button>
    </div>
  );
};

export default ProfileInfo;
