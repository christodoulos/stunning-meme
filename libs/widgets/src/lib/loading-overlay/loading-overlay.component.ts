import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingOverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
