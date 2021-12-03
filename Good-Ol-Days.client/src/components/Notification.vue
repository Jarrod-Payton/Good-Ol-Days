<template>
  <li>
    <a class="dropdown-item">
      <h6 class="font">{{}}</h6>
    </a>
  </li>
</template>
<script>
import { onMounted } from "@vue/runtime-core"
import { notificationService } from "../services/NotificationService"

export default {
  props: { notification: { type: Object, required: true } },
  setup(props) {
    onMounted(async () => {
      const result = notificationService.findType(props.notification)
    })
  },
}
</script>
<style scoped>
</style>