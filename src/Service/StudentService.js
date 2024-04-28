
const studentsKey = "students";
const classroomsKey = "classrooms";
const getDataFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error fetching data from localStorage for key ${key}:`, error);
    return [];
  }
};

const setDataInLocalStorage = (key, data) => {
  try {
    const stringData = JSON.stringify(data);
    localStorage.setItem(key, stringData);
  } catch (error) {
    console.error(`Error setting data in localStorage for key ${key}:`, error);
  }
};

// Generate a new ID for a new entity
const generateId = (data) => data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;

// CRUD operations for students
export const getStudentById = (id) => getDataFromLocalStorage(studentsKey).find(item => item.id == id);
export const getClassroomById = (id) => getDataFromLocalStorage(classroomsKey).find(item => item.id == id);

export const createStudent = (payload) => {
  let students = getDataFromLocalStorage(studentsKey);
  payload.id = generateId(students);
  setDataInLocalStorage(studentsKey, [...students, payload]);
  return Promise.resolve();
};

export const updateStudent = (payload) => {
  let students = getDataFromLocalStorage(studentsKey);
  const index = students.findIndex(item => Number(item.id) == Number(payload.id));
  if (index >= 0) {
    students[index] = { ...students[index], ...payload };
    setDataInLocalStorage(studentsKey, students);
  }
  return Promise.resolve();
  
};

export const deleteStudent = (id) => {
  let students = getDataFromLocalStorage(studentsKey);
  const filteredStudents = students.filter(item => item.id !== id);
  setDataInLocalStorage(studentsKey, filteredStudents);
};

// List and filter students
export const getListStudents = ({ name, age, classroom, page, limit }) => {
  const students = getDataFromLocalStorage(studentsKey);
  const filtered = students.filter(student =>
    (!name || student.name.includes(name)) &&
    (!age || student.age == age) &&
    (!classroom || student.classroom == classroom)
  );

  const start = (page - 1) * limit;
  const paginatedItems = filtered.slice(start, start + limit);
  paginatedItems.forEach(student => {
    if (student.classroom) {
      const classroom = getClassroomById(student.classroom);
      student.classroomName = classroom?.name;
    }
  });

  return { data: paginatedItems, total: filtered.length };
  
};

export const getTotalStudents = () => getDataFromLocalStorage(studentsKey).length;

