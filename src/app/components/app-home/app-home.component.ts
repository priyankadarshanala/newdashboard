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
      content: "I cannot express enough gratitude for the jobs portal. It revolutionized my job search experience. "
    },
    { 
      profilePhoto: 'assets/Anjali.png',
      name: 'Anjali',
      content: "The jobs portal exceeded my expectations in every way possible. Its very great platform. " 
    },
    { 
      profilePhoto: 'assets/rizwana.png',
      name: 'Rizwana',
      content: "I'm very glad to get placed from Onlinejobsportal to Dell EMC corporation. I got placed just at my very less time.." 
    },
    { 
      profilePhoto: 'assets/chandra.png',
      name: 'Chandra',
      content: 'Iam very thankful to jobs portal.It Is a very good and geniune platform for freshers to find jobs...' 
    },
    { 
      profilePhoto: 'assets/prakyath.png',
      name: 'Prakhyath',
      content: "I had a great experience using the jobs portal to find my next career move..."  
    },
    { 
      profilePhoto: 'assets/soumya.png',
      name: 'Soumya',
      content: 'I am very grateful to them for effectively and sincerely helping me to grab first ever job opportunity' 
    },
    { 
      profilePhoto: 'assets/Madhu.png',
      name: 'Madhu',
      content: 'Thank you onlinejobsportal for providing multiple opportunties in number of companies where I got place placed' 
    },
    { 
      profilePhoto: 'assets/srimathi.png',
      name: 'srimathi',
      content: 'I am extremely grateful to the jobs portal for helping me secure my dream job...' 
    },
    { 
      profilePhoto: 'assets/mounika.png',
      name: 'Mounika',
      content: "I have been searching for a job for months without any luck until I discovered the jobs portal."
    },
    { 
      profilePhoto: 'assets/priyanka.png',
      name: 'Priyanka',
      content: "I can't thank the jobs portal enough for the fantastic opportunities" 
    },
   
    { 
      profilePhoto: 'assets/sandhya.pic.png',
      name: 'sandhya',
      content: "I had been struggling to find a job that matched my qualifications until I stumbled upon the jobs portal.."
    }
  ];
  //Testimonials end....



  //pagination and geting jobs
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


  

  //carousel code
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






onFileChange(event: any): void {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    this.resume = fileList[0];
  }
}

}
