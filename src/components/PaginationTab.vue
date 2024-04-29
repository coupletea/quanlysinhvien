<template>
  <div class="pagination" v-if="totalPages > 1">
    <a @click="onPrev()" :class="{ disabled: page <= 1 }">&laquo;</a>
    <a v-for="num in totalPages" :key="num" :class="{ active: num === page }" @click="onClickPage(num)">
      {{ num }}
    </a>

    <a @click="onNext()" :class="{ disabled: page >= totalPages }">&raquo;</a>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      totalPages: Math.ceil(this.total / this.limit),
    };
  },
  emits: ["onPageChange"],
  methods: {
    onNext() {
      if (this.page < this.totalPages) {
        this.$emit("onPageChange", this.page + 1);
      }
    },
    onPrev() {
      if (this.page > 1) {
        this.$emit("onPageChange", this.page - 1);
      }
    },
    onClickPage(page) {
      this.$emit("onPageChange", page);
    },
  },
};
</script>
<style scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;


}

.pagination a {
  color: black;
  padding: 8px 16px;
  text-decoration: none;
  margin: 0 4px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  /* Thêm hiệu ứng chuyển màu và box shadow */
  border-radius: 4px;
  /* Thêm độ cong cho các nút */
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  /* Thêm box shadow cho trang hiện tại */
  transition: box-shadow 0.3s ease-out, transform 0.3s ease-out;
}

.pagination a:not(.active) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Box shadow nhẹ cho các nút không hoạt động */
}

.pagination a.disabled {
  color: grey;
  pointer-events: none;
  background-color: transparent;
  /* Nền trong suốt cho nút vô hiệu */
}

.pagination a:hover:not(.active):not(.disabled) {
  background-color: #ddd;
  box-shadow: 0 4px 8px rgba(78, 73, 73, 0.2);
  /* Tăng box shadow khi hover */

}
</style>