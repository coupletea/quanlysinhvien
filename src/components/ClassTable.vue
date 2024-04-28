<template>
  <table class="table-cus">
    <tr>
      <th class="table-cus-header">#</th>
      <th v-for="(col, index) in columns" :key="index">{{ col.text }}</th>
      <th>Thao tác</th>
    </tr>
    <template v-for="(group, indexGrp) in groupList" :key="indexGrp">
      <tr>
        <td class="col-index">
          <button @click="onChangeGroupActive(group)">
            {{ group.active ? "-" : "+" }}
          </button>
        </td>
        <td class="col-multiclass">{{ group.name }}</td>
        <td class="col-action"></td>
      </tr>
      <tr
        v-for="(classroom, indexClass) in group.classrooms"
        :key="indexClass"
        v-show="group.active"
      >
        <td class="col-index">{{ indexClass + 1 }}</td>
        <td class="col-multiclass">----{{ classroom.name }}</td>
        <td class="col-action">
          <button @click="onUpdate(classroom.id)">Sửa</button>
          <button @click="onDelete(classroom.id)">Xoá</button>
        </td>
      </tr>
    </template>
  </table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      groupList: this.data,
    };
  },
  methods: {
    onUpdate(id) {
      this.$emit("item-update", id);
    },
    onDelete(id) {
      this.$emit("item-delete", id);
    },
    onChangeGroupActive(group) {
      let groupIndex = this.groupList.findIndex(
        (item) => item.name == group.name
      );
      this.groupList[groupIndex].active = !this.groupList[groupIndex].active;
    },
  },
  emits: ["item-update", "item-delete"],
};
</script>

<style lang="scss" scoped>
.table-cus {
  width: 100%; 
  border-collapse: collapse;
  max-width: none; 
  table-layout: fixed; 

  th, td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
    min-width: 100px; 
  }

  .col-multiclass {
    width: auto; 
  }

  .col-index, .col-action {
    width: 5%; 
  }

 
  .col-action {
    width: 10%;
  }

 
  .col-action button {
    width: 100%; 
    padding: 4px 8px;
    margin: auto;
    display: block; 
    white-space: nowrap; 
  }

  
  .col-index button {
    display: block; 
    width: auto; 
    margin: auto; 
    padding: 4px 8px;
  }
}

</style>
