<template>
  <div>
    <b-row>
      <b-col v-for="(item, idx) in items" :key="idx" cols="3">
        <b-card class="mb-3 font-12" style="min-height: 9rem">
          {{ item.name }}
          <template v-slot:footer> ฿ {{ item.sku.price }} </template>
        </b-card>
      </b-col>
    </b-row>
    <b-pagination v-model="currentPage" :total-rows="pagination.last_page" :per-page="1" hide-ellipsis></b-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { isEmpty } from 'lodash'

@Component
export default class ListItem extends Vue {
  currentPage: number = 1
  categoriesSelected: Array<string> = []
  @Watch('currentPage')
  onCurrentPageChanged() {
    if (!isEmpty(this.$route) && !isEmpty(this.$route.query) && this.$route.query.page != this.currentPage.toString()) {
      this.$router.push({
        name: 'Catalog',
        query: {
          category_id: this.$route.query.category_id,
          brand_id: this.$route.query.brand_id,
          page: this.currentPage.toString()
        }
      })
    }
  }
  get pagination() {
    return !isEmpty(this.$store) && !isEmpty(this.$store.getters)
      ? this.$store.getters['catsbrands/pagination']
      : { per_page: 48, last_page: 1, current_page: 1 }
  }
  get items() {
    return !isEmpty(this.$store) && !isEmpty(this.$store.getters) ? this.$store.getters['catsbrands/items'] : []
  }
  created() {
    this.currentPage = this.pagination.current_page
  }
}
</script>
<style lang="scss" scoped>
.font-12 {
  font-size: 12px;
}
</style>
