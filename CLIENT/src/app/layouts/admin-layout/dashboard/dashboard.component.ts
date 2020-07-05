import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { Router } from '@angular/router';
import { UsersService } from 'app/services/users.service';
import { EventsService } from 'app/services/events.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private usersService: UsersService,
    private eventSerivce: EventsService,
    private router: Router) {

    let token = this.accountService.getDecodedToken();
    if (token) {
      let currentRoles = token.roles;
      let isAdmin = currentRoles.some(role => currentRoles.includes("admin"));
      if (!isAdmin) this.router.navigateByUrl('/events/calendar');
    }
    this.getAllAgents()
    this.getAllEvents()
  }
  ngOnInit(): void {

  }

  usersRolePieChart(chartData) {
    let chart = am4core.create("agentsPieChart", am4charts.PieChart);
    // Add data
    chart.data = chartData;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Agent Number";
    pieSeries.dataFields.category = "role";
  }

  getAllAgents() {
    this.usersService.getAll()
      .subscribe((response: any) => {
        console.log("users : ", response)
        let chartData = []
        let values = response.map(x => x.roles[0])
        let occ = values.reduce((acc, it) => { if (Object.keys(acc).some(item => item == it)) return acc; else return { ...acc, [it]: values.filter(item => it == item).length }; }, {})
        console.log("occ : ", occ)
        for (const property in occ) {
          chartData.push({
            "role": property,
            "Agent Number": occ[property]
          })
        }
        this.usersRolePieChart(chartData)
      })
  }

  getAllEvents() {
    this.eventSerivce.getAll()
      .subscribe((response: any) => {
        console.log("events : ", response)
        let chartData = []
        response.sort((a,b)=> +new Date(a.startDate) - +new Date(b.startDate))


        let values = response.map(x => new Date(x.startDate).toISOString().split("T")[0])
        let occ = values.reduce((acc, it) => { if (Object.keys(acc).some(item => item == it)) return acc; else return { ...acc, [it]: values.filter(item => it == item).length }; }, {})
        console.log("occ : ", occ)
        for (const property in occ) {
          chartData.push({
            "date": property,
            "value": occ[property]
          })
        }
        this.eventsLineGraphChart(chartData)
      })
  }

  
  eventsLineGraphChart(chartData) {
    let chart = am4core.create("eventsLineGraphChart", am4charts.XYChart);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "date";
    categoryAxis.title.text = "value";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Nombre des personnes";

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "date";
    series.name = "";
    series.columns.template.tooltipText = "Series: {name}\nCountries: {categoryX}\nNombres: {valueY}";
    series.columns.template.fill = am4core.color("#46d0d5");
    chart.exporting.menu = new am4core.ExportMenu();
    chart.data = chartData
  }

}
