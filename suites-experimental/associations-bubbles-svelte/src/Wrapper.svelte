<script>
  import { downloaderChunkSize } from './constants';
  import { fetchAssociations, fetchEfo } from './api';

  // Same chunked download as hooks/useBatchDownloader.js
  async function getAllAssociations(aggregationFilters) {
    const getRows = chunk => chunk.target.associatedDiseases.rows;
    const firstChunk = await fetchAssociations(
      0,
      downloaderChunkSize,
      aggregationFilters
    );
    let data = [...getRows(firstChunk)];
    const count = Math.ceil(
      firstChunk.target.associatedDiseases.count / downloaderChunkSize
    );
    const chunkPromises = [];
    for (let index = 1; index < count; index++) {
      chunkPromises.push(
        fetchAssociations(index, downloaderChunkSize, aggregationFilters)
      );
    }
    const remainingChunks = await Promise.all(chunkPromises);
    remainingChunks.forEach(chunk => {
      data = [...data, ...getRows(chunk)];
    });
    return data;
  }

  let { ensemblId, symbol, Component, aggregationFilters } = $props();

  let nodes = $state(undefined);
  let associations = $state(undefined);
  let requestId = 0;

  $effect(() => {
    const id = ++requestId;
    const filters = aggregationFilters;
    Promise.all([fetchEfo(), getAllAssociations(filters)]).then(data => {
      if (id !== requestId) return;
      nodes = data[0]
        .trim()
        .split('\n')
        .map(JSON.parse);
      associations = data[1];
    });
  });

  const idToDisease = $derived.by(() => {
    if (!nodes) return undefined;
    return nodes.reduce((acc, disease) => {
      acc[disease.id] = disease;
      return acc;
    }, {});
  });
</script>

{#if !nodes || !associations}
  <div class="skeleton"></div>
{:else}
  <Component {ensemblId} {symbol} {idToDisease} {associations} />
{/if}

<style>
  .skeleton {
    height: 40vh;
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
</style>
