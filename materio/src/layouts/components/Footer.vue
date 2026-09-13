<template>
  <div class="h-100 d-flex align-center justify-md-space-between justify-center">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Powered By
      <a
        href="https://github.com/kiper225"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >GERVAIS KIPRE</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="#"
        target="noopener noreferrer"
      >License</a>      
    </span>
  </div>
</template>
