<script>
  import { setContext } from 'svelte';
  import * as d3 from 'd3';

  import AssociationTooltip from './AssociationTooltip.svelte';
  import { colorRange, decimalPlaces } from './constants';
  import DownloadSvgPlot from './components/DownloadSvgPlot.svelte';
  import Legend from './components/Legend.svelte';
  import ClassicAssociationsSlider from './ClassicAssociationsSlider.svelte';
  import theme from './theme';

  function findTas(id, idToDisease) {
    const tas = new Set();
    const diseaseNode = idToDisease[id];
    if (diseaseNode.parentIds.length === 0) {
      return tas;
    }
    const queue = [id];
    while (queue.length > 0) {
      const diseaseId = queue.shift();
      const node = idToDisease[diseaseId];
      if (node.parentIds.length === 0) {
        tas.add(diseaseId);
      }
      for (let i = 0; i < node.parentIds.length; i++) {
        const parentId = node.parentIds[i];
        if (!queue.includes(parentId)) {
          queue.push(parentId);
        }
      }
    }

    return tas;
  }

  function buildHierarchicalData(associations, idToDisease) {
    const tasMap = {};
    const tasScore = {};
    associations.forEach(association => {
      const diseaseId = association.disease.id;
      if (idToDisease[diseaseId].parentIds.length === 0) {
        tasScore[diseaseId] = association.score;
      }
      const tas = findTas(diseaseId, idToDisease);
      tas.forEach(ta => {
        const assocData = {
          id: diseaseId,
          uniqueId: `${ta}-${diseaseId}`,
          name: association.disease.name,
          score: association.score,
        };
        if (tasMap[ta]) {
          tasMap[ta].push(assocData);
        } else {
          tasMap[ta] = [assocData];
        }
      });
    });

    return {
      uniqueId: 'EFO_ROOT',
      children: Object.entries(tasMap).map(([taId, descendants]) => {
        return {
          id: taId,
          uniqueId: taId,
          name: idToDisease[taId].name,
          score: tasScore[taId],
          children: descendants,
        };
      }),
    };
  }

  const color = d3
    .scaleQuantize()
    .domain([0, 1])
    .range(colorRange);

  let { ensemblId, symbol, idToDisease, associations } = $props();

  let minScore = $state(0.1);
  let size = $state(0);
  let measureEl = $state(null);
  let tooltip = $state(null);
  let hideTimer;

  const tooltipController = {
    show(event, payload) {
      clearTimeout(hideTimer);
      tooltip = { ...payload, x: event.clientX, y: event.clientY };
    },
    hide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        tooltip = null;
      }, 120);
    },
    cancelHide() {
      clearTimeout(hideTimer);
    },
  };

  setContext('bubbles-tooltip', tooltipController);

  const assocs = $derived(associations.filter(assoc => assoc.score >= minScore));

  const root = $derived.by(() => {
    const hierarchicalData = buildHierarchicalData(assocs, idToDisease);
    const hierarchy = d3.hierarchy(hierarchicalData);
    const packLayout = d3
      .pack()
      .size([size, size])
      .padding(node => (node.data.uniqueId === 'EFO_ROOT' ? 17 : 2));
    hierarchy.sum(d => d.score);
    packLayout(hierarchy);
    return hierarchy;
  });
</script>

<DownloadSvgPlot
  svgContainer={measureEl}
  filenameStem={`${symbol}-associated-diseases-bubbles`}
>
  <ClassicAssociationsSlider
    value={minScore}
    onChange={(_, val) => (minScore = val)}
  />
  <div class="measure" bind:clientWidth={size} bind:this={measureEl}>
    {#if size}
      {#if assocs.length > 0}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          height={size}
          width={size}
        >
          {#each root.descendants() as d (d.data.uniqueId)}
            <g transform="translate({d.x},{d.y})">
              <AssociationTooltip
                {ensemblId}
                efoId={d.data.id}
                name={d.data.name}
                score={d.data.score}
              >
                <path
                  id={d.data.uniqueId}
                  d={`M 0, ${d.r} a ${d.r},${d.r} 0 1,1 0,-${2 * d.r} a ${d.r},${d.r} 0 1,1 0,${2 * d.r}`}
                  stroke={d.data.uniqueId !== 'EFO_ROOT'
                    ? theme.palette.grey[400]
                    : 'none'}
                  fill={d.data.uniqueId === 'EFO_ROOT'
                    ? theme.palette.grey[50]
                    : d.parent.data.uniqueId === 'EFO_ROOT'
                      ? theme.palette.grey[50]
                      : color(d.data.score)}
                  pointer-events={d.data.uniqueId === 'EFO_ROOT'
                    ? 'none'
                    : 'auto'}
                />
              </AssociationTooltip>
              {#if d.data.uniqueId !== 'EFO_ROOT'}
                {#if d.parent && d.parent.data.uniqueId === 'EFO_ROOT'}
                  <text
                    text-anchor="middle"
                    font-size="12"
                    font-weight="bold"
                    fill={theme.palette.grey[400]}
                    pointer-events="none"
                  >
                    <textPath
                      startOffset="50%"
                      xlink:href={`#${d.data.uniqueId}`}
                    >
                      {d.data.name}
                    </textPath>
                  </text>
                {:else if d.r > 15}
                  {@const words = d.data.name.split(' ')}
                  <clipPath id={`clip-${d.data.uniqueId}`}>
                    <circle cx="0" cy="0" r={d.r} />
                  </clipPath>
                  <text
                    clip-path={`url(#clip-${d.data.uniqueId})`}
                    font-size="11"
                    text-anchor="middle"
                    pointer-events="none"
                  >
                    {#each words as word, i}
                      <tspan x="0" y={`${i - words.length / 2 + 0.8}em`}>
                        {word}
                      </tspan>
                    {/each}
                  </text>
                {/if}
              {/if}
            </g>
          {/each}
        </svg>
      {:else}
        <p class="empty">
          No associations with score greater than or equal to {minScore}
        </p>
      {/if}
    {/if}
  </div>
</DownloadSvgPlot>
<Legend />

{#if tooltip}
  <div
    class="tooltip"
    role="tooltip"
    style="left: {tooltip.x}px; top: {tooltip.y}px;"
    onmouseenter={tooltipController.cancelHide}
    onmouseleave={tooltipController.hide}
  >
    <div class="tt-title">{tooltip.name}</div>
    {#if tooltip.score}
      <div class="tt-score">
        association score: {tooltip.score.toFixed(decimalPlaces)}
      </div>
    {/if}
    <a
      class="tt-link"
      href={`https://platform.opentargets.org/disease/${tooltip.efoId}`}
    >
      Disease profile
    </a>
    <a
      class="tt-link"
      href={`https://www.targetvalidation.org/evidence/${tooltip.ensemblId}/${tooltip.efoId}`}
    >
      Association evidence
    </a>
  </div>
{/if}

<style>
  .measure {
    margin: 0 auto;
    min-height: 340px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 960px) {
    .measure {
      max-width: 83.3333%;
    }
  }

  .empty {
    color: rgba(0, 0, 0, 0.87);
  }

  .tooltip {
    position: fixed;
    z-index: 1500;
    transform: translate(-50%, calc(-100% - 14px));
    background: white;
    border: 1px solid #bdbdbd;
    padding: 8px 12px;
    font-size: 0.75rem;
    color: #5a5f5f;
    pointer-events: auto;
    white-space: nowrap;
  }

  .tt-title {
    font-weight: 500;
    font-size: 0.875rem;
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
  }

  .tt-score {
    text-align: center;
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.87);
  }

  .tt-link {
    display: block;
    text-align: center;
    font-size: 0.75rem;
    color: #3489ca;
    text-decoration: none;
  }

  .tt-link:hover {
    text-decoration: underline;
  }
</style>
