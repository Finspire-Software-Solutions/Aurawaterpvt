import { Component, Input, OnInit } from '@angular/core';
interface Product {
  id: number;
  name: string;
  image: string;
  capacity?: string;
  filterTime: string;
  pump?: string;
  price?: string;
  membrane?: string;
  filtration?:string;
  category?: string; // Add category for filtering
}
interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() limitProducts: number = 0; // 0 means show all, any number limits display
  @Input() showFilters: boolean = true; // Show/hide filters
  @Input() showViewAll: boolean = false; // Show "View All" button on home
  @Input() title: string = 'Our Products';
  @Input() subtitle: string = '';
  @Input() breadcrumbs: { label: string; link?: string }[] = [];

  bubbles: Bubble[] = [];
  ripples = [0, 1, 2];

allProducts: Product[] = [
    {
      id: 17,
      name: 'Opel nexus',
      image: 'assets/images/products/product-16.jpg',
      capacity: '18 litres',
      filterTime: '10 LPH',
      pump: '100 GPD',
       membrane: '75 GPD',
      category: 'Filters',
      filtration:'6'
    },   {
      id: 18,
      name: '25 LPH',
      image: 'assets/images/products/product-20.jpg',
      capacity: '28L',
      filterTime: '25 LPH'
    },   {
      id: 19,
      name: 'Hot and cold',
      image: 'assets/images/products/product-18.jpg',
      capacity: '8 litres',
      filterTime: '10 LPH',
      pump: '100 GCD',
       membrane: '75 GCD',
      category: 'Filters',
      filtration:'6'
    },   {
      id: 20,
      name: 'Aqua supreme',
      image: 'assets/images/products/product-19.jpg',
      capacity: '18 litres',
      filterTime: '10 LPH',
      pump: '100 GPD',
       membrane: '75 GPD',
      category: 'Filters',
      filtration:'6'
    },
    {
      id: 1,
      name: 'Aqua prime x',
      image: 'assets/images/products/product-1.jpg',
      capacity: '12 litres',
      filterTime: '10 LPH',
      pump: '100 GPD Booster Pump',
      membrane: '75GPD RO',
      category: 'RO Systems',
      filtration:'5 stage'
    },
    {
      id: 2,
      name: 'Aqua grand plus',
      image: 'assets/images/products/product-22.png',
      capacity: '18 litres',
      filterTime: '10 LPH',
      pump: '100 GCD',
      membrane: '75 GCD',
      category: 'UV Systems',
      filtration:'6'
    },
    {
      id: 3,
      name: 'Cruze Standard',
      image: 'assets/images/products/product-3.jpg',
      capacity: '10 Litres',
      filterTime: '10 LPH',
      pump: '100 GPD',
       membrane: '75 GPD',
      category: 'Softeners',
      filtration:'6'
    },
    {
      id: 4,
      name: 'Cruze',
      image: 'assets/images/products/product-4.jpg',
      capacity: '10 Litres',
      filterTime: '10 LPH',
      pump: '100 GPD',
       membrane: '75 GPD',
      category: 'Filters',
      filtration:'7'
    },
    {
      id: 9,
      name: '125 LPH',
      image: 'assets/images/products/product-9.jpg',
      capacity: '500L',
      filterTime: '125 LPH',
      },   {
      id: 10,
      name: '50 LPH',
      image: 'assets/images/products/product-10.jpg',
      capacity: '28L',
      filterTime: '50 LPH',
      
    },   {
      id: 11,
      name: '1000 LPH Ro System',
      image: 'assets/images/products/product-11.jpg',
      capacity: '1000L',
      filterTime: '1000 LPH',
      
    },   {
      id: 12,
      name: '500 LPH',
      image: 'assets/images/products/product-12.jpg',
      capacity: '1000L',
      filterTime: '500 LPH'
    },   {
      id: 13,
      name: '250 LPH',
      image: 'assets/images/products/product-13.jpg',
      capacity: '1000L',
      filterTime: '250 LPH'
    },   {
      id: 15,
      name: 'Softener System',
      image: 'assets/images/products/product-14.jpg',
      filterTime: '2500 LPD'
    },   {
      id: 16,
      name: 'Iron removal filter system',
      image: 'assets/images/products/product-15.jpg',
      filterTime: '2500 LPD'
    }
  ];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  
  // Filter options
  selectedCategory: string = 'all';
  selectedPriceRange: string = 'all';
  searchTerm: string = '';
  
  categories: string[] = [];
  priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under 30,000', value: '0-30000' },
    { label: '30,000 - 50,000', value: '30000-50000' },
    { label: '50,000 - 80,000', value: '50000-80000' },
    { label: 'Above 80,000', value: '80000-999999' }
  ];
  ngOnInit() {
    // Extract unique categories
    this.categories = ['all', ...new Set(this.allProducts.map(p => p.category || ''))];
    
    // Apply limit if specified
    if (this.limitProducts > 0) {
      this.products = this.allProducts.slice(0, this.limitProducts);
    } else {
      this.products = [...this.allProducts];
    }
    
    this.filteredProducts = [...this.products];
  }
    applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      // Category filter
      const categoryMatch = this.selectedCategory === 'all' || 
                           product.category === this.selectedCategory;
      
      // Price filter
      let priceMatch = true;
      if (this.selectedPriceRange !== 'all') {
        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        const productPrice = this.extractPrice(product.price);
        priceMatch = productPrice >= min && productPrice <= max;
      }
      
      // Search filter
      const searchMatch = this.searchTerm === '' || 
                         product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return categoryMatch && priceMatch && searchMatch;
    });
  }

  extractPrice(priceString?: string): number {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/[^0-9]/g, ''));
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onPriceRangeChange(range: string) {
    this.selectedPriceRange = range;
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.selectedCategory = 'all';
    this.selectedPriceRange = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }
  sendToWhatsApp(product: Product): void {
    const phoneNumber = '94707060028'; // Replace with your WhatsApp business number
    const message = `Hello! I'm interested in the following product:

*${product.name}*
- Capacity: ${product.capacity}
- Filter Time: ${product.filterTime}
${product.pump ? `- pump: ${product.pump}` : ''}
${product.membrane ? `- membrane: ${product.membrane}` : ''}
${product.filtration ? `- filtration: ${product.filtration}` : ''}

${product.category}

Could you please provide more information?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
