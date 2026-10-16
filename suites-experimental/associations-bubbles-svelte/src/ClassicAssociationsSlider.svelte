<script>
  import { decimalPlaces } from './constants';

  let { value, onChange, onChangeCommitted } = $props();
</script>

<div class="root">
  <div class="label">Minimum Score: {value.toFixed(decimalPlaces)}</div>
  <input
    class="slider"
    type="range"
    min="0"
    max="1"
    step="0.01"
    {value}
    oninput={event => onChange(event, Number(event.currentTarget.value))}
    onchange={event =>
      onChangeCommitted?.(event, Number(event.currentTarget.value))}
  />
</div>

<style>
  .root {
    width: 300px;
    padding: 10px 0;
  }

  .label {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.87);
  }

  .slider {
    width: 100%;
    accent-color: #3489ca;
    cursor: pointer;
    margin: 8px 0 0;
  }
</style>
