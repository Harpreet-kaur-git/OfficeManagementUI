import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
})
export class ReportsComponent {
  aiPrompt: string = '';
  isGenerating: boolean = false;
  reportGenerated: boolean = false;

  // Mock results for a "Workforce Efficiency" report
  reportMetrics = [
    { label: 'Avg. Productivity', value: '92%', trend: '+3.5%', up: true },
    { label: 'Resource Utilization', value: '88.4h', trend: '-1.2%', up: false },
    { label: 'Active Projects', value: '42', trend: '+12', up: true },
    { label: 'Overtime Cost', value: '$12,400', trend: '-$2.1k', up: false }
  ];

  reportData = [
    { dept: 'Engineering', lead: 'Sarah Chen', status: 'Optimal', health: 94, budget: '$450k' },
    { dept: 'Marketing', lead: 'Tom Wilson', status: 'Stable', health: 82, budget: '$120k' },
    { dept: 'Sales', lead: 'Elena Rodriguez', status: 'Critical', health: 65, budget: '$200k' },
    { dept: 'Human Resources', lead: 'Marcus J.', status: 'Optimal', health: 89, budget: '$85k' },
    { dept: 'Product', lead: 'David Smith', status: 'Stable', health: 81, budget: '$310k' },
  ];

  generateReport() {
    if (!this.aiPrompt.trim()) return;
    
    this.isGenerating = true;
    this.reportGenerated = false;

    // Simulate AI data fetching from DB
    setTimeout(() => {
      this.isGenerating = false;
      this.reportGenerated = true;
    }, 2000);
  }

  exportReport(format: string) {
    console.log(`Exporting report as ${format}...`);
  }

  clear() {
    this.reportGenerated = false;
    this.aiPrompt = '';
  }
}