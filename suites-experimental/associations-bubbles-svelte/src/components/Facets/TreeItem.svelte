<script>
  let {
    loading = false,
    nodeId,
    label,
    count,
    checked = false,
    indeterminate = false,
    expandable = false,
    onClick,
    children,
  } = $props();

  let expanded = $state(false);

  function toggle() {
    if (!loading && count) onClick([nodeId]);
  }

  function indeterminateAction(node, value) {
    node.indeterminate = !!value;
    return {
      update: v => {
        node.indeterminate = !!v;
      },
    };
  }
</script>

<div class="tree-item">
  <div
    class="content"
    onclick={toggle}
    onkeydown={event => event.key === 'Enter' && toggle()}
    role="treeitem"
    aria-selected={checked}
    tabindex="0"
  >
    {#if expandable}
      <button
        class="expand"
        onclick={event => {
          event.stopPropagation();
          expanded = !expanded;
        }}
        aria-label="Toggle children"
      >
        {expanded ? '\u25be' : '\u25b8'}
      </button>
    {:else}
      <span class="expand-spacer"></span>
    {/if}
    <input
      class="checkbox"
      type="checkbox"
      {checked}
      disabled={loading || !count}
      use:indeterminateAction={indeterminate}
      onclick={event => event.stopPropagation()}
      onchange={toggle}
    />
    <span class="label-text" title={label}>{label}</span>
    <span class="count">{count}</span>
  </div>
  {#if expanded && children}
    <div class="children">{@render children()}</div>
  {/if}
</div>

<style>
  .content {
    align-items: center;
    display: flex;
    min-height: 32px;
    padding: 0 4px;
    cursor: pointer;
  }

  .content:hover {
    background-color: #eeeeee;
  }

  .expand,
  .expand-spacer {
    width: 22px;
    min-width: 22px;
    height: 22px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #757575;
    font-size: 11px;
    padding: 0;
  }

  .checkbox {
    accent-color: #3489ca;
    margin: 0 8px 0 0;
    cursor: pointer;
  }

  .label-text {
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }

  .count {
    font-size: 0.7rem;
    font-weight: bold;
    color: #9e9e9e;
    margin-left: 8px;
  }

  .children {
    padding-left: 16px;
  }
</style>
