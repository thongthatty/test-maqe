<template>
  <div>
    <b-card>
      <b-card-text>
        <h6 class="text-left">
          <b>ประเภทสินค้า</b>
          <a class="show-hide-btn" @click="visibleCategory = !visibleCategory">
            <b-icon :icon="visibleCategory? 'chevron-compact-up' :'chevron-compact-down'"></b-icon>
          </a>
        </h6>
        <b-collapse id="collapse-categories" v-model="visibleCategory" class="mt-2">
          <Categories :categoryFilter="categoryId"/>
        </b-collapse>
      </b-card-text>
    </b-card>
    <b-card class="mt-3">
      <b-card-text>
        <h6 class="text-left">
          <b>แบรนด์</b>
          <a class="show-hide-btn" @click="visibleฺBrand = !visibleฺBrand">
            <b-icon :icon="visibleฺBrand? 'chevron-compact-up' :'chevron-compact-down'"></b-icon>
          </a>
        </h6>
        <b-collapse id="collapse-brands" v-model="visibleฺBrand" class="mt-2">
          <Brands :brandsFilter="brandId"/>
        </b-collapse>
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Categories: () => import('@/components/Categories.vue'),
    Brands: () => import('@/components/Brands.vue')
  }
})
export default class Sidebar extends Vue {
  @Prop() private brandId!: string
  @Prop() private categoryId!: string
  visibleCategory: boolean = true
  visibleฺBrand: boolean = true
}
</script>
<style lang="scss" scoped>
.show-hide-btn {
  float: right;
  cursor: pointer;
}
</style>
