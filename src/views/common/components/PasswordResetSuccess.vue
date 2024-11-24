<template>
  <div class="password-reset-success">
    <!-- <img src="@/assets/img/icon-reset-password.jpg" alt="success" /> -->
    <h3>修改成功</h3>
    <p>
      <strong>{{ count }}s</strong>
      之后自动跳转
    </p>
  </div>
</template>

<script setup lang="ts">
  import { useCountDown } from '@daysnap/vue-use'

  const [count, trigger] = useCountDown(5)
  const router = useRouter()

  watch(count, () => {
    if (count.value === 0) {
      router.push('/login')
    }
  })

  onMounted(() => {
    trigger()
  })
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .password-reset-success {
    @extend %df;
    @extend %fdc;
    @extend %aic;
    @extend %jcc;
    padding: j(60) 0;
    img {
      width: j(275);
      height: j(168);
    }
    h3 {
      margin-top: j(27);
      color: #4e5969;
      font-size: j(20);
    }
    p {
      margin-top: j(16);
      color: #4e5969;
      font-size: j(14);
    }
    strong {
      color: $color-primary;
      font-size: j(16);
    }
  }
</style>
