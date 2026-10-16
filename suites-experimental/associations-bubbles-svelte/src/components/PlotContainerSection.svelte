<script>
  import theme from '../theme';

  let { children } = $props();
</script>

<div
  class="plot-container-section"
  style="border-bottom: 1px solid {theme.palette.grey[300]};"
>
  {@render children?.()}
</div>

<style>
  .plot-container-section {
    padding: 4px 0;
  }
</style>
