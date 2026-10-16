<script>
  import TreeItem from './TreeItem.svelte';
  import TreeLevel from './TreeLevel.svelte';
  import { hasSomeChildrenChecked } from './utils';

  let { loading, levelId, aggs, onSelectionChange } = $props();

  function handleSelectionChange(newSelection) {
    onSelectionChange([levelId, ...newSelection]);
  }
</script>

{#each aggs as agg (agg.nodeId)}
  <TreeItem
    {loading}
    nodeId={agg.nodeId}
    label={agg.label}
    count={agg.count}
    checked={agg.checked}
    indeterminate={hasSomeChildrenChecked(agg)}
    expandable={!!(agg.aggs && agg.aggs.length > 0)}
    onClick={handleSelectionChange}
  >
    {#if agg.aggs && agg.aggs.length > 0}
      <TreeLevel
        {loading}
        levelId={agg.nodeId}
        aggs={agg.aggs}
        {onSelectionChange}
      />
    {/if}
  </TreeItem>
{/each}
