import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  images: string[] = [
    'assets/career.jpg',
    'assets/Jobs.jpg',
    'assets/Register.jpg'
  ];
  currentImage: string | undefined;





  //Testimonilas
  testimonials = [
    { 
      profilePhoto: 'assets/Profile pht.jpg',
      name: 'Naresh',
      content: 'I sincerely thank this portal for helping me find a job at Toshiba (TSIP),one of the largest' 
    },
    { 
      profilePhoto: 'assets/Anjali.png',
      name: 'Anjali',
      content: 'Another testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/rizwana.png',
      name: 'Rizwana',
      content: 'One more testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/chandra.png',
      name: 'Chandra',
      content: 'Testimonial content for job portal.' 
    },
    { 
      profilePhoto: 'assets/prakyath.png',
      name: 'Prakhyath',
      content: 'Another testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/soumya.png',
      name: 'Soumya',
      content: 'One more testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/Madhu.png',
      name: 'Madhu',
      content: 'Testimonial content for job portal.' 
    },
    { 
      profilePhoto: 'assets/srimathi.png',
      name: 'srimathi',
      content: 'Another testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/mounika.png',
      name: 'Mounika',
      content: 'One more testimonial for the job portal.' 
    },
    { 
      profilePhoto: 'assets/priyanka.png',
      name: 'Priyanka',
      content: 'Another testimonial for the job portal.' 
    },
   
    { 
      profilePhoto: 'assets/sandhya.pic.png',
      name: 'sandhya',
      content: 'Another testimonial for the job portal.' 
    }
  ];
  //Testimonials end....
  currentSlideIndex = 0;
  jobsList: any[] = [];
  itemsPerPage: number = 4; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  
  displayedJobsList: any[] = [];
  username:string='';
  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient, private userStore:UserStoreService, private auth:AuthService) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  }
  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // this.generatePageNumbers(); 
    }
  }
 
  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  istrue = false
  ngOnInit(): void {

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.username = val || fullNameFromToken
    });


    if (this.username) {
      this.jobsint.getJobsByUser(this.username).subscribe(data => {
        this.jobsList = data;
        this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
        this.generatePageNumbers();
        this.updateDisplayedJobs();
      });
    }

  


    setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.testimonials.length;
    }, 6000); 




   

  }


  

  
  startCarousel() {
    let currentIndex = 0;
    setInterval(() => {
      this.currentImage = this.images[currentIndex];
      currentIndex = (currentIndex + 1) % this.images.length;
    }, 3000); // Change image every 3 seconds
  }


}
