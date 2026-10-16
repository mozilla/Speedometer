<script>
  import PlotContainerSection from './PlotContainerSection.svelte';

  let { loading, error, left, center, right, children } = $props();
</script>

<div class="plot-container">
  {#if left || center || right}
    <PlotContainerSection>
      <div class="row">
        <div class="left">{@render left?.()}</div>
        <div>{@render center?.()}</div>
        <div class="right">{@render right?.()}</div>
      </div>
    </PlotContainerSection>
  {/if}
  {#if loading}
    <div class="progress"><div class="bar"></div></div>
  {/if}
  {#if error}
    <PlotContainerSection>
      <div class="error">
        {#each error.graphQLErrors as { message } (message)}{message}{/each}
      </div>
    </PlotContainerSection>
  {/if}
  {@render children?.()}
</div>

<style>
  .plot-container {
    margin-bottom: 15px;
    background: #fff;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  .left {
    margin-left: 4px;
  }

  .right {
    margin-right: 4px;
  }

  .progress {
    height: 1px;
    width: 100%;
    overflow: hidden;
    background: #e0e0e0;
  }

  .bar {
    width: 40%;
    height: 100%;
    background: #3489ca;
    animation: indeterminate 1.6s infinite linear;
    transform-origin: 0 0;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%) scaleX(1);
    }
    100% {
      transform: translateX(250%) scaleX(1);
    }
  }

  .error {
    text-align: center;
    color: #ff6350;
  }
</style>
