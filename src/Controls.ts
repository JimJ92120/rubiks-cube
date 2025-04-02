type Buttons = {
  up: HTMLButtonElement;
  left: HTMLButtonElement;
  right: HTMLButtonElement;
  down: HTMLButtonElement;
};

// to WebComponent
class Controls {
  $container: HTMLElement;
  $buttons: Buttons;

  constructor($container: HTMLElement, $buttons: Buttons) {
    this.$container = $container;
    this.$buttons = $buttons;

    Object.keys(this.$buttons).map((buttonKey) => {
      const $button = this.$buttons[buttonKey as keyof Buttons];

      $button.addEventListener("click", (event) =>
        this.onButtonClicked(event as PointerEvent)
      );
    });
  }

  private onButtonClicked(event: PointerEvent): void {
    if (!event.target) {
      return;
    }

    switch (event.target) {
      case this.$buttons.up:
        this.dispatchRotationEvent("up");
        break;

      case this.$buttons.left:
        this.dispatchRotationEvent("left");
        break;

      case this.$buttons.right:
        this.dispatchRotationEvent("right");
        break;

      case this.$buttons.down:
        this.dispatchRotationEvent("down");
        break;

      default:
        //
        break;
    }
  }

  private dispatchRotationEvent(rotationDirection: string): void {
    this.dispatchEvent("rotate", rotationDirection);
  }

  private dispatchEvent(eventName: string, data: any): void {
    const event = new CustomEvent(eventName, {
      detail: data,
    });

    this.$container.dispatchEvent(event);
  }
}

export default Controls;
