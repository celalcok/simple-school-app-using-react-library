// System import
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

// Custom import
import defaultProfileMan from "../../images/defaultprofile.jpg";
import defaultProfileWoman from "../../images/defaultprofilewoman.png";

function TecherList({ dataTeachers, handleDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Personal ID</th>
            <th>Gender</th>
            <th>Opr</th>
          </tr>
        </thead>
        <tbody>
          {dataTeachers ? (
            dataTeachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.id}</td>
                <td>
                <img
                style={{ height: "40px", width: "40px",border: "1px solid #ddd",borderRadius: "5px" }}
                src={
                  teacher.photo
                    ? teacher.photo
                    : teacher.gender == "Male"
                    ? defaultProfileMan
                    : defaultProfileWoman
                }
                alt="Photo"
              />
                </td>
                <td>{teacher.firstName}</td>
                <td>{teacher.lastName}</td>
                <td>{teacher.personalID}</td>
                <td>{teacher.gender}</td>
                <td>
                  <Link
                    to={`/details-teacher/${teacher.id}`}
                    className="btn btn-sm"
                    title="Details"
                  >
                    <FaEye className="text-primary" />
                  </Link>
                  <Link
                    to={"/edit-teacher/" + teacher.id}
                    className="btn btn-sm"
                    title="Edit"
                  >
                    <FaEdit className="text-warning" />
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(teacher.id);
                    }}
                    className="btn btn-sm"
                  >
                    <FaTrash className="text-danger" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center" colSpan="6">
                There is no data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TecherList;
