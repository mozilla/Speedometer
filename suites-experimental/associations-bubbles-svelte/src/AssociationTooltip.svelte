<script>
  import { getContext } from 'svelte';

  let { ensemblId, efoId, name, score, children } = $props();

  const tooltip = getContext('bubbles-tooltip');

  function show(event) {
    tooltip?.show(event, { ensemblId, efoId, name, score });
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<g
  onmouseenter={show}
  onmousemove={show}
  onmouseleave={() => tooltip?.hide()}
>
  {@render children?.()}
</g>
