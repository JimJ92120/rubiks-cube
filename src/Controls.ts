type RotationControls = {
  up: HTMLButtonElement;
  left: HTMLButtonElement;
  right: HTMLButtonElement;
  down: HTMLButtonElement;
};

type MoveControls = {
  positions: [HTMLButtonElement, HTMLButtonElement, HTMLButtonElement];
  direction: HTMLSelectElement;
};

// to WebComponent
class Controls {
  $container: HTMLElement;
  $rotationControls: RotationControls;
  $moveControls: MoveControls;
  $scrambleControls: HTMLButtonElement;

  constructor(
    $container: HTMLElement,
    $rotationControls: RotationControls,
    $moveControls: MoveControls,
    $scrambleControls: HTMLButtonElement
  ) {
    this.$container = $container;
    this.$rotationControls = $rotationControls;
    this.$moveControls = $moveControls;
    this.$scrambleControls = $scrambleControls;

    this.setRotationEvents();
    this.setMoveEvents();
    this.setScrambleEvents();
  }

  private setScrambleEvents(): void {
    this.$scrambleControls.addEventListener("click", () => {
      this.dispatchEvent("scramble", null);
    });
  }

  private setMoveEvents(): void {
    this.$moveControls.positions.map(($button: HTMLButtonElement) => {
      $button.addEventListener("click", (event) => {
        const direction = this.$moveControls.direction.value;
        const positionIndex = Number($button.getAttribute("position-index"));

        if (!direction || isNaN(positionIndex)) {
          return;
        }

        this.dispatchEvent("move", {
          direction,
          positionIndex,
        });
      });
    });
  }

  private setRotationEvents(): void {
    Object.keys(this.$rotationControls).map((buttonKey) => {
      const $button =
        this.$rotationControls[buttonKey as keyof RotationControls];

      $button.addEventListener("click", (event) => {
        if (!event.target) {
          return;
        }

        switch (event.target) {
          case this.$rotationControls.up:
            this.dispatchEvent("rotate", "up");
            break;

          case this.$rotationControls.left:
            this.dispatchEvent("rotate", "left");
            break;

          case this.$rotationControls.right:
            this.dispatchEvent("rotate", "right");
            break;

          case this.$rotationControls.down:
            this.dispatchEvent("rotate", "down");
            break;

          default:
            //
            break;
        }
      });
    });
  }

  private dispatchEvent(eventName: string, data: any): void {
    const event = new CustomEvent(eventName, {
      detail: data,
    });

    this.$container.dispatchEvent(event);
  }
}

export default Controls;

export { RotationControls, MoveControls };
