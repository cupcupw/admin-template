<template>
  <div class="auth-view">
    <img src="@/assets/img/logo-auth.png" alt="logo" class="logo" />

    <div class="auth-figure">
      <img src="@/assets/img/img-auth.png" alt="figure" />
    </div>

    <RouterView class="auth-content" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .auth-view {
    @extend %df;
    @extend %aic;
    min-height: 100vh;
  }
  .logo {
    @extend %pf;
    top: j(16);
    left: j(16);
    width: j(100);
    height: j(100);
  }
  .auth-figure {
    @extend %df1;
    @extend %df;
    @extend %aic;
    @extend %jcc;
    img {
      @extend %w100;
      @extend %h100;
      max-width: j(1130 * 0.5);
      max-height: j(1030 * 0.5);
    }
  }
  .auth-content {
    @extend %df1;
    @extend %df;
    @extend %fdc;
    @extend %aic;
    @extend %jcc;
    @extend %bsb;
    padding: j(32) 0;
    width: j(576);
    background-color: #fff;
    min-height: 100vh;

    :deep {
      .form-content {
        @extend %bsb;
        @extend %w100;
        padding: j(40);
        margin-top: j(40);
        max-width: j(432);
        box-shadow:
          0px 10px 16px 0px rgba(224, 229, 240, 0.16),
          0px 18px 29px 0px rgba(224, 229, 240, 0.28);
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #edeff5;
        h2 {
          color: #1d2129;
          font-size: j(32);
          margin-bottom: j(32);
        }
      }
      .form-button {
        @extend %w100;
      }
    }
  }
</style>
