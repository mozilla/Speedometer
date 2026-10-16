<script>
  import { hasAnyDescendantChecked } from './utils';
  import TreeLevel from './TreeLevel.svelte';

  let { loading, treeId, label, aggs, onSelectionChange } = $props();

  let expanded = $state(false);

  const anyChecked = $derived(hasAnyDescendantChecked(aggs));

  function handleSelectionChange(newSelection) {
    onSelectionChange(newSelection);
  }

  function handleClickClear(event) {
    event.stopPropagation();
    onSelectionChange([treeId], false);
  }
</script>

<div class="accordion">
  <div
    class="summary"
    onclick={() => (expanded = !expanded)}
    onkeydown={event => event.key === 'Enter' && (expanded = !expanded)}
    role="button"
    tabindex="0"
  >
    <span class="summary-label">{label}</span>
    {#if anyChecked}
      <button class="clear" disabled={loading} onclick={handleClickClear}>
        &#10005;
      </button>
    {/if}
    <span class="chevron">{expanded ? '\u25b2' : '\u25bc'}</span>
  </div>
  {#if expanded}
    <div class="details">
      <TreeLevel
        {loading}
        levelId={treeId}
        {aggs}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  {/if}
</div>

<style>
  .accordion {
    border: 1px solid rgba(0, 0, 0, 0.12);
    margin-bottom: 8px;
    background: #fff;
  }

  .summary {
    align-items: center;
    display: flex;
    justify-content: space-between;
    min-height: 48px;
    padding: 0 12px 0 16px;
    cursor: pointer;
    outline: none;
  }

  .summary:hover {
    background: #f5f5f5;
  }

  .summary-label {
    font-size: 0.875rem;
    flex: 1;
  }

  .clear {
    border: none;
    background: transparent;
    color: #757575;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 13px;
  }

  .clear:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  .chevron {
    color: #757575;
    font-size: 11px;
    margin-left: 4px;
  }

  .details {
    padding: 0 8px 8px;
  }
</style>
