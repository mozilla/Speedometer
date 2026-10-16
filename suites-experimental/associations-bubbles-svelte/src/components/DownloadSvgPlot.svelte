<script>
  import downloadSvg from './DownloadSvg';
  import PlotContainer from './PlotContainer.svelte';

  let {
    loading,
    error,
    left,
    center,
    svgContainer,
    filenameStem,
    reportDownloadEvent,
    children,
  } = $props();

  function handleSvgDownload() {
    const node = svgContainer;
    if (!node) return;
    const svgNode = node.nodeName === 'svg' ? node : node.querySelector('svg');
    downloadSvg({ svgNode, filenameStem });
  }
</script>

<PlotContainer {loading} {error} {left} {center}>
  {#snippet right()}
    <div class="right-row">
      <button
        class="svg-button"
        onclick={() => {
          if (reportDownloadEvent) reportDownloadEvent();
          handleSvgDownload();
        }}
      >
        SVG
      </button>
    </div>
  {/snippet}
  {@render children?.()}
</PlotContainer>

<style>
  .right-row {
    display: flex;
    justify-content: flex-end;
  }

  .svg-button {
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 0;
    padding: 5px 15px;
    min-width: 32px;
    height: 32px;
    color: #3489ca;
    font: inherit;
    font-size: 0.875rem;
    cursor: pointer;
    text-transform: none;
  }

  .svg-button:hover {
    background: rgba(52, 137, 202, 0.08);
    border-color: #3489ca;
  }
</style>
