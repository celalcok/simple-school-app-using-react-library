import React from "react";

function Opr({handleEdit, handleDelete,id}) {
  return (
    <div>
      <button className="btn btn-sm">
        <FaEdit className="text-warning" />
      </button>
      <button
        onClick={() => {
          handleDelete(id);
        }}
        className="btn btn-sm"
      >
        <FaTrash className="text-danger" />
      </button>
    </div>
  );
}

export default Opr;
