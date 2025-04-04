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

  <p>
    FaceMap
    <pre id="test"></pre>
  </p>
  
  <div id="controls">
    <button class="scramble-controls">Scramble</button>

    <div class="rotation-controls">
      <div>
        <button class="rotation-controls__button rotation-controls__button--up-left">\&#9700;</button>
        <button class="rotation-controls__button rotation-controls__button--up">\&#9650;</button>
        <button class="rotation-controls__button rotation-controls__button--up-right">\&#9701;</button>
      </div>
      <div>
        <button class="rotation-controls__button rotation-controls__button--left">\&#9664;</button>
        <button class="rotation-controls__button rotation-controls__button--down">\&#9660;</button>
        <button class="rotation-controls__button rotation-controls__button--right">\&#9654;</button>
      </div>
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
      font-size: 1.75rem;
    }
    .rotation-controls,
    .move-controls {
      display: flex;
      flex-flow: column wrap;
      align-content: center;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1rem;
    }

    .rotation-controls {
      margin-bottom: 2rem;
    }
 
    .rotation-controls__button {
      font-size: 1.5rem;
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
