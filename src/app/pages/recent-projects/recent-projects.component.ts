import { Component } from '@angular/core';
interface Project {
  id: number;
  title: string;
  category: string;
  categorySlug: string;
  location: string;
  image: string;
  description: string;
  features: string[];
  slug: string;
}
@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent {
projects: Project[] = [
    {
      id: 1,
      title: 'Aqua Supreme Installation',
      category: 'Residential',
      categorySlug: 'residential',
      location: 'Jaffna',
      image: 'https://res.cloudinary.com/dszgwsh5a/image/upload/v1766466735/Aura_Water_Management-recentProject1_x4hhtb.png',
      description: 'Installed a high-capacity RO plant serving 500+ beds with 99.9% pure water output.',
      features: ['18 litres', '10 LPH Filter Time', '100 GPD Pump', '75 GPD Membrane', '6 Filters'],
      slug: 'aqua-supreme-installation'
    },
    {
      id: 2,
      title: 'Residential Water Purification',
      category: 'Residential',
      categorySlug: 'residential',
      location: 'Jaffna',
      image: 'https://res.cloudinary.com/dszgwsh5a/image/upload/v1766466735/Aura_Water_Management-recentProject2_qxuvkw.png',
      description: 'Installed a high-capacity RO plant serving 500+ beds with 99.9% pure water output.',
      features: ['18 litres', '10 LPH Filter Time', '100 GPD Pump', '75 GPD Membrane', '6 Filters'],
      slug: 'jaffna-hospital-ro-plant'
    },
    {
      id: 3,
      title: 'Residential Water Purification',
      category: 'Residential',
      categorySlug: 'residential',
      location: 'Jaffna',
      image: 'https://res.cloudinary.com/dszgwsh5a/image/upload/v1766466736/Aura_Water_Management-recentProject3_amuj1m.png',
      description: 'Large-scale water treatment plant for industrial processing and waste water management.',
      features: ['28L', '25 LPH Filter Time'],
      slug: 'vavuniya-textile-treatment'
    }
  ];

  categories: string[] = ['All', 'Commercial', 'Residential', 'Industrial', 'Institutional'];
  activeCategory: string = 'All';
  filteredProjects: Project[] = [];

  ngOnInit(): void {
    this.filteredProjects = this.projects;
  }

  filterProjects(category: string): void {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === category);
    }
  }
}
