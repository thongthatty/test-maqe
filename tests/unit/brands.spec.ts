import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Brands from '@/components/Brands.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

import Vue from 'vue'
import catsbrands from '@/store/modules/catsbrands'

// const localVue = createLocalVue()
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

describe('Brands.vue', () => {
  let actions
  let store
  const mockFilterBrands1 = ['77']
  const mockFilterBrands2 = []
  const mockBrands1 = [
    {
      id: 65,
      name: '3M',
      brand_parent_id: 65,
      is_featured: 1,
      slug: '3m',
      image_url: 'https://s3-ap-southeast-1.amazonaws.com/maqe-powertools/media/1556166935_3M.jpg',
      created_at: '2019-04-04 09:44:52',
      updated_at: '2019-10-30 09:04:05'
    },
    {
      id: 35,
      name: 'APEX',
      brand_parent_id: 35,
      is_featured: 0,
      slug: 'apex',
      image_url: 'https://s3-ap-southeast-1.amazonaws.com/maqe-powertools/media/1556166998_APEX.png',
      created_at: '2019-04-04 09:44:09',
      updated_at: '2019-10-31 07:28:22'
    },
    {
      id: 22,
      name: 'ASAHI',
      brand_parent_id: 22,
      is_featured: 0,
      slug: 'asahi',
      image_url: 'https://s3-ap-southeast-1.amazonaws.com/maqe-powertools/media/1556166998_Asahi.jpeg',
      created_at: '2019-04-04 09:43:52',
      updated_at: '2019-04-25 04:39:54'
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

  it('Case 1: Show brands', async () => {
    const wrapper = shallowMount(Brands, {
      store,
      computed: {
        brands() {
          return mockBrands1
        }
      },
      data() {
        return {
          brandsSelected: mockFilterBrands2
        }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/3M/)
    expect(wrapper.text()).toMatch(/APEX/)
    expect(wrapper.text()).toMatch(/ASAHI/)
  })

  it('Case 2: Toggle brand', async () => {
    const wrapper = shallowMount(Brands, {
      store,
      computed: {
        brands() {
          return mockBrands1
        }
      },
      data() {
        return {
          brandsSelected: mockFilterBrands2
        }
      }
    })
    await wrapper.vm.$nextTick()
    // const toggle = wrapper.find('.custom-control-input')
    // console.log(toggle)
    // toggle.setChecked(true)
    // expect(wrapper.vm.$data.brandsSelected).toBe(true)
  })
})
