import { Component } from '@angular/core';
interface Product {
  id: number;
  name: string;
  image: string;
  capacity: string;
  filterTime: string;
  description: string;
  price?: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
products: Product[] = [
    {
      id: 1,
      name: 'Reverse Osmosis System',
      image: 'assets/images/products/product-1.jpg',
      capacity: '50 GPD',
      filterTime: '6-12 months',
      description: 'Advanced 5-stage purification system for clean drinking water',
      price: 'LKR 45,000'
    },
    {
      id: 2,
      name: 'UV Water Purifier',
      image: 'assets/images/products/product-2.jpg',
      capacity: '8L/min',
      filterTime: '12 months',
      description: 'Ultraviolet disinfection system that kills bacteria and viruses',
      price: 'LKR 35,000'
    },
    {
      id: 3,
      name: 'Water Softener',
      image: 'assets/images/products/product-3.jpg',
      capacity: '2000L/day',
      filterTime: '3-5 years',
      description: 'Remove hardness and protect your appliances',
      price: 'LKR 75,000'
    },
    {
      id: 4,
      name: 'Under Sink Filter',
      image: 'assets/images/products/product-4.jpg',
      capacity: '1500L',
      filterTime: '6 months',
      description: 'Compact filtration system that fits under your kitchen sink',
      price: 'LKR 25,000'
    },
    {
      id: 4,
      name: 'Under Sink Filter',
      image: 'assets/images/products/product-5.jpg',
      capacity: '1500L',
      filterTime: '6 months',
      description: 'Compact filtration system that fits under your kitchen sink',
      price: 'LKR 25,000'
    },
    {
      id: 4,
      name: 'Under Sink Filter',
      image: 'assets/images/products/product-6.jpg',
      capacity: '1500L',
      filterTime: '6 months',
      description: 'Compact filtration system that fits under your kitchen sink',
      price: 'LKR 25,000'
    }
  ];

  sendToWhatsApp(product: Product): void {
    const phoneNumber = '94771234567'; // Replace with your WhatsApp business number
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
