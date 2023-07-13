import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

interface Message {

  author: string;

  content: string;

}

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})


export class AppHomeComponent implements OnInit {

  images: string[] = [
    'assets/career.jpg',
    'assets/Jobs.jpg',
    'assets/Register.jpg'
  ];
  currentImage: string | undefined;


  profileId!: number;
  firstName!: string;
  lastName!: string;
  email!: string; 
  mobile!: string;
  resume!: File;


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
  
  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
  }


  profilePostUrl = 'https://localhost:7058/api/Profile';




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
    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();
      this.startCarousel();

      
    });


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


//chat bot


messages: Message[] = [];

  userInput: string = '';

  showChatbot: boolean = false;
handleUserInput() {

  const userMessage: Message = { author: 'user', content: this.userInput };

  this.messages.push(userMessage);

  this.userInput = '';




  const botMessage: Message = { author: 'bot', content: this.getBotMessage(userMessage.content) };

  setTimeout(() => {

    this.messages.push(botMessage);

  }, 1500);

 

}




getBotMessage(question: string) {

  const messageMap: { [key: string]: string } = {

    'Hi': 'Hello,How can I help you',

    'Hello': 'Hi,How can I help you',

    'Who are you': 'My name is Test Sat Bot',

    'What is your role': 'Just guide for the user',

    'Priyanka':'Darshanala'

  };

  return messageMap[question] || 'I can\'t understand your text. Can you please repeat?';

}

toggleChatbot() {

  this.showChatbot = !this.showChatbot;

 

}

closeChatbot() {

  this.showChatbot = false;

}


//profile

submitProfile(): void {
  const formData = new FormData();
  formData.append('profileId', this.profileId.toString());
  formData.append('firstName', this.firstName);
  formData.append('lastName', this.lastName);
  formData.append('email', this.email);
  formData.append('mobile', this.mobile);
  formData.append('resume', this.resume);

  this.http.post(this.profilePostUrl, formData).subscribe(
    (data) => {
      console.log(data)
    }
  );
}

onFileChange(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    this.resume = fileList[0];
  }
}

}
