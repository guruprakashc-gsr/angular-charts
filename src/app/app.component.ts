import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  chartData: any[] = [];
  entityData = [
    {
      entityId: 1,
      entityName: "Microsoft",
      buyerdata: [
        {
          buyername: "Standad Charter",
          totalLimit: 20,
          availablelimit: 10,
          utilisedlimit: 8
        },
        {
          buyername: "DBS",
          totalLimit: 20,
          availablelimit: 15,
          utilisedlimit: 9
        },
        {
          buyername: "BNP paribas",
          totalLimit: 20,
          availablelimit: 19,
          utilisedlimit: 7
        }
      ]
    },
    {
      entityId: 2,
      entityName: "IBM",
      buyerdata: [
        {
          buyername: "Standad Charter",
          totalLimit: 20,
          availablelimit: 19,
          utilisedlimit: 18
        },
        {
          buyername: "DBS",
          totalLimit: 20,
          availablelimit: 18,
          utilisedlimit: 16
        }
      ]
    }
  ];

  chooseEntity(add, value, entity) {
    if (add) {
      console.log(value, entity);
      let tempchartData = {
        utilisedlimitData: [],
        availablelimit: [],
        buyernames: []
      };
      tempchartData["utilisedlimitData"] = [];
      let selectedentitydata = this.entityData.find(
        entity => entity.entityId === value
      );
      console.log(selectedentitydata, "selectedentitydata");
      tempchartData["enity"] = selectedentitydata;
      selectedentitydata.buyerdata.forEach(buyer => {
        tempchartData["utilisedlimitData"].push(buyer.utilisedlimit);
        tempchartData["availablelimit"].push(buyer.availablelimit);
        tempchartData["buyernames"].push(buyer.buyername);
      });
      this.chartData.push(tempchartData);
      console.log(
        tempchartData,
        " this.chartData this.chartData this.chartData this.chartData",
        this.chartData
      );
    } else {
      const index = this.chartData.findIndex(d => d.enity.entityId === value);
      if (index >= 0) {
        const newData = [...this.chartData];
        newData.splice(index, 1);
        this.chartData = newData;
      }
    }
  }
}
