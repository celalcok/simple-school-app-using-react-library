// System import
import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// Custom import
import defaultProfileMan from "../../images/defaultprofile.jpg";
import defaultProfileWoman from "../../images/defaultprofilewoman.png";

function StudentListItem({
  student,
  handleDelete,
}) {
  return (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>
        <img
          style={{
            height: "40px",
            width: "40px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
          src={
            student.photo
              ? student.photo
              : student.gender == "Male"
              ? defaultProfileMan
              : defaultProfileWoman
          }
          alt="Photo"
        />
      </td>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.schoolNumber}</td>
      <td>{student.gender}</td>
      <td>

            <div>
              <Link
                to={`/details-student/${student.id}`}
                className="btn btn-sm"
                title="Details"
              >
                <FaEye className="text-primary" />
              </Link>
              <Link
                to={`/update-student/${student.id}`}
                className="btn btn-sm"
                title="Edit"
              >
                <FaEdit className="text-warning" />
              </Link>

              <button
                onClick={() => {
                  handleDelete(student.id);
                }}
                className="btn btn-sm"
              >
                <FaTrash className="text-danger" />
              </button>
            </div>
    
      </td>
    </tr>
  );
}

export default StudentListItem;
