// Hàm tối ưu kiểm tra tính hợp lệ
export const validCheck = (data, existingNames = []) => {
  const errors = Object.entries(data).reduce((acc, [key, field]) => {
    if (field.rules && field.rules.length > 0) {
      for (const rule of field.rules) {
        const result = typeof rule === "function" 
          ? rule(field.value, existingNames) 
          : rule[0](field.value, rule[1]);

        if (!result.valid) {
          data[key].error = result.error;
          acc.push({ key, error: result.error });
          break; // Dừng kiểm tra nếu đã tìm thấy lỗi
        } else {
          delete data[key].error; // Xóa lỗi nếu không có lỗi được tìm thấy
        }
      }
    }
    return acc;
  }, []);

  return errors.length > 0;
};

// Hàm kiểm tra giá trị bắt buộc
export const validRequired = (value) => ({
  valid: value != null && value.length > 0,
  error: "This field is required.",
});

// Hàm kiểm tra độ dài tối đa
export const validMaxlength = (value, length) => ({
  valid: value != null && value.length <= length,
  error: `Độ dài tối đa ${length}.`,
});

// Hàm kiểm tra độ dài tối thiểu
export const validMinlength = (value, length) => ({
  valid: value != null && value.length >= length,
  error: `Độ dài tối thiểu ${length}.`,
});

// Hàm kiểm tra tên lớp học không trùng lặp
export const validUnique = (value, existingNames) => ({
  valid: !existingNames.includes(value.trim()), // Cải thiện việc kiểm tra bằng cách loại bỏ khoảng trắng
  error: "Lớp đã tồn tại.",
});
