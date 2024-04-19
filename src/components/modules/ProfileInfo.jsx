import toast from "react-hot-toast";

const ProfileInfo = ({ firstName, lastName, setIsEdit }) => {
  const editHandler = async () => {
    setIsEdit(true);
  };

  return (
    <div>
      <p>
        First Name: <span>{firstName}</span>
      </p>
      <p>
        Last Name: <span>{lastName}</span>
      </p>

      <button type="button" onClick={editHandler}>
        Edit
      </button>
    </div>
  );
};

export default ProfileInfo;
