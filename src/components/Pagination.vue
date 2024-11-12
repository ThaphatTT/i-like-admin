<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const pages = [];
      if (this.totalPages <= 5) {
        // Show all pages if there are less than or equal to 5 total pages
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else if (this.currentPage <= 3) {
        // Show the first 3 pages, the last page, and '...'
        pages.push(1, 2, 3, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        // Show the first page, '...', and the last 3 pages
        pages.push(1, '...', this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        // Show the first page, '...', current page -1, current page, current page +1, '...', and last page
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page !== '...' && page >= 1 && page <= this.totalPages) {
        this.$emit('page-change', page);
      }
    },
  },
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="page in visiblePages" :key="page"
        :class="{ active: currentPage === page, disabled: page === '...' }">
        <a v-if="page !== '...'" class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        <span v-else class="page-link">...</span>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>