import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Chart } from "chart.js";

import { OnChanges } from "@angular/core";
@Component({
  selector: "app-limus-utilisation-chart",
  templateUrl: "./chart.component.html",
  encapsulation: ViewEncapsulation.None
})
export class LimusUtilisationChartComponent implements OnInit, OnChanges {
  myChart: Chart;
  @Input() chartdata: any;
  @ViewChild("canvas") stackchartcanvas: ElementRef;

  constructor() {}
  ngOnChanges() {
    this.getStackedChart();
  }

  ngOnInit(): void {
    this.getStackedChart();
  }

  getStackedChart() {
    Chart.Tooltip.positioners.custom = function(elements, position) {
      //debugger;
      return {
        x: position.x,
        y:
          elements[0]._view.base - (elements[0].height() + elements[1].height())
      };
    };

    const canvas: any = this.stackchartcanvas.nativeElement;
    const ctx = canvas.getContext("2d");
    var data = {
      labels: this.chartdata.buyernames,

      datasets: [
        {
          label: "Utilised Limit",
          data: this.chartdata.utilisedlimitData,
          backgroundColor: "#22aa99"
        },
        {
          label: "Available Limit",
          data: this.chartdata.availablelimit,
          backgroundColor: "#994499"
        }
      ]
    };

    setTimeout(() => {
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          tooltips: {
            mode: "index",
            intersect: true,
            position: "custom",
            yAlign: "bottom"
          },
          scales: {
            xAxes: [
              {
                stacked: true
              }
            ],
            yAxes: [
              {
                stacked: false,
                display: false
              }
            ]
          }
        }
      });
    });
  }
}
