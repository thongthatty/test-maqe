import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ListItem from '@/components/ListItem.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

import Vue from 'vue'
import catsbrands from '@/store/modules/catsbrands'

// const localVue = createLocalVue()
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

describe('ListItem.vue', () => {
  let actions
  let store
  const mockItem1 = [
    {
      id: 92,
      name: 'JASIC CUT40 เครื่องตัดพลาสมา',
      slug: 'JASIC CUT40 เครื่องตัดพลาสมา',
      description:
        'เครื่องตัดพลาสม่า ระบบอินเวิร์ทเตอร์ (INVERTER AIR PLASMA CUTTER) สามารถตัดชิ้นงานต่างๆ เช่น เหล็ก สแตนเลส อลูมิเนียม ทองแดง ได้อย่างง่าย รวดเร็ว ประหยัด ตัวเครื่องน้ำหนักเบา ต้นทุนต่ำ คุณภาพสูง ตัดชิ้นงานเรียบ และสวย',
      cover: null,
      status: 0,
      sku: {
        id: 1469,
        product_id: 92,
        sku: 'JASIC CUT40 เครื่องตัด พลาสมา 40A (ชุด)',
        name: 'JASIC CUT40 เครื่องตัด พลาสมา 40A (ชุด)',
        price: '14520.00',
        weight: '9100.00',
        height: '0.00',
        depth: '0.00',
        width: '0.00',
        cover: null,
        contain: null,
        unit: 'ชุด',
        quantity: 1,
        created_at: '2019-04-04 09:43:42',
        updated_at: '2019-04-04 09:43:42'
      },
      brand: {
        id: 14,
        name: 'JASIC',
        brand_parent_id: 14,
        is_featured: 0,
        slug: 'jasic',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/maqe-powertools/media/1560068146_Jasic.jpg',
        created_at: '2019-04-04 09:43:42',
        updated_at: '2019-06-09 08:16:02'
      }
    },
    {
      id: 94,
      name: 'JASIC MIG160-N219 เครื่องเชื่อม+ป้อนลวด ',
      slug: 'JASIC MIG160-N219 เครื่องเชื่อม+ป้อนลวด ',
      description: null,
      cover: null,
      status: 0,
      sku: {
        id: 1471,
        product_id: 94,
        sku: 'JASIC MIG160-N219 เครื่องเชื่อม+ป้อนลวด (ชุด)',
        name: 'JASIC MIG160-N219 เครื่องเชื่อม+ป้อนลวด (ชุด)',
        price: '17500.00',
        weight: '12000.00',
        height: '0.00',
        depth: '0.00',
        width: '0.00',
        cover: null,
        contain: null,
        unit: 'ชุด',
        quantity: 1,
        created_at: '2019-04-04 09:43:42',
        updated_at: '2019-04-04 09:43:42'
      },
      brand: {
        id: 14,
        name: 'JASIC',
        brand_parent_id: 14,
        is_featured: 0,
        slug: 'jasic',
        image_url: 'https://s3-ap-southeast-1.amazonaws.com/maqe-powertools/media/1560068146_Jasic.jpg',
        created_at: '2019-04-04 09:43:42',
        updated_at: '2019-06-09 08:16:02'
      }
    }
  ]
  beforeEach(() => {
    actions = {
      getAllCatsbrands: jest.fn(),
      filterCatsbrands: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      getters: catsbrands.getters
    })
  })

  it('Case 1: Show items', async () => {
    const wrapper = shallowMount(ListItem, {
      store,
      computed: {
        items() {
          return mockItem1
        }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/JASIC CUT40 เครื่องตัดพลาสมา/)
    expect(wrapper.text()).toMatch(/JASIC MIG160-N219 เครื่องเชื่อม/)
  })
})
