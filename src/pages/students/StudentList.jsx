// System import
import React from "react";

// Custom import
import StudentListItem from "./StudentListItem";

function StudentList({ select, dataStudents, handleDelete}) {

  
  return (
    <div className="table-responsive">
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>School Number</th>
            <th>Gender</th>
            <th className="text-center">Opr</th>
          </tr>
        </thead>
        <tbody>
          {dataStudents
            ? dataStudents.map((student) => (
              <StudentListItem 
              key={student.id} 
              student={student}
              handleDelete ={handleDelete}
               />
              ))
            : <tr>
                <td colSpan={6} className="text-center">There is no data available</td>
            </tr>
            }
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
