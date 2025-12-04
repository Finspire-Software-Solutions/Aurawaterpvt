import { Component } from '@angular/core';
interface Review {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  review: string;
}
@Component({
  selector: 'app-client-review',
  templateUrl: './client-review.component.html',
  styleUrls: ['./client-review.component.scss']
})
export class ClientReviewComponent {
reviews: Review[] = [
    {
  id: 1,
  name: 'Sanjay Kumar',
  location: 'Kilinochchi',
  image: 'assets/images/reviews/client-1.png',
  rating: 5,
  review: 'Aura Water Management installed an RO system in our home, and the improvement in water quality was immediate. Their team was efficient, knowledgeable, and very courteous throughout the process.'
},
{
  id: 2,
  name: 'Lakshmi Devi',
  location: 'Mullaitivu',
  image: 'assets/images/reviews/client-4.png',
  rating: 5,
  review: 'எங்கள் அலுவலகத்தில் குடிநீர் அமைப்பை மேம்படுத்த நாங்கள் ஆராவைத் தேர்ந்தெடுத்தோம். அவர்களின் குழு திறமையாக வேலை செய்தது.'
},
{
  id: 3,
  name: 'Priya Selvam',
  location: 'Jaffna',
  image: 'assets/images/reviews/client-2.png',
  rating: 5,
  review: 'Aura provided a reliable commercial purification system for our restaurant. The system works flawlessly, and their technical support has been outstanding from day one.'
},
{
  id: 4,
  name: 'Mohamed Rizwan',
  location: 'Vavuniya',
  image: 'assets/images/reviews/client-3.png',
  rating: 5,
  review: 'Their water testing service helped us understand our exact requirements before installation. The entire process was smooth, and the final setup exceeded our expectations.'
},
{
  id: 5,
  name: 'Deshan Pathirana',
  location: 'Vavuniya',
  image: 'assets/images/reviews/client-4.png',
  rating: 5,
  review: 'We installed a purifier system for our office, and the results have been excellent. The team was friendly, skilled, and completed the job with zero disruptions to our workday.'
},
{
  id: 6,
  name: 'Ashoka Ranaweera',
  location: 'Mullaitivu',
  image: 'assets/images/reviews/client-4.png',
  rating: 5,
  review: 'Aura’s technicians were very professional and explained every step clearly. Their product quality is impressive, and the ongoing maintenance service has been extremely reliable.'
},
{
  id: 7,
  name: 'Mohammed Kahan',
  location: 'Trincomalee',
  image: 'assets/images/reviews/client-4.png',
  rating: 5,
  review: 'எங்கள் வீட்டில் நிறுவப்பட்ட சுத்திகரிப்பு அமைப்பில் நான் மிகவும் திருப்தி அடைகிறேன். தண்ணீர் சுவை நன்றாக இருக்கிறது.'
}

  ];

  currentIndex = 0;
  autoSlideInterval: any;
  visibleCards = 3;

  ngOnInit(): void {
    this.updateVisibleCards();
    this.startAutoSlide();
    window.addEventListener('resize', this.updateVisibleCards.bind(this));
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    window.removeEventListener('resize', this.updateVisibleCards.bind(this));
  }

  updateVisibleCards(): void {
    if (window.innerWidth < 768) {
      this.visibleCards = 1;
    } else if (window.innerWidth < 1024) {
      this.visibleCards = 2;
    } else {
      this.visibleCards = 3;
    }
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide(): void {
    const maxIndex = this.reviews.length - this.visibleCards;
    this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
  }

  prevSlide(): void {
    const maxIndex = this.reviews.length - this.visibleCards;
    this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  getTransform(): string {
    const cardWidth = 100 / this.visibleCards;
    return `translateX(-${this.currentIndex * cardWidth}%)`;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  getDots(): number[] {
    return Array(this.reviews.length - this.visibleCards + 1).fill(0);
  }
}
