// to WebComponent
class App {
  $container: HTMLElement;

  constructor(containerId: string) {
    this.$container = document.querySelector(`#${containerId}`)!;
  }

  render() {
    this.$container.innerHTML = `
  <h1>Rubik's Cussbe</h1>
  
  <canvas id="scene"></canvas>

  <div class="controls">
    <button class="controls__button controls__button--up">\V</button>
    <button class="controls__button controls__button--left">\<</button>
    <button class="controls__button controls__button--right">\></button>
    <button class="controls__button controls__button--down">\V</button>
  </div>

  <style>
    .controls {
      display: flex;
      flex-flow: row wrap;
      margin-top: 2rem;
      max-width: 6rem;
      margin-left: auto;
      margin-right: auto;
    }
    .controls > * {
      flex: 1 100%;
    }
    .controls__button--up {
      margin-left: calc(100% / 3);
      margin-right: calc(100% / 3);
      transform: rotate(180deg);
    }
    .controls__button--left {
      flex: 1 auto;
      order: 1;
    }
    .controls__button--right {
      flex: 1 auto;
      order: 3;
    }
    .controls__button--down {
      flex: 3 0px;
      order: 2;
    }
  </style>
    `;
  }
}

export { App };
