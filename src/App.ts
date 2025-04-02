class App {
  $container: HTMLElement;

  constructor(containerId: string) {
    this.$container = document.querySelector(`#${containerId}`)!;
  }

  render() {
    this.$container.innerHTML = `
  <h1>Rubik's Cube</h1>
  
  <canvas id="scene" />
    `;
  }
}

export { App };
