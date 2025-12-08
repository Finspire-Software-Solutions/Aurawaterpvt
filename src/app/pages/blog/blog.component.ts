import { Component, Input, OnInit } from '@angular/core';
import { BlogService, } from '../../services/blog.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
}
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  createdDate: string;
  tags: string[];
  category: string;
  instagramLink?: string;
  facebookLink?: string;
  linkedinLink?: string;
  githubLink?: string;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
 @Input() title: string = 'Blogs';
  @Input() subtitle: string = '';
  @Input() breadcrumbs: { label: string; link?: string }[] = [];

  bubbles: Bubble[] = [];
  ripples = [0, 1, 2];

  posts: BlogPost[] = [];
  selectedTag: string = 'All';
  page = 0;
  size = 10;
  totalPages = 0;
  totalElements = 0;

  // Modal state
  showPostModal = false;
  activePost: BlogPost | null = null;

  constructor(private blogService: BlogService, private toast: ToastService,private route: ActivatedRoute, private router: Router) {
    // this.load();
  }

  ngOnInit(): void {
    // this.load();
    this.generateBubbles();
    this.loadBlogs();
    
    // Check if coming from homepage with a specific blog slug
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.setFeaturedBySlug(slug);
      }
    });

    // Also check query params as alternative
    this.route.queryParamMap.subscribe(params => {
      const blogId = params.get('featured');
      if (blogId) {
        this.setFeaturedById(+blogId);
      }
    });
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

  featuredBlog: BlogPost | null = null;
  otherBlogs: BlogPost[] = [];
  
  tags: string[] = ['All'];
  pageSize = 6;

  loadBlogs(): void {
    // Replace with your actual service call
    // this.blogService.getBlogs().subscribe(blogs => {
    //   this.blogs = blogs;
    //   this.extractTags();
    //   this.updateDisplayedBlogs();
    // });
    
    // For now, after loading:
    this.extractTags();
    this.updateDisplayedBlogs();
  }

  extractTags(): void {
    const allTags = new Set<string>();
    this.blogs.forEach(blog => {
      blog.tags.forEach(tag => allTags.add(tag));
    });
    this.tags = ['All', ...Array.from(allTags)];
  }

  setFeaturedBySlug(slug: string): void {
    const blog = this.blogs.find(b => b.slug === slug);
    if (blog) {
      this.featuredBlog = blog;
      this.updateDisplayedBlogs();
    }
  }

  setFeaturedById(id: number): void {
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      this.featuredBlog = blog;
      this.updateDisplayedBlogs();
    }
  }

  selectFeatured(blog: BlogPost): void {
    this.featuredBlog = blog;
    this.updateDisplayedBlogs();
    
    // Update URL without full navigation
    this.router.navigate(['/blog', blog.slug], { 
      replaceUrl: true,
      queryParamsHandling: 'preserve'
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFeatured(): void {
    this.featuredBlog = null;
    this.updateDisplayedBlogs();
    this.router.navigate(['/blog'], { replaceUrl: true });
  }

  updateDisplayedBlogs(): void {
    let filtered = this.blogs;
    
    // Apply tag filter
    if (this.selectedTag !== 'All') {
      filtered = filtered.filter(b => b.tags.includes(this.selectedTag));
    }
    
    // Separate featured from others
    if (this.featuredBlog) {
      this.otherBlogs = filtered.filter(b => b.id !== this.featuredBlog!.id);
    } else {
      this.otherBlogs = filtered;
    }
    
    // Pagination
    this.totalElements = this.otherBlogs.length;
    this.totalPages = Math.ceil(this.totalElements / this.pageSize);
    
    const start = this.page * this.pageSize;
    this.otherBlogs = this.otherBlogs.slice(start, start + this.pageSize);
  }

  onTagChange(): void {
    this.page = 0;
    // Check if featured blog still matches filter
    if (this.featuredBlog && this.selectedTag !== 'All') {
      if (!this.featuredBlog.tags.includes(this.selectedTag)) {
        this.featuredBlog = null;
      }
    }
    this.updateDisplayedBlogs();
  }

  // Pagination methods
  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.updateDisplayedBlogs();
    }
  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.updateDisplayedBlogs();
    }
  }

  goToPage(p: number): void {
    this.page = p;
    this.updateDisplayedBlogs();
  }

  isLong(blog: BlogPost, length: number): boolean {
    return blog.content.length > length;
  }

  blogs:BlogPost[] = [
    {
      "id": 1,
      "slug": "whole-house-water-filtration",
      "title": "Understanding Reverse Osmosis: The Gold Standard in Water Purification",
      "excerpt": "Discover how reverse osmosis technology removes up to 99% of contaminants from your drinking water.",
      "content": "Reverse osmosis (RO) has become one of the most effective and widely used water purification technologies in both residential and commercial settings. This sophisticated filtration process works by pushing water through a semi-permeable membrane that blocks contaminants while allowing pure water molecules to pass through.\n\nHow Does Reverse Osmosis Work?\n\nThe process begins when water pressure forces tap water through a series of filters. The first stage typically involves a sediment filter that removes larger particles like dirt, sand, and rust. Next, water passes through an activated carbon filter that eliminates chlorine and organic compounds that could damage the RO membrane.\n\nThe heart of the system is the RO membrane itself, which has microscopic pores measuring just 0.0001 microns. To put this in perspective, a human hair is about 75 microns wide. This incredibly fine filtration removes up to 99% of dissolved salts, bacteria, viruses, and other contaminants.\n\nBenefits of RO Systems:\n\n1. Superior Contaminant Removal: RO systems effectively remove lead, arsenic, fluoride, nitrates, and hundreds of other harmful substances.\n\n2. Improved Taste: By removing chlorine and dissolved minerals, RO water often tastes cleaner and fresher than tap water.\n\n3. Cost-Effective: While the initial investment may seem significant, RO systems provide purified water at a fraction of the cost of bottled water.\n\n4. Environmental Impact: Using an RO system reduces plastic bottle waste significantly.\n\nAt Yali Water Solutions, we offer state-of-the-art RO systems designed for Sri Lankan water conditions. Our expert technicians can assess your water quality and recommend the perfect solution for your home or business.",
      "coverImage": "assets/images/blog/blog-11.webp",
      "author": "Dr. Kumara Perera",
      "createdDate": "2025-01-15T10:30:00Z",
      "tags": ["reverse-osmosis", "water-purification", "technology", "health"],
      "category": "Technology",
      "instagramLink": "https://instagram.com/yaliwater",
      "facebookLink": "https://facebook.com/yaliwater",
      "linkedinLink": "https://linkedin.com/company/yaliwater"
    },
    {
      "id": 2,
      "slug": "water-filter-replacement-signs",
      "title": "Water Quality Challenges in Sri Lanka: A 2025 Perspective",
      "excerpt": "An in-depth look at the current state of water quality across different regions of Sri Lanka.",
      "content": "Sri Lanka, despite being blessed with abundant water resources, faces significant challenges in ensuring clean drinking water reaches all its citizens. As we navigate through 2025, understanding these challenges is crucial for making informed decisions about water purification.\n\nRegional Water Quality Variations:\n\nThe water quality in Sri Lanka varies dramatically by region. In the North Central Province, high fluoride levels in groundwater have been linked to Chronic Kidney Disease of Unknown Etiology (CKDu), affecting thousands of farming communities. The Dry Zone faces additional challenges with hard water that contains elevated levels of calcium and magnesium.\n\nUrban areas like Colombo and Kandy deal with different issues. While municipal water treatment exists, aging infrastructure can lead to contamination through corroded pipes. Chlorine levels, while necessary for disinfection, can affect taste and potentially form harmful byproducts.\n\nKey Contaminants of Concern:\n\n- Fluoride: Especially problematic in dry zone areas\n- Arsenic: Found in certain groundwater sources\n- Nitrates: Common in agricultural regions\n- Bacterial contamination: Risk in areas with inadequate treatment\n- Heavy metals: Industrial pollution affects some water sources\n\nSolutions for Sri Lankan Households:\n\nGiven these diverse challenges, a one-size-fits-all approach doesn't work. At Yali Water Solutions, we recommend water testing as the first step. Our team provides comprehensive water analysis to identify specific contaminants in your water supply, allowing us to recommend the most effective purification system for your needs.\n\nWhether you need a simple UV purifier for bacterial concerns or a comprehensive RO system for multi-contaminant removal, understanding your local water quality is the key to choosing the right solution.",
      "coverImage": "assets/images/blog/blog-10.webp",
      "author": "Samantha Fernando",
      "createdDate": "2025-01-10T14:00:00Z",
      "tags": ["sri-lanka", "water-quality", "health", "environment"],
      "category": "Research",
      "facebookLink": "https://facebook.com/yaliwater",
      "linkedinLink": "https://linkedin.com/company/yaliwater"
    },
    {
      "id": 3,
      "slug": "maintaining-your-water-purifier",
      "title": "Essential Maintenance Tips for Your Water Purifier",
      "excerpt": "Learn how to keep your water purification system running efficiently with these simple maintenance practices.",
      "content": "Investing in a water purifier is just the first step toward ensuring clean drinking water for your family. Regular maintenance is essential to keep your system functioning at peak efficiency and to protect your investment for years to come.\n\nFilter Replacement Schedule:\n\nDifferent filters in your purification system have varying lifespans:\n\nSediment Filter: Replace every 6-12 months depending on water quality. If your water has high sediment content, you may need more frequent changes.\n\nCarbon Filter: Typically lasts 6-12 months. This filter removes chlorine and organic compounds, and an exhausted carbon filter can allow these contaminants to pass through.\n\nRO Membrane: The most critical component, lasting 2-3 years with proper care. However, pre-filter maintenance directly affects membrane life.\n\nUV Lamp: Replace annually, even if it's still lighting up. UV effectiveness decreases over time even when the lamp appears functional.\n\nSigns Your System Needs Attention:\n\n1. Decreased water flow or pressure\n2. Strange taste or odor in purified water\n3. Unusual sounds from the system\n4. Water leakage around connections\n5. TDS levels higher than expected\n\nDIY Maintenance Tips:\n\n- Wipe down the exterior weekly to prevent dust buildup\n- Check for leaks monthly\n- Monitor your TDS meter readings\n- Keep the area around your purifier clean and dry\n- Don't place the unit in direct sunlight\n\nProfessional Servicing:\n\nWhile basic maintenance can be done at home, we recommend professional servicing every 6 months. Our Yali Water Solutions technicians will sanitize the system, check all connections, test water quality, and ensure everything is functioning optimally.\n\nRemember, a well-maintained water purifier not only provides better water quality but also saves money in the long run by preventing costly repairs and extending system life.",
      "coverImage": "assets/images/blog/blog-12.webp",
      "author": "Ruwan Silva",
      "createdDate": "2025-01-05T09:15:00Z",
      "tags": ["maintenance", "tips", "water-purifier", "diy"],
      "category": "Guides",
      "instagramLink": "https://instagram.com/yaliwater",
      "facebookLink": "https://facebook.com/yaliwater"
    }
  ]

}


