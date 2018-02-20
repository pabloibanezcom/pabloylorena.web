import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { YesNoDoubtful } from '../../../models/overviewResult';

import * as compareByOptions from './compareBy.options.json';

@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.less']
})
export class OverviewPanelComponent implements OnInit {

  @ViewChild("baseChart") chart: any;

  @Input() title: string;
  @Input() data: YesNoDoubtful;
  selectedState: any;
  compareByOptions: any;
  selectedCompareByOption: any;
  total: number;
  chartData: any;

  constructor() {
    this.compareByOptions = compareByOptions;
  }

  ngOnInit() {
    this.selectedCompareByOption = compareByOptions[0];
    this.changeState('yes');
  }

  onChange(value: any) {
    this.generateChartData(value);
  }

  changeState(state: string) {
    this.selectedState = {
      name: state,
      data: this.data[state]
    };
    this.generateChartData();
  }

  private generateChartData(compareByOption?: any): any {
    this.selectedCompareByOption = compareByOption ? compareByOption : this.selectedCompareByOption;
    this.chartData = this.selectedCompareByOption.labelsGroup ? this.generateChartDataFromlabelsGroup(this.selectedCompareByOption) :
      {
        type: this.selectedCompareByOption.type,
        labels: this.selectedCompareByOption.labels,
        data: this.getDataFromCompareByOptions(this.selectedCompareByOption.data),
        colors: [{ backgroundColor: this.selectedCompareByOption.colors }],
        options: {
          legend: {
            display: false
          }
        }
      };
    if (this.chart.chart !== undefined) {
      this.chart.chart.destroy();
      this.chart.chartType = this.chartData.type;
      this.chart.labels = this.chartData.labels;
      this.chart.data = this.chartData.data;
      this.chart.colors = this.chartData.colors;
      this.chart.options = this.chartData.options;
      this.chart.ngOnInit();
    }
  }

  private getDataFromCompareByOptions(dataProperties): number[] {
    const result = [];
    this.total = 0;
    dataProperties.forEach(dp => {
      result.push(this.selectedState.data[dp]);
      this.total += this.selectedState.data[dp];
    });
    return result;
  }

  private generateChartDataFromlabelsGroup(compareByOption: any): any {
    let elements = [];
    this.total = 0;
    for (const prop in this.selectedState.data[compareByOption.labelsGroup]) {
      elements.push({label: prop, data: this.selectedState.data[compareByOption.labelsGroup][prop], color: this.generateRandomColor()});
      this.total += this.selectedState.data[compareByOption.labelsGroup][prop];
    }
    elements = elements.sort((a, b) => b.data - a.data);
    return {
      type: compareByOption.type,
      labels: elements.map(e => e.label),
      data: elements.map(e => e.data),
      colors: [{ backgroundColor: elements.map(e => e.color) }],
      options: compareByOption.options
    };
  }

  private generateRandomColor(): string {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

}
