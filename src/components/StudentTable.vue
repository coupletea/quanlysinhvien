<template>
    <table class="student-table">
        <tr>
            <th class="col-index">#</th>
            <th v-for="(col, index) in columns" :key="index" :style="{'text-align': col.align }">{{ col.text }}</th>
            <th class="col-action">Thao Tác</th>
        </tr>
        <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td v-for="(col, index) in columns" :style="{ 'text-align': col.align }" :key="index">
             {{ item.render ? item.render : item[col.value] }}
             </td>
            <td>
             <button @click="onUpdate(item.id)">Sửa</button>
             <button @click="onDelete(item.id)">Xoá</button>
            </td>
        </tr>
    </table>
</template>
<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["item-update", "item-delete"]);

const onUpdate = (id) => {
  emit("item-update", id);
};

const onDelete = (id) => {
  emit("item-delete", id);
};
</script>
<style scoped lang="scss">
.student-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 8px;
        border: 1px solid #ddd;
        text-align: center;
    }

    .col-index {
        width: 5%;
    }

    .col-action {
        width: 10%;
    }

    // Đảm bảo các cột còn lại chiếm phần còn lại của bảng
    th:nth-child(n+2),
    td:nth-child(n+2) {
        width: auto;
    }

    // Thiết lập độ rộng tối thiểu cho các cột
    th, td {
        min-width: 100px;
    }
}


.student-table th, .student-table td {
  padding: 8px;
  border: 1px solid #ccc;
}

.col-index {
  width: 50px;
}

.col-action {
  width: 100px;
  text-align: center;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #0056b3;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3); // Box shadow đậm hơn khi hover
  }

  &:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); // Box shadow bên trong khi nút được nhấn
  }
}

</style>

