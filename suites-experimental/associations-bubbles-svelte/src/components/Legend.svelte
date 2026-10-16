<script>
  import { colorRange } from '../constants';
</script>

<div>
  <span class="no-data-swatch"></span>{' '}
  <span class="no-data-label">No data</span>
  <div class="scale">
    <div class="end-label">0</div>
    {#each colorRange as color (color)}
      <div class="swatch" style="background-color: {color};"></div>
    {/each}
    <div class="end-label">1</div>
  </div>
  <a
    class="score-link"
    href="https://platform-docs.opentargets.org/associations#association-scores"
  >
    <span class="question">?</span> Score
  </a>
</div>

<style>
  .no-data-swatch {
    display: inline-block;
    border: 1px solid #eeefef;
    height: 20px;
    width: 20px;
  }

  .no-data-label {
    position: relative;
    bottom: 5px;
  }

  .scale {
    display: flex;
  }

  .swatch {
    height: 20px;
    width: 20px;
  }

  .end-label {
    height: 20px;
    width: 20px;
    text-align: center;
    font-size: 0.75rem;
    line-height: 20px;
  }

  .score-link {
    color: #3489ca;
    text-decoration: none;
  }

  .score-link:hover {
    text-decoration: underline;
  }

  .question {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #3489ca;
    color: white;
    text-align: center;
    line-height: 14px;
    font-size: 10px;
    font-weight: bold;
  }
</style>
