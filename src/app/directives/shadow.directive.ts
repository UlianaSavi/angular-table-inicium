import { Directive, ViewContainerRef, OnDestroy, Renderer2 } from "@angular/core";
import { Subject, fromEvent } from "rxjs";
import { takeUntil, auditTime } from "rxjs/operators";

@Directive({
  selector: '[appShadow]'
})
export class ShadowDirective implements OnDestroy {
  private auditTimeMs = 125;
  private readonly destroy$: Subject<void> = new Subject();
  private readonly hostElement: HTMLElement;

  constructor(private vcRef: ViewContainerRef, private renderer: Renderer2) {
    this.hostElement = vcRef.element.nativeElement;

    fromEvent(this.hostElement, 'scroll').pipe(
      auditTime(this.auditTimeMs),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.setClasses();
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setClasses() {
    if (this.hostElement.scrollTop) {
      this.renderer.addClass(this.hostElement, 'scrolled');
    } else {
      this.renderer.removeClass(this.hostElement, 'scrolled');
    }
  }
}
