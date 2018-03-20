import { Component, OnInit, Input } from '@angular/core';
import { Invitation } from '../../../shared/models/invitation';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.less']
})
export class WeddingComponent implements OnInit {

  @Input() invitation: Invitation;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  rsvpOpened() {
    this.analyticsService.trackAttendanceOpened(this.invitation);
  }

}
