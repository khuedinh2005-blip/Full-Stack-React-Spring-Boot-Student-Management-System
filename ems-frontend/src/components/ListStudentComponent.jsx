import ButtonLink from "./ButtonLink";
import useListStudentComponentHook from "../hooks/useListStudentComponentHook";

const ListStudentComponent = () => {
  const { 
    students, 
    getDepartmentName, 
    updateStudent, 
    deleteStudentById,
    searchTerm,
    setSearchTerm,
    isSearching,
    searchStudentById,
    clearSearch
  } = useListStudentComponentHook();

  return (
    <div className="container">
      <h2 className="text-center my-3">List of Students</h2>
      
      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <ButtonLink text="Add Student" toAction="/add-student" />
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Student ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchStudentById()}
            />
            <button
              className="btn btn-primary"
              onClick={searchStudentById}
            >
              Search
            </button>
            {isSearching && (
              <button
                className="btn btn-secondary"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Info */}
      {isSearching && (
        <div className="alert alert-info">
          {students.length > 0 
            ? `Found ${students.length} student(s) matching "${searchTerm}"`
            : `No students found with ID "${searchTerm}"`
          }
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Employee First Name</th>
            <th scope="col">Employee Last Name</th>
            <th scope="col">Employee Email</th>
            <th scope="col">Department</th>
            <th scope="col">Action #1</th>
            <th scope="col">Action #2</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.studentId}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{getDepartmentName(item.departmentId)}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteStudentById(item.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => updateStudent(item.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentComponent;
