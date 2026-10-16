<script>
  import ClassicAssociationsBubbles from './ClassicAssociationsBubbles.svelte';
  import { Facets } from './components/Facets';
  import Wrapper from './Wrapper.svelte';
  import { ensemblId, symbol, fetchFacets } from './api';

  let aggregationFilters = $state([]);
  let loading = $state(true);
  let data = $state(undefined);
  let requestId = 0;

  $effect(() => {
    const id = ++requestId;
    const filters = aggregationFilters;
    loading = true;
    data = undefined;
    fetchFacets(filters).then(result => {
      if (id !== requestId) return;
      data = result;
      loading = false;
    });
  });

  const facetData = $derived(
    data?.target?.associatedDiseases.aggregations.aggs
  );

  function handleChangeFilters(newFilters) {
    aggregationFilters = newFilters;
  }
</script>

<div class="container">
  <div class="grid">
    <div class="col full">
      <h6 class="title">
        {#if data}
          <strong>
            {data.target.associatedDiseases.count} diseases or phenotypes
          </strong>{' '}
          associated with <strong>{symbol}</strong>
        {:else}
          <strong>Loading...</strong>
        {/if}
      </h6>
    </div>
    <div class="col facets-col">
      <div class="card">
        <div class="card-content">
          <Facets
            {loading}
            data={facetData}
            onChange={handleChangeFilters}
            type="disease"
          />
        </div>
      </div>
    </div>
    <div class="col content-col">
      <div class="tabs">
        <button class="tab" disabled>Table</button>
        <button class="tab selected">Bubbles</button>
        <button class="tab" disabled>Graph</button>
      </div>
      <div class="card content-card">
        <div class="card-content">
          <Wrapper
            {ensemblId}
            {symbol}
            Component={ClassicAssociationsBubbles}
            {aggregationFilters}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    padding: 0 24px;
    margin: 0 auto;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    margin-left: -16px;
    margin-right: -16px;
  }

  .col {
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
  }

  .full {
    width: 100%;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 500;
    margin: 0 0 16px;
    color: rgba(0, 0, 0, 0.87);
  }

  .card {
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 0;
  }

  .content-card {
    overflow: visible;
  }

  .card-content {
    padding: 16px;
  }

  .tabs {
    border-bottom: 1px solid #616161;
    display: flex;
  }

  .tab {
    background: transparent;
    border: none;
    padding: 6px 12px;
    min-width: 10px;
    font: inherit;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.54);
    cursor: pointer;
    text-transform: none;
  }

  .tab:not(:disabled):hover {
    background: #add0ea;
  }

  .tab.selected {
    background: #3489ca;
    color: white;
  }

  .tab.selected:hover {
    background: #3489ca;
  }

  .tab:disabled {
    color: rgba(0, 0, 0, 0.26);
    cursor: default;
  }

  @media (min-width: 1280px) {
    .facets-col {
      width: 25%;
    }

    .content-col {
      width: 75%;
    }
  }
</style>
