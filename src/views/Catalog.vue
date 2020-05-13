<template>
  <div>
    <b-container>
      <b-row>
        <b-col cols="4"><Sidebar :brandId="queryString.brand_id" :categoryId="queryString.category_id"/></b-col>
        <b-col cols="8"><ListItem :pageNumber="queryString.page"/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { isEmpty } from 'lodash'
import qs from 'qs'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    Sidebar: () => import('@/components/Sidebar.vue'),
    ListItem: () => import('@/components/ListItem.vue')
  }
})
export default class Catalolg extends Vue {
  @Prop() private queryString!: string

  @Watch('queryString')
  async onPageChanged() {
    await this.$store.dispatch('catsbrands/filterCatsbrands', qs.stringify(this.$route.query))
  }

  async created() {
    if (!isEmpty(this.$route) && isEmpty(this.$route.query)) {
      this.$router.push({ name: 'Catalog', query: { category_id: '', brand_id: '', page: '1' } })
    }
    await this.$store.dispatch('catsbrands/getAllCatsbrands')
    await this.$store.dispatch('catsbrands/filterCatsbrands', qs.stringify(this.$route.query))
  }
}
</script>
