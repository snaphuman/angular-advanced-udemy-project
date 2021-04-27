import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoughnutData } from 'src/app/models/doughnut-data.model';

import { DoughnutComponent } from './doughnut.component';

@Component({
  template: `
    <app-doughnut [dougnutData]="chart"></app-doughnut>
    `
})
class TestHostComponent {
  chart: DoughnutData = {
    title: 'Sales',
    labels: ['download sales', 'in-store sales', 'mail-order sales'],
    chartData: [[350, 450, 100]] };
}

describe('DoughnutComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutComponent, TestHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
});
