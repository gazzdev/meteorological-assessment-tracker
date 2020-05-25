import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { TrackerRoutingModule } from './tracker-routing.module';
import { TrackerComponent } from './tracker.component';
import { HttpClientModule }    from '@angular/common/http';
import { ProgressPipe } from '../pipes/progress.pipe';

@NgModule({
  declarations: [TrackerComponent, ProgressPipe],
  imports: [
    CommonModule,
    TrackerRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TrackerModule { }
