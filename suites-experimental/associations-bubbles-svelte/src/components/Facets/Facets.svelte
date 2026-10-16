<script>
  import Facet from './Facet.svelte';
  import {
    getFilters,
    hasAllChildrenChecked,
    hasAnyDescendantChecked,
    prepareFacetData,
    updateFacetCounts,
    setAllChildren,
    traverse,
  } from './utils';

  let { loading, data, onChange, type } = $props();

  let facets = $state([]);
  let lastData = null;

  $effect(() => {
    if (!data || data === lastData) return;
    lastData = data;
    if (!facets.length) {
      facets = prepareFacetData(data);
    } else {
      facets = updateFacetCounts(facets, data);
    }
  });

  function handleFilterChange(changePath, value) {
    const [node, parent] = traverse(facets, changePath);

    const newValue = value ?? !node.checked;

    node.checked = newValue;
    if (!newValue && parent) parent.checked = false;
    if (parent && !parent.root && hasAllChildrenChecked(parent))
      parent.checked = true;
    setAllChildren(node, newValue);

    onChange(getFilters(facets));
  }

  function handleClickClear() {
    facets.forEach(facet => {
      setAllChildren(facet, false);
    });

    onChange(getFilters(facets));
  }
</script>

<div class="facet-summary">
  <h3>Filter by</h3>
  {#if loading && facets.length > 0}
    <div class="loading-container">
      <span class="spinner"></span> Updating facets...
    </div>
  {/if}
  {#if hasAnyDescendantChecked(facets)}
    <button class="clear-all" disabled={loading} onclick={handleClickClear}>
      &#10005;
    </button>
  {/if}
</div>

{#if loading && facets.length === 0}
  <div class="skeleton"></div>
{/if}
{#if facets.length > 0}
  <div class="subtitle1">Evidence-specific filters</div>
  <Facet
    {loading}
    key={facets[0].nodeId}
    treeId={facets[0].nodeId}
    label={facets[0].label}
    aggs={facets[0].aggs}
    onSelectionChange={handleFilterChange}
  />
  <div class="subtitle2">
    {type === 'target' ? 'Target' : 'Disease/phenotype'}-specific filters
  </div>
  {#each facets.slice(1) as facet (facet.nodeId)}
    <Facet
      {loading}
      treeId={facet.nodeId}
      label={facet.label}
      aggs={facet.aggs}
      onSelectionChange={handleFilterChange}
    />
  {/each}
{/if}

<style>
  .facet-summary {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .facet-summary h3 {
    margin: 0;
    font-size: 1.17em;
  }

  .loading-container {
    align-items: center;
    display: flex;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
  }

  .spinner {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    border: 2px solid #3489ca;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .clear-all {
    border: none;
    background: transparent;
    color: #757575;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 13px;
  }

  .clear-all:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .skeleton {
    height: 48px;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  .subtitle1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }

  .subtitle2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }
</style>
