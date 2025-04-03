// to WebComponent
class App {
  $container: HTMLElement;

  constructor(containerId: string) {
    this.$container = document.querySelector(`#${containerId}`)!;
  }

  render() {
    this.$container.innerHTML = `
  <h1>Rubik's Cube</h1>
  
  <canvas id="scene"></canvas>



  <div id="controls">
    <p>FaceMap</p>
    <pre id="test"></pre>

    <button class="scramble-controls">Scramble</button>

    <p>Rotate:</p>
    <div class="rotation-controls">
      <button class="rotation-controls__button rotation-controls__button--up">\V</button>
      <button class="rotation-controls__button rotation-controls__button--left">\<</button>
      <button class="rotation-controls__button rotation-controls__button--right">\></button>
      <button class="rotation-controls__button rotation-controls__button--down">\V</button>
    </div>

    <p>Move:</p>
    <div class="move-controls">
      <select class="move-controls__direction">
        <option value="up">Up</option>
        <option value="down">Down</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <div class="move-controls__position">
        ${Array(3)
          .fill(0)
          .reduce(
            (_result, __, index) =>
              _result +
              `<button class="move-controls__position-button" position-index="${index}">${
                index + 1
              }</button>`,
            ""
          )}
      </div>
    </div>
  <div>

  <style>
    #controls {
      margin-top: 2rem;
    }
    .rotation-controls,
    .move-controls {
      font-size: 1.25rem;
      display: flex;
      flex-flow: row wrap;
      align-content: center;
      justify-content: center;
      max-width: 6rem;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1rem;
    }

    .rotation-controls {
      margin-bottom: 2rem;
    }
    .rotation-controls > * {
      flex: 1 100%;
    }
    .rotation-controls__button {
      font-size: 1.25rem;
    }
    .rotation-controls__button--up {
      margin-left: calc(100% / 3);
      margin-right: calc(100% / 3);
      transform: rotate(180deg);
    }
    .rotation-controls__button--left {
      flex: 1 auto;
      order: 1;
    }
    .rotation-controls__button--right {
      flex: 1 auto;
      order: 3;
    }
    .rotation-controls__button--down {
      flex: 3 0px;
      order: 2;
    }
    
    .move-controls > * {
      margin-bottom: 1rem;
    }
    .move-controls__position-button {
      margin: 0.25rem;
    }
  </style>
    `;
  }
}

export { App };
