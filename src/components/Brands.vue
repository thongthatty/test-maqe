<template>
  <div>
    <b-list-group>
      <b-list-group-item v-for="(brand, idx) in brands" :key="idx" class="pt-1 pb-1 font-12 d-flex border-0 align-items-center text-left">
        <b-form-checkbox :id="`toggle-brand-id-${brand.id}`" size="sm" v-model="brandsSelected" :value="brand.id"></b-form-checkbox>
        {{ brand.name }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { isEmpty } from 'lodash'

@Component
export default class Brands extends Vue {
  @Prop() private brandsFilter!: string
  brandsSelected: Array<string> = []

  @Watch('brandsSelected')
  onCategoriesSeletedChanged() {
    if (!isEmpty(this.$route) && !isEmpty(this.$route.query) && this.$route.query.brand_id != this.brandsSelected.toString()) {
      this.$router.push({
        name: 'Catalog',
        query: {
          category_id: this.$route.query.category_id,
          brand_id: this.brandsSelected.length > 0 ? this.brandsSelected.toString() : '',
          page: this.$route.query.page
        }
      })
    }
  }
  get brands() {
    // return this.$store.state.catsbrands.brands
    return !isEmpty(this.$store) && !isEmpty(this.$store.getters) ? this.$store.getters['catsbrands/brands'] : []
  }
  created() {
    // if (!isEmpty(this.$route) && !isEmpty(this.$route.query) && !isEmpty(this.$route.query.brand_id)) {
    //   this.brandsSelected = this.$route.query.brand_id.toString().split(',')
    // }
    if (!isEmpty(this.brandsFilter)) {
      this.brandsSelected = this.brandsFilter.split(',')
    }
  }
}
</script>
<style lang="scss" scoped>
.font-12 {
  font-size: 12px;
}
</style>
