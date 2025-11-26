import { Component, Input, OnInit } from '@angular/core';
interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
@Input() title: string = 'Services';
  @Input() subtitle: string = '';
  @Input() breadcrumbs: { label: string; link?: string }[] = [];

  bubbles: Bubble[] = [];
  ripples = [0, 1, 2];

  ngOnInit(): void {
    this.generateBubbles();
  }

  generateBubbles(): void {
    this.bubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 15,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4
    }));
  }
  services = [
   {
  name: 'Domestic Water Purifiers',
  icon: 'fas fa-home',
  description: 'Advanced water purification systems for homes ensuring safe and clean drinking water for your family',
  features: ['Multi-Stage Filtration', 'UV Protection', 'Mineral Retention', 'Energy Efficient']
},
{
  name: 'Commercial RO Systems',
  icon: 'fas fa-building',
  description: 'High-capacity reverse osmosis systems designed for offices, restaurants, and commercial establishments',
  features: ['Large Scale Purification', 'Auto-Flush Technology', 'Remote Monitoring', 'Low Maintenance']
},
{
  name: 'Industrial RO Systems',
  icon: 'fas fa-industry',
  description: 'Heavy-duty water treatment solutions for manufacturing units, factories, and industrial applications',
  features: ['High Flow Rate', 'Customizable Capacity', 'Industrial Grade Filters', 'Process Automation']
},
{
  name: 'RO Service and Repairing',
  icon: 'fas fa-tools',
  description: 'Professional maintenance and repair services for all types of RO water purification systems',
  features: ['Filter Replacement', 'Membrane Cleaning', 'Leak Repairs', 'Performance Optimization']
},
{
  name: 'Solar Water Heater Systems',
  icon: 'fas fa-solar-panel',
  description: 'Eco-friendly solar water heating solutions for residential and commercial properties',
  features: ['Energy Savings', 'Eco-Friendly', 'All Weather Performance', 'Long Lifespan']
},
{
  name: 'Waste Water Systems',
  icon: 'fas fa-recycle',
  description: 'Comprehensive wastewater treatment and recycling systems for sustainable water management',
  features: ['Water Recycling', 'Effluent Treatment', 'Sewage Treatment', 'Environmental Compliance']
},
{
  name: 'Swimming Pool Design Contracting & Maintenance',
  icon: 'fas fa-swimming-pool',
  description: 'Complete swimming pool solutions from design and construction to regular maintenance services',
  features: ['Custom Pool Design', 'Construction Management', 'Water Chemistry Balance', 'Regular Cleaning']
},
{
  name: 'Selling Parts of RO Systems',
  icon: 'fas fa-box-open',
  description: 'Genuine spare parts and components for all major brands of RO water purification systems',
  features: ['Original Parts', 'Filter Cartridges', 'Membranes & Pumps', 'Quick Delivery']
}
  ];

}
