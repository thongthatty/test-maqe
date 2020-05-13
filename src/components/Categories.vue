<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(category, idx) in categories" :key="idx" class="font-12 border-0 align-items-center text-left">
        <a class="btn-category title" v-b-toggle="`collapse-${category.id}`">{{ category.name }}</a>
        <b-collapse :id="`collapse-${category.id}`" class="mt-2">
          <div>
            <b-list-group-item class="font-12 border-0 d-flex text-left">
              <a class="btn-category toggle-all" @click="toggleAll(category.childs)">{{ category.name }}ทั้งหมด</a>
            </b-list-group-item>
            <b-list-group-item v-for="(child, idy) in category.childs" :key="idy" class="font-12 pt-1 pb-1 border-0 d-flex align-items-center">
              <b-form-checkbox :id="`child-${child.id}`" size="sm" v-model="categoriesSelected" :value="child.id"></b-form-checkbox>
              {{ child.name }}
            </b-list-group-item>
          </div>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { isEmpty } from 'lodash'

@Component
export default class Categories extends Vue {
  @Prop() private categoryFilter!: string
  categoriesSelected: Array<string> = []

  @Watch('categoriesSelected')
  onCategoriesSeletedChanged() {
    if (!isEmpty(this.$route) && !isEmpty(this.$route.query) && this.$route.query.category_id != this.categoriesSelected.toString()) {
      this.$router.push({
        name: 'Catalog',
        query: {
          category_id: this.categoriesSelected.length > 0 ? this.categoriesSelected.toString() : '',
          brand_id: this.$route.query.brand_id,
          page: this.$route.query.page
        }
      })
    }
  }

  created() {
    if (!isEmpty(this.categoryFilter)) {
      this.categoriesSelected = this.categoryFilter.split(',')
    }
  }

  get categories() {
    // return !isEmpty(this.$store) && !isEmpty(this.$store.getters) ? this.$store.getters['catsbrands/categories'] : []
    return this.$store.getters['catsbrands/categories']
  }

  toggleAll(childs) {
    const array = this.categoriesSelected
    Promise.all(
      childs.map((child, idx) => {
        const index = array.indexOf(child.id)
        if (index != -1) {
          array.splice(index, 1)
        } else {
          array.push(child.id)
        }
      })
    )
    this.categoriesSelected = array
  }
}
</script>
<style lang="scss" scoped>
.font-12 {
  font-size: 12px;
}
.btn-category {
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: #22457b;
  }
}
</style>
