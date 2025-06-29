// Hamburger Menu Toggle
document.getElementById('hamburger-btn').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

// Typing Animation for Hero Section
const words = ["Digital Frontier", "Business", "Future"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function type() {
    const typingText = document.getElementById('typing-text');
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, deletingSpeed);
        }
    } else {
        typingText.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('typing-text')) {
        type();
    }
});

// Counter Animation for About Section
function animateCounter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isPercentage = counter.textContent.includes('%');
        let count = 0;
        const speed = target < 100 ? 50 : 10;

        const updateCount = () => {
            const increment = target / speed;
            count += increment;
            if (count < target) {
                counter.textContent = isPercentage ? `${Math.ceil(count)}%` : Math.ceil(count);
                setTimeout(updateCount, 50);
            } else {
                counter.textContent = isPercentage ? `${target}%` : target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.counter')) {
        animateCounter();
    }
});

// Form Progress Bar
function updateFormProgress() {
    const formFields = document.querySelectorAll('#reg-name, #college, #degree, #year-of-passing, #country, #state, #city, #reg-email, #phone, #about-course, #linkedin, #start-date, #referral');
    let filledFields = 0;

    formFields.forEach(field => {
        if (field && field.value.trim() !== '') {
            filledFields++;
        }
    });

    const progress = (filledFields / formFields.length) * 100;
    const progressBar = document.getElementById('form-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#reg-name')) {
        document.querySelectorAll('#reg-name, #college, #degree, #year-of-passing, #country, #state, #city, #reg-email, #phone, #about-course, #linkedin, #start-date, #referral').forEach(field => {
            if (field) {
                field.addEventListener('input', updateFormProgress);
            }
        });
    }
});

// Registration Modal
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.enroll-btn')) {
        document.querySelectorAll('.enroll-btn').forEach(button => {
            button.addEventListener('click', () => {
                const courseName = button.getAttribute('data-course');
                document.getElementById('course-name').textContent = courseName;
                document.getElementById('registration-modal').classList.remove('hidden');
                document.getElementById('registration-modal').classList.add('active');
                updateFormProgress();
            });
        });

        document.getElementById('close-registration-modal').addEventListener('click', () => {
            document.getElementById('registration-modal').classList.add('hidden');
            document.getElementById('registration-modal').classList.remove('active');
            document.querySelectorAll('#reg-name, #college, #degree, #year-of-passing, #country, #state, #city, #reg-email, #phone, #about-course, #linkedin, #start-date, #referral').forEach(field => {
                field.value = '';
            });
            document.getElementById('form-progress').style.width = '0%';
        });

        document.getElementById('submit-registration').addEventListener('click', () => {
            const requiredFields = document.querySelectorAll('#reg-name, #college, #degree, #year-of-passing, #country, #state, #city, #reg-email, #phone, #about-course, #start-date, #referral');
            let allFilled = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    allFilled = false;
                }
            });

            if (allFilled) {
                alert(`Thank you for enrolling in ${document.getElementById('course-name').textContent}! We will contact you soon.`);
                document.getElementById('registration-modal').classList.add('hidden');
                document.getElementById('registration-modal').classList.remove('active');
                document.querySelectorAll('#reg-name, #college, #degree, #year-of-passing, #country, #state, #city, #reg-email, #phone, #about-course, #linkedin, #start-date, #referral').forEach(field => {
                    field.value = '';
                });
                document.getElementById('form-progress').style.width = '0%';
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonialCount = 3;

function moveTestimonial(direction) {
    currentTestimonial = (currentTestimonial + direction + testimonialCount) % testimonialCount;
    const carousel = document.querySelector('#testimonial-carousel .flex');
    if (carousel) {
        carousel.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }
}

function autoScrollTestimonials() {
    moveTestimonial(1);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('testimonial-carousel')) {
        document.getElementById('prev-testimonial').addEventListener('click', () => moveTestimonial(-1));
        document.getElementById('next-testimonial').addEventListener('click', () => moveTestimonial(1));
        setInterval(autoScrollTestimonials, 5000);
    }
});

// Project Modal
const projectData = {
    1: {
        title: "BankSecure Implementation",
        description: "Implemented a comprehensive security solution for a leading bank, reducing threats by 90%.",
        details: [
            "Conducted penetration testing across 50+ servers.",
            "Implemented advanced encryption protocols.",
            "Reduced cyber threats by 90% within 6 months."
        ]
    },
    2: {
        title: "HealthCorp Data Protection",
        description: "Secured sensitive patient data for a healthcare provider with advanced encryption.",
        details: [
            "Encrypted over 1 million patient records.",
            "Integrated multi-factor authentication.",
            "Achieved HIPAA compliance in 3 months."
        ]
    },
    3: {
        title: "E-Commerce Threat Defense",
        description: "Protected an e-commerce platform from DDoS attacks and data breaches.",
        details: [
            "Mitigated a major DDoS attack in under 2 hours.",
            "Secured payment gateways with end-to-end encryption.",
            "Improved site uptime to 99.9%."
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.project-card')) {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project');
                const project = projectData[projectId];
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                const detailsList = document.getElementById('modal-details');
                detailsList.innerHTML = '';
                project.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    detailsList.appendChild(li);
                });
                document.getElementById('project-modal').classList.remove('hidden');
                document.getElementById('project-modal').classList.add('active');
            });
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('project-modal').classList.add('hidden');
            document.getElementById('project-modal').classList.remove('active');
        });
    }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('submit-form')) {
        document.getElementById('submit-form').addEventListener('click', () => {
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon.');
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                document.getElementById('form-progress').style.width = '0%';
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }
});

// Back to Top Button Visibility
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.remove('hidden');
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.add('hidden');
        backToTop.classList.remove('visible');
    }
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Live Chat Toggle
document.getElementById('chat-toggle').addEventListener('click', () => {
    const chatBox = document.getElementById('chat-box');
    chatBox.classList.toggle('hidden');
    chatBox.classList.toggle('active');
});

// Newsletter Subscription
document.getElementById('newsletter-btn').addEventListener('click', () => {
    const email = document.getElementById('newsletter-email').value;
    if (email) {
        alert('Thank you for subscribing to DeepSec updates!');
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});