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
    clearSearch,
    generateMissingStudentIds
  } = useListStudentComponentHook();

  return (
    <div className="container">
      <h2 className="text-center my-3">List of Students</h2>
      
      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <ButtonLink text="Add Student" toAction="/add-student" />
        </div>
        <div className="col-md-4">
          {students.filter(s => !s.studentId).length > 0 && (
            <div className="alert alert-warning py-2 mb-2">
              <strong>{students.filter(s => !s.studentId).length}</strong> students missing Student ID
            </div>
          )}
          <button 
            className="btn btn-warning"
            onClick={() => {
              if (window.confirm('Generate Student IDs for records that don\'t have them?')) {
                generateMissingStudentIds();
              }
            }}
          >
            Generate Missing IDs
          </button>
        </div>
        <div className="col-md-4">
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
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Department</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  {item.studentId || 'Not Assigned'}
                  {/* Debug info */}
                  <small style={{display: 'block', color: 'gray'}}>
                    Debug: {JSON.stringify({id: item.id, studentId: item.studentId})}
                  </small>
                </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{getDepartmentName(item.departmentId)}</td>
                <td>
                  <button
                    className="btn btn-outline-info me-2"
                    onClick={() => updateStudent(item.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteStudentById(item.id)}
                  >
                    Delete
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