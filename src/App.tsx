import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    return () => <div>
      <router-view />
    </div>
  },
})
