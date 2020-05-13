import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Categories from '@/components/Categories.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

import Vue from 'vue'
import catsbrands from '@/store/modules/catsbrands'

// const localVue = createLocalVue()
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

describe('Categories.vue', () => {
  let actions
  let store
  const mockFilterCatagory1 = ['77']
  const mockFilterCatagory2 = []
  const mockCatagories1 = [
    {
      id: 16,
      name: 'ข้อต่อ',
      category_parent_id: 0,
      slug: null,
      image_url: 'https://factools.qa.maqe.com/assets/images/icon-19.svg',
      created_at: null,
      updated_at: null,
      childs: [
        {
          id: 77,
          name: 'ข้อต่อทองเหลือง',
          category_parent_id: 16,
          slug: null,
          image_url: null,
          created_at: '2019-04-04 09:45:05',
          updated_at: '2019-04-04 09:45:05'
        },
        {
          id: 76,
          name: 'ข้อต่อสวมเร็ว',
          category_parent_id: 16,
          slug: null,
          image_url: null,
          created_at: '2019-04-04 09:45:03',
          updated_at: '2019-04-04 09:45:03'
        }
      ]
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

  it('Case 1: Show catagories', async () => {
    const wrapper = shallowMount(Categories, {
      store,
      computed: {
        categories() {
          return mockCatagories1
        }
      },
      data() {
        return {
          categoriesSelected: mockFilterCatagory2
        }
      }
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/ข้อต่อ/)
  })

  it('Case 2: Toggle all', async () => {
    const wrapper = shallowMount(Categories, {
      store,
      computed: {
        categories() {
          return mockCatagories1
        }
      },
      data() {
        return {
          categoriesSelected: mockFilterCatagory2
        }
      }
    })
    await wrapper.vm.$nextTick()
    const toggleAll = wrapper.find('.toggle-all')
    toggleAll.trigger('click')
    expect(wrapper.vm.$data.categoriesSelected).toEqual([77, 76])
  })
})
