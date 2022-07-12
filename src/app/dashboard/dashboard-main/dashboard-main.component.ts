import { Component, OnInit } from '@angular/core';
// Imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';

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
  urlStatusData: boolean = true;
  isUrlStatusData: boolean = true;
  lastSevenDays: boolean = true;
  totalUrlClick: number = 0;
  disableUrls: number = 0;
  lastThirtyDaysUrlData: number = 0;

  constructor(private dashboardMainService: DashboardMainService) {}

  ngOnInit(): void {
    this.getUrlDataInfo();
    this.createChartsTypesofBrowserAndClick();
    this.createChartsTypesofDeviceAndClick();
    this.createChartForNewUrl();
  }

  getUrlDataInfo() {
    let params = {
      creator: `${sessionStorage.getItem('id')}`,
    };

    this.dashboardMainService.getUrlData(params).subscribe((data: any) => {
      // console.log(data)
      if (data.status === 'success') {
        this.createUrlStatusChart(data.result);
        data.result.forEach((item: any) => {
          this.totalUrlClick += item.total_url_clicks;
        });
      }
    });
  }

  createUrlStatusChart(data: any) {
    // console.log(data)
    // Create chart instance
    let chart = am4core.create('urlStatus', am4charts.PieChart);
    chart.logo.__disabled = true;

    this.urlStatusData = false;
    let chartData = [],
      activeCount = 0,
      inActiveCount = 0;
    //@ts-ignore
    data.forEach((item, index) => {
      if (item.status === 'Active') {
        activeCount++;
      } else {
        inActiveCount++;
      }
    });
    this.disableUrls = inActiveCount;
    // console.log(activeCount, inActiveCount);
    if (activeCount !== 0) {
      chartData.push({ url_status: 'Active', url_count: activeCount });
    }
    if (inActiveCount !== 0) {
      chartData.push({ url_status: 'Inactive', url_count: inActiveCount });
    }
    chart.data = chartData;
    // Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'url_count';
    pieSeries.dataFields.category = 'url_status';
    pieSeries.slices.template.stroke = am4core.color('#1e1f31');
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.tooltipText = '{category} URL: {value}';

    pieSeries.labels.template.fontFamily = 'Dosis, Josefin Sans, sans-serif';
    pieSeries.labels.template.fill = am4core.color('#fff');

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
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
          pieSeries.hiddenState.properties.endAngle = -90; // Fan Out Animation

          // Let's cut a hole in our Pie chart the size of 30% the radius
          chart.innerRadius = am4core.percent(30);

          // Put a thick white border around each Slice
          pieSeries.slices.template.stroke = am4core.color('#1e1f31');
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;
          pieSeries.slices.template.tooltipText = '{category}: {value}';
          pieSeries.slices.template.fontFamily =
            'Dosis, Josefin Sans, sans-serif';
          // change the cursor on hover to make it apparent the object can be interacted with
          pieSeries.slices.template.cursorOverStyle = [
            {
              property: 'cursor',
              value: 'pointer',
            },
          ];

          pieSeries.alignLabels = false;
          pieSeries.labels.template.bent = false;
          pieSeries.labels.template.radius = 3;
          pieSeries.labels.template.padding(0, 0, 0, 0);
          pieSeries.labels.template.fontFamily =
            'Dosis, Josefin Sans, sans-serif';
          pieSeries.labels.template.fill = am4core.color('#fff');

          pieSeries.ticks.template.disabled = true;

          // Create a base filter effect (as if it's not there) for the hover to return to
          let shadow = pieSeries.slices.template.filters.push(
            new am4core.DropShadowFilter()
          );
          shadow.opacity = 0;

          // Create hover state
          let hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

          // Slightly shift the shadow and make it more prominent on hover
          //Object is possibly 'undefined'.ts(2532) for this ERROR we use
          //@ts-ignore
          let hoverShadow = hoverState.filters.push(
            new am4core.DropShadowFilter()
          );
          hoverShadow.opacity = 0.7;
          hoverShadow.blur = 5;
        }
      }
    });
  }

  createChartsTypesofDeviceAndClick() {
    // Create chart instance
    let chart = am4core.create('devices', am4charts.PieChart);
    chart.logo.__disabled = true;

    let param = { creator: sessionStorage.getItem('id') };
    this.dashboardMainService.getDeviceData(param).subscribe((data: any) => {
      // console.log(data);
      if (data.status === 'success') {
        if (data.result[0].length !== 0) {
          this.isNewShortUrlsData = false;
          let chartData = [];
          chartData = data.result[0].device_name_array;

          const dataForChart = [];
          for (let i = 0; i < chartData.length; i++) {
            dataForChart.push({
              label:
                chartData[i].device_name.charAt(0).toUpperCase() +
                chartData[i].device_name.slice(1),
              value: chartData[i].device_clicks,
            });
          }
          chart.data = dataForChart;

          // Add and configure Series
          let pieSeries = chart.series.push(new am4charts.PieSeries());
          pieSeries.dataFields.value = 'value';
          pieSeries.dataFields.category = 'label';
          pieSeries.hiddenState.properties.endAngle = -90; // Fan Out Animation

          // Let's cut a hole in our Pie chart the size of 30% the radius
          chart.innerRadius = am4core.percent(30);

          // Put a thick white border around each Slice
          pieSeries.slices.template.stroke = am4core.color('#1e1f31');
          pieSeries.slices.template.strokeWidth = 2;
          pieSeries.slices.template.strokeOpacity = 1;
          pieSeries.slices.template.tooltipText = '{category}: {value}';
          pieSeries.slices.template.fontFamily =
            'Dosis, Josefin Sans, sans-serif';
          // change the cursor on hover to make it apparent the object can be interacted with
          pieSeries.slices.template.cursorOverStyle = [
            {
              property: 'cursor',
              value: 'pointer',
            },
          ];

          pieSeries.alignLabels = false;
          pieSeries.labels.template.bent = false;
          pieSeries.labels.template.radius = 3;
          pieSeries.labels.template.padding(0, 0, 0, 0);
          pieSeries.labels.template.fontFamily =
            'Dosis, Josefin Sans, sans-serif';
          pieSeries.labels.template.fill = am4core.color('#fff');

          pieSeries.ticks.template.disabled = true;

          // Create a base filter effect (as if it's not there) for the hover to return to
          let shadow = pieSeries.slices.template.filters.push(
            new am4core.DropShadowFilter()
          );
          shadow.opacity = 0;

          // Create hover state
          let hoverState = pieSeries.slices.template.states.getKey('hover'); // normally we have to create the hover state, in this case it already exists

          // Slightly shift the shadow and make it more prominent on hover
          //Object is possibly 'undefined'.ts(2532) for this ERROR we use
          //@ts-ignore
          let hoverShadow = hoverState.filters.push(
            new am4core.DropShadowFilter()
          );
          hoverShadow.opacity = 0.7;
          hoverShadow.blur = 5;
        }
      }
    });
  }

  createChartForNewUrl() {
    let chart = am4core.create('sevenDaysData', am4charts.XYChart);
    chart.logo.__disabled = true;

    let param = { creator: sessionStorage.getItem('id') };
    this.dashboardMainService.getLastSevenData(param).subscribe((data: any) => {
      // console.log(data);
      if (data.status === 'success') {
        this.lastThirtyDaysUrlData = data.lastThirtyDaysInfo;
        // if (data.resultLength > 0) {
        //   this.lastSevenDays = false;

        //   //@ts-ignore
        //   chart.data = data.lastSevenDaysData;

        //   var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
        //   categoryAxis.renderer.grid.template.location = 0;
        //   categoryAxis.renderer.minGridDistance = 10;
        //   categoryAxis.renderer.cellStartLocation = 0.2;
        //   categoryAxis.renderer.cellEndLocation = 1;
        //   categoryAxis.renderer.inversed = true;
        //   categoryAxis.renderer.grid.template.disabled = true;

        //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        //   valueAxis.min = 0;
        //   valueAxis.extraMax = 0.1;

        //   var series = chart.series.push(new am4charts.ColumnSeries());
        //   series.dataFields.dateX = 'creation_date';
        //   series.dataFields.valueY = 'total_clicks';
        //   //@ts-ignore
        //   series.tooltip.fontFamily = 'Dosis, Josefin Sans, sans-serif';
        //   series.fontFamily = 'Dosis, Josefin Sans, sans-serif';
        //   series.columns.template.strokeOpacity = 0;
        //   series.columns.template.column.cornerRadiusTopRight = 10;
        //   series.columns.template.column.cornerRadiusTopLeft = 10;

        //   var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        //   labelBullet.label.verticalCenter = 'bottom';
        //   labelBullet.label.dy = -10;
        //   labelBullet.fontFamily = 'Dosis, Josefin Sans, sans-serif';
        //   labelBullet.label.fill = am4core.color('#fff');
        //   labelBullet.label.text =
        //     "{values.valueY.workingValue.formatNumber('#.')}";

        //   chart.zoomOutButton.disabled = true;

        //   // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        //   series.columns.template.adapter.add('fill', function (fill, target) {
        //     //@ts-ignore
        //     return chart.colors.getIndex(target.dataItem.index);
        //   });
        // }
      }
    });
  }
}
