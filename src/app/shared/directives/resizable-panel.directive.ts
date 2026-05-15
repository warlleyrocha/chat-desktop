import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  inject,
  input,
  output,
} from '@angular/core';

@Directive({
  selector: '[appResizablePanel]',
})
export class ResizablePanelDirective implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly minWidth = input(240);
  readonly maxWidth = input(760);

  readonly widthChange = output<number>();

  private dragging = false;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.dragging = true;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private readonly onMouseMove = (event: MouseEvent): void => {
    if (!this.dragging) {
      return;
    }
    const parent = this.host.nativeElement.parentElement;
    if (!parent) {
      return;
    }
    const parentLeft = parent.getBoundingClientRect().left;
    const width = this.clamp(event.clientX - parentLeft);
    this.widthChange.emit(width);
  };

  private readonly onMouseUp = (): void => {
    this.stopDragging();
  };

  private clamp(width: number): number {
    return Math.min(Math.max(width, this.minWidth()), this.maxWidth());
  }

  private stopDragging(): void {
    this.dragging = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  ngOnDestroy(): void {
    this.stopDragging();
  }
}
