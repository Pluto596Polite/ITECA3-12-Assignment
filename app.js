// 1. IMPORT THE CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// 2. IMPORT THE JS
import * as bootstrap from 'bootstrap';


document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    // Add active class to the clicked link
    this.classList.add('active');
  });
});
