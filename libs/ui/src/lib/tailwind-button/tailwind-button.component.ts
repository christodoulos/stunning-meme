import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, UiSize } from '@nocode/data-interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tailwind-button',
  templateUrl: './tailwind-button.component.html',
  styleUrls: ['./tailwind-button.component.css'],
})
export class TailwindButtonComponent implements OnInit {
  @Input() iconKey = '';
  @Input() buttonType = 'button';
  @Input() buttonText = 'Button Text';
  @Input() iconPosition = 'leading';
  @Input() size: UiSize = UiSize.Medium;
  @Input() type: ButtonType = ButtonType.Info;
  iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' = 'lg';

  ngOnInit(): void {
    switch (this.size) {
      case UiSize.Xsmall:
        this.iconSize = 'xs';
        break;
      case UiSize.Small:
        this.iconSize = 'sm';
        break;
      case UiSize.Medium:
        this.iconSize = 'md';
        break;
      case UiSize.Large:
        this.iconSize = 'lg';
        break;
      case UiSize.Xlarge:
        this.iconSize = 'xl';
        break;
      case UiSize.XXlarge:
        this.iconSize = 'xxl';
        break;
    }
  }

  get _color() {
    switch (this.type) {
      case ButtonType.Info:
      case ButtonType.Primary:
        return 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
      case ButtonType.Secondary:
        return 'lala';
      case ButtonType.Success:
        return 'green';
      case ButtonType.Danger:
        return 'red';
      case ButtonType.White:
        return 'gray';
    }
  }

  // get _text() {
  //   switch (this.type) {
  //     case ButtonType.Info:
  //     case ButtonType.Primary:
  //     case ButtonType.Secondary:
  //     case ButtonType.Success:
  //     case ButtonType.Danger:
  //     case ButtonType.White:
  //   }
  // }

  get _border() {
    switch (this.type) {
      case ButtonType.Info:
      case ButtonType.Primary:
      case ButtonType.Secondary:
      case ButtonType.Success:
      case ButtonType.Danger:
        return 'border border-transparent';
      case ButtonType.White:
        return 'border border-gray-300';
    }
  }

  get _size() {
    switch (this.size) {
      case UiSize.Xsmall:
        return 'px-2.5 py-1.5 text-xs font-medium rounded';
      case UiSize.Small:
        return 'px-3 py-2 text-sm leading-4 font-medium rounded-md';
      case UiSize.Medium:
        return 'px-4 py-2 text-sm font-medium rounded-md';
      case UiSize.Large:
        return 'px-4 py-2 text-base font-medium rounded-md';
      case UiSize.Xlarge:
      case UiSize.XXlarge:
        return 'px-6 py-3 text-base font-medium rounded-md';
    }
  }
}
