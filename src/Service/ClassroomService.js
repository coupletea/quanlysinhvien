const classroomsKey = "classrooms";

export const getDataKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return [];
  }
};

export const setData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage`, error);
  }
};

export const generateId = (data) => data.reduce((max, item) => Math.max(max, item.id), 0) + 1;
export const getClassroomById = (id) => {
  const classrooms = JSON.parse(localStorage.getItem(classroomsKey) || '[]');
  return classrooms.find((item) => item.id == id);
};
export const flatClassTree = (nodes, depth = 0) => nodes.reduce((acc, node) => {
  acc.push({ name: "---".repeat(depth) + node.name, group: node.group, id: node.id });
  if (node.children) {
    acc = acc.concat(flatClassTree(node.children, depth + 1));
  }
  return acc;
}, []);

export const getClassroomsRoot = (classrooms) => classrooms
  .filter(item => !item.group)
  .map(root => ({
    ...root,
    children: getClassroomChildren(root, classrooms)
  }));

export const getClassroomChildren = (classroom, classrooms) => {
  const children = classrooms.filter(item => item.group === classroom.id);
  return children.map(child => ({
    ...child,
    children: getClassroomChildren(child, classrooms)
  }));
};

export const createClassroom = (payload) => {
  let classrooms = getDataKey(classroomsKey);
  payload.id = generateId(classrooms);
  classrooms.push(payload);
  setData(classroomsKey, classrooms);
  return Promise.resolve();
};

export const updateClassroom = (payload) => {
  let classrooms = getDataKey(classroomsKey); // Đây là danh sách các lớp học hiện có
  const index = classrooms.findIndex(item => Number(item.id) === Number(payload.id));
 // Tìm chỉ số của lớp học cần cập nhật
  if (index !== -1) {
    classrooms[index] = { ...classrooms[index], ...payload }; // Cập nhật thông tin lớp học
    setData(classroomsKey, classrooms); // Lưu lại danh sách lớp học đã cập nhật vào localStorage
    console.log("Classrooms data:", classrooms);
    console.log("Payload for update:", payload);

    return Promise.resolve(); // Trả về Promise nếu cập nhật thành công
  } else {
    return Promise.reject(new Error('Classroom not found')); // Trả về lỗi nếu không tìm thấy lớp học
  }
};

export const deleteClassroom = (id) => {
  let classrooms = getDataKey(classroomsKey);
  setData(classroomsKey, classrooms.filter(item => item.id !== id));
};
export const getListClassrooms = (payload) => {
  let classrooms = getDataKey(classroomsKey) || [];
  let classroomsRoot = getClassroomsRoot(classrooms);
  var classroomTree = flatClassTree(classroomsRoot);
  let start = (payload.page - 1) * payload.limit;
  let end = start + payload.limit;
  var newDataPagination = classroomTree.slice(start, end);
  return {
    data: newDataPagination,
    total: classroomTree.length,
  };
};
export const getAllClassrooms = () => {
  let classrooms = getDataKey(classroomsKey);
  return flatClassTree(getClassroomsRoot(classrooms));
};
