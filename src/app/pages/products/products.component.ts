import { Component, Input, OnInit } from '@angular/core';
interface Product {
  id: number;
  name: string;
  image: string;
  capacity: string;
  filterTime: string;
  description: string;
  price?: string;
  category?: string; // Add category for filtering
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

allProducts: Product[] = [
    {
      id: 1,
      name: 'Reverse Osmosis System',
      image: 'assets/images/products/product-1.jpg',
      capacity: '50 GPD',
      filterTime: '6-12 months',
      description: 'Advanced 5-stage purification system for clean drinking water',
      price: 'LKR 45,000',
      category: 'RO Systems'
    },
    {
      id: 2,
      name: 'UV Water Purifier',
      image: 'assets/images/products/product-2.jpg',
      capacity: '8L/min',
      filterTime: '12 months',
      description: 'Ultraviolet disinfection system that kills bacteria and viruses',
      price: 'LKR 35,000',
      category: 'UV Systems'
    },
    {
      id: 3,
      name: 'Water Softener',
      image: 'assets/images/products/product-3.jpg',
      capacity: '2000L/day',
      filterTime: '3-5 years',
      description: 'Remove hardness and protect your appliances',
      price: 'LKR 75,000',
      category: 'Softeners'
    },
    {
      id: 4,
      name: 'Under Sink Filter',
      image: 'assets/images/products/product-4.jpg',
      capacity: '1500L',
      filterTime: '6 months',
      description: 'Compact filtration system that fits under your kitchen sink',
      price: 'LKR 25,000',
      category: 'Filters'
    },
    {
      id: 5,
      name: 'Countertop Purifier',
      image: 'assets/images/products/product-5.jpg',
      capacity: '1500L',
      filterTime: '6 months',
      description: 'Portable water purification for any countertop',
      price: 'LKR 28,000',
      category: 'Filters'
    },
    {
      id: 6,
      name: 'Whole House Filter',
      image: 'assets/images/products/product-6.jpg',
      capacity: '5000L/day',
      filterTime: '12 months',
      description: 'Complete home water filtration solution',
      price: 'LKR 95,000',
      category: 'Filters'
    },
    // Add more products here
    {
      id: 7,
      name: 'Commercial RO System',
      image: 'assets/images/products/product-7.jpg',
      capacity: '200 GPD',
      filterTime: '12 months',
      description: 'High-capacity system for commercial use',
      price: 'LKR 150,000',
      category: 'RO Systems'
    },
    {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-8.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-9.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-10.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-11.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-12.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-13.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-14.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
    },   {
      id: 8,
      name: 'Alkaline Water Filter',
      image: 'assets/images/products/product-15.jpg',
      capacity: '2000L',
      filterTime: '6 months',
      description: 'Adds beneficial minerals and increases pH',
      price: 'LKR 32,000',
      category: 'Filters'
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
                         product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
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
${product.price ? `- Price: ${product.price}` : ''}

${product.description}

Could you please provide more information?`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
