import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms'

import { PAGES_ROUTES } from "./pages.routes";

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graphics1Component } from "./graphics1/graphics1.component";
import { PagesComponent } from "./pages.component";
import { IncrementatorComponent } from "../components/incrementator/incrementator.component";
import { DonutGraphicComponent } from "../components/donut-graphic/donut-graphic.component";

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncrementatorComponent,
        DonutGraphicComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})

export class PagesModule { }