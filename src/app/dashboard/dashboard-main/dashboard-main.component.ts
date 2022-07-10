import { Component, OnInit } from '@angular/core';
// Imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from "@amcharts/amcharts4/themes/material";

import { DashboardMainService } from './dashboard-main.service';
// Base chart themes.
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
})
export class DashboardMainComponent implements OnInit {
  isNewShortUrlsData: boolean = true;
  isUrlStatusData: boolean = true;

  constructor(private dashboardMainService: DashboardMainService) {}

  ngOnInit(): void {
    this.createChartsTypesofBrowserAndClick();
  }

  createChartsTypesofBrowserAndClick() {
    // Create chart instance
    let chart = am4core.create('browsers', am4charts.PieChart);
    chart.logo.__disabled = true;

    let param = { creator: sessionStorage.getItem('id') };
    this.dashboardMainService.getDashboardData(param).subscribe((data: any) => {
      // console.log(data);
      if (data.status === 'success') {
        if (data.result[0].length !== 0) {
          this.isUrlStatusData = false;
          let chartData = [];
          chartData = data.result[0].browser_clicks_info;

          const dataForChart = [];
          for (let i = 0; i < chartData.length; i++) {
            dataForChart.push({
              label: chartData[i].browser_name,
              value: chartData[i].browser_clicks,
            });
          }
          chart.data = dataForChart;
          // Add and configure Series
          let pieSeries = chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = 'value';
          pieSeries.dataFields.category = 'label';

          // Let's cut a hole in our Pie chart the size of 30% the radius
          chart.innerRadius = am4core.percent(30);

          // Put a thick white border around each Slice
          pieSeries.slices.template.stroke = am4core.color('#1e1f31');
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;
          pieSeries.slices.template.tooltipText = "{category}: {value}";
          pieSeries.slices.template.fontFamily = 'Dosis, Josefin Sans, sans-serif';
          // change the cursor on hover to make it apparent the object can be interacted with
          pieSeries.slices.template.cursorOverStyle = [
            {
              property: 'cursor',
              value: 'pointer',
            },
          ];

          pieSeries.alignLabels = false;
          pieSeries.labels.template.bent = true;
          pieSeries.labels.template.radius = 3;
          pieSeries.labels.template.padding(0,0,0,0);
          pieSeries.labels.template.fontFamily = 'Dosis, Josefin Sans, sans-serif';
          pieSeries.labels.template.fill = am4core.color('#fff');

          pieSeries.ticks.template.disabled = true;

          // Create a base filter effect (as if it's not there) for the hover to return to
          let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
          shadow.opacity = 0;

          // Create hover state
          let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

          // Slightly shift the shadow and make it more prominent on hover
          //Object is possibly 'undefined'.ts(2532) for this ERROR we use
          //@ts-ignore
          let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
          hoverShadow.opacity = 0.7;
          hoverShadow.blur = 5;
          
        }
      }
    });
  }
}
