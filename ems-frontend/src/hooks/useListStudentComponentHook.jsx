import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listStudents, deleteStudent, getStudentByStudentId, generateStudentIds } from "../services/StudentService";
import { listDepartments } from "../services/DepartmentService";

const useListStudentComponentHook = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await listStudents();
      console.log("Fetched students data:", response.data);
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartments = async () => {
    const response = await listDepartments();
    setDepartments(response.data);
  };

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.departmentName : "Unknown Department";
  };

  const updateStudent = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const deleteStudentById = async (id) => {
    await deleteStudent(id);
    toast.error("Student deleted successfully!");
    if (isSearching) {
      // If we're currently viewing search results, refresh the search
      searchStudentById();
    } else {
      fetchStudents();
    }
  };

  const searchStudentById = async () => {
    if (!searchTerm.trim()) {
      toast.warning("Please enter a student ID to search");
      return;
    }

    try {
      const response = await getStudentByStudentId(searchTerm.trim());
      setStudents([response.data]);
      setIsSearching(true);
      toast.success("Student found!");
    } catch (error) {
      toast.error("Student not found with the given ID");
      setStudents([]);
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    fetchStudents();
  };

  const generateMissingStudentIds = async () => {
    try {
      await generateStudentIds();
      toast.success("Student IDs generated successfully!");
      fetchStudents(); // Refresh the list to show new IDs
    } catch (error) {
      toast.error("Failed to generate student IDs");
      console.error("Error generating student IDs:", error);
    }
  };

  return {
    students,
    departments,
    searchTerm,
    setSearchTerm,
    isSearching,
    fetchStudents,
    fetchDepartments,
    getDepartmentName,
    updateStudent,
    deleteStudentById,
    searchStudentById,
    clearSearch,
    generateMissingStudentIds,
  };
};

export default useListStudentComponentHook;
