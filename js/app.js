/* ==========================================================================
   Yoga Paadhi Foundation - Interactive Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initNavbar();
  initProgramFilters();
  initCalendarSchedule();
  initMembershipPricing();
  initDonationForm();
  initScrollSpy();
});

/* ==========================================================================
   Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Change navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle mobile menu drawer
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile drawer on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
      navLinks.classList.remove('active');

      // Update active class
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* ==========================================================================
   Intersection Observer (Scrollspy)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const options = {
    root: null,
    threshold: 0.25,
    rootMargin: "-80px 0px 0px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/* ==========================================================================
   Program Filters
   ========================================================================== */
function initProgramFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');
  const programGrid = document.getElementById('programGrid');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Animate transition
      programGrid.style.opacity = '0';

      setTimeout(() => {
        programCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        programGrid.style.opacity = '1';
      }, 250);
    });
  });
}

/* ==========================================================================
   Interactive Weekly Class Schedule Calendar
   ========================================================================== */
const scheduleData = {
  Mon: [
    { time: '06:00 AM', duration: '60 Mins', name: 'Morning Prana Flow', desc: 'Gentle energy awakening flow. Perfect for beginners and advanced practitioners.', slots: '3 slots left', statusClass: '', instructor: 'Gali Tejaswi' },
    { time: '09:00 AM', duration: '75 Mins', name: 'Therapeutic Spine Align', desc: 'Targeted rehabilitation yoga focused on posture corrections and neck tension release.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '06:00 PM', duration: '60 Mins', name: 'Deep Rest Sound Bath', desc: 'Restorative positions paired with singing bowls for anxiety control and deep sleep support.', slots: '2 slots left', statusClass: '', instructor: 'Gali Tejaswi' }
  ],
  Tue: [
    { time: '07:00 AM', duration: '60 Mins', name: 'Ashtanga Vinyasa Series', desc: 'Dynamic flowing sequences designed to build strong muscles, core balance, and stamina.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '10:00 AM', duration: '60 Mins', name: 'Gentle Senior Wellness', desc: 'Relaxing stretches and supported positions designed for joint mobility and soft breathing.', slots: 'Only 4 slots left', statusClass: '', instructor: 'Assoc. Teacher' },
    { time: '05:30 PM', duration: '90 Mins', name: 'Advanced Core & Alignment', desc: 'Deeper exploration of inversions, balances, and philosophical alignment concepts.', slots: '1 slot left', statusClass: '', instructor: 'Gali Tejaswi' }
  ],
  Wed: [
    { time: '06:00 AM', duration: '60 Mins', name: 'Morning Prana Flow', desc: 'Gentle energy awakening flow. Perfect for beginners and advanced practitioners.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '09:30 AM', duration: '60 Mins', name: 'Chakra Breathing (Pranayama)', desc: 'Conscious breathing techniques targeting internal balance and nervous system calming.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '06:30 PM', duration: '60 Mins', name: 'Family Wellness Session', desc: 'Fun interactive stretching and couples/family bonding flows. All ages welcome.', slots: 'Only 5 slots left', statusClass: '', instructor: 'Assoc. Teacher' }
  ],
  Thu: [
    { time: '07:00 AM', duration: '60 Mins', name: 'Hatha Balance Focus', desc: 'Classical poses held longer to build deep alignment, muscle stability, and mental focus.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '11:00 AM', duration: '60 Mins', name: 'Corporate Ergonomic Stretch', desc: 'Neck, shoulder, and back tension release designed specifically for desk-bound professionals.', slots: 'Slots Available', statusClass: 'green', instructor: 'Assoc. Teacher' },
    { time: '06:00 PM', duration: '60 Mins', name: 'Deep Rest Sound Bath', desc: 'Restorative positions paired with singing bowls for anxiety control and deep sleep support.', slots: 'Only 2 slots left', statusClass: '', instructor: 'Gali Tejaswi' }
  ],
  Fri: [
    { time: '06:00 AM', duration: '60 Mins', name: 'Morning Prana Flow', desc: 'Gentle energy awakening flow. Perfect for beginners and advanced practitioners.', slots: 'Slots Available', statusClass: 'green', instructor: 'Gali Tejaswi' },
    { time: '09:00 AM', duration: '75 Mins', name: 'Therapeutic Spine Align', desc: 'Targeted rehabilitation yoga focused on posture corrections and neck tension release.', slots: 'Only 3 slots left', statusClass: '', instructor: 'Gali Tejaswi' },
    { time: '05:00 PM', duration: '60 Mins', name: 'Weekend Warm Up Flow', desc: 'Invigorating flow to sweat out weekday stress and welcome positive weekend energy.', slots: 'Slots Available', statusClass: 'green', instructor: 'Assoc. Teacher' }
  ],
  Sat: [
    { time: '08:00 AM', duration: '90 Mins', name: 'Weekend Satsang & Meditation', desc: 'Community gathering incorporating chants, guided silence, and wellness discussions.', slots: 'Almost Full', statusClass: '', instructor: 'Gali Tejaswi' },
    { time: '10:30 AM', duration: '120 Mins', name: 'Intensive Alignment Workshop', desc: 'Surgical breakdown of complex poses, anatomical safety, and hands-on adjustments.', slots: 'Only 2 slots left', statusClass: '', instructor: 'Gali Tejaswi' }
  ]
};

function initCalendarSchedule() {
  const calendarDays = document.getElementById('calendarDays');
  const scheduleList = document.getElementById('scheduleList');

  if (!calendarDays || !scheduleList) return;

  const dayButtons = calendarDays.querySelectorAll('.day-tab');

  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const day = btn.getAttribute('data-day');
      renderScheduleForDay(day, scheduleList);
    });
  });
}

function renderScheduleForDay(day, container) {
  const classes = scheduleData[day] || [];
  container.style.opacity = '0';

  setTimeout(() => {
    if (classes.length === 0) {
      container.innerHTML = `<p class="text-center" style="padding: 2rem;">No classes scheduled for this day.</p>`;
    } else {
      container.innerHTML = classes.map(cls => `
        <div class="schedule-item animate-fade-in">
          <div class="time-block">
            <span class="start-time">${cls.time}</span>
            <span class="duration">${cls.duration}</span>
          </div>
          <div class="session-info">
            <h4>${cls.name}</h4>
            <p>${cls.desc}</p>
            <div class="slots-indicator ${cls.statusClass}">
              <i class="${cls.statusClass === 'green' ? 'fas fa-circle-check' : 'fas fa-circle-exclamation'}"></i> ${cls.slots}
            </div>
          </div>
          <div class="instructor-block">
            <span class="instructor-title">Instructor</span>
            <span class="instructor-name">${cls.instructor}</span>
          </div>
          <div class="action-block">
            <button onclick="openBookingModal('${cls.name} (${day})')" class="btn btn-primary btn-sm">Book Class</button>
          </div>
        </div>
      `).join('');
    }
    container.style.opacity = '1';
  }, 200);
}

/* ==========================================================================
   Membership Pricing Slider
   ========================================================================== */
function initMembershipPricing() {
  const toggle = document.getElementById('pricingToggle');
  const priceSeeker = document.getElementById('priceSeeker');
  const pricePractitioner = document.getElementById('pricePractitioner');
  const priceYogi = document.getElementById('priceYogi');

  if (!toggle) return;

  // Pricing values
  const prices = {
    monthly: { seeker: 49, practitioner: 89, yogi: 149 },
    annual: { seeker: 41, practitioner: 75, yogi: 126 } // approx 15% discount
  };

  toggle.addEventListener('change', () => {
    const period = toggle.checked ? 'annual' : 'monthly';
    const durationLabel = toggle.checked ? '/mo' : '/mo'; // shows monthly equivalent

    // Animate the values scaling
    [priceSeeker, pricePractitioner, priceYogi].forEach(el => {
      el.style.transform = 'scale(0.8)';
      el.style.opacity = '0';
    });

    setTimeout(() => {
      priceSeeker.textContent = prices[period].seeker;
      pricePractitioner.textContent = prices[period].practitioner;
      priceYogi.textContent = prices[period].yogi;

      // Update duration text in siblings if needed (represented inside HTML structure)
      const cards = document.querySelectorAll('.price-card');
      cards.forEach((card, index) => {
        const durationEl = card.querySelector('.duration');
        if (durationEl) {
          if (toggle.checked) {
            const planNames = ['Seeker', 'Practitioner', 'Yogi'];
            const annualTotals = [499, 899, 1519];
            durationEl.innerHTML = `/mo <span style="display:block; font-size: 0.65rem; color: var(--color-accent-dark); font-weight: bold;">Billed Annually ($${annualTotals[index]})</span>`;
          } else {
            durationEl.innerHTML = `/mo`;
          }
        }
      });

      [priceSeeker, pricePractitioner, priceYogi].forEach(el => {
        el.style.transform = 'scale(1)';
        el.style.opacity = '1';
      });
    }, 200);
  });
}

/* ==========================================================================
   Donation Component Presets
   ========================================================================== */
function initDonationForm() {
  const presetButtons = document.querySelectorAll('.preset-btn');
  const customInput = document.getElementById('customDonationInput');

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customInput) customInput.value = ''; // clear custom amount
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
    });
  }
}

function processDonation() {
  const activePreset = document.querySelector('.preset-btn.active');
  const customInput = document.getElementById('customDonationInput');
  let amount = 0;

  if (activePreset) {
    amount = activePreset.getAttribute('data-amount');
  } else if (customInput && customInput.value) {
    amount = customInput.value;
  }

  if (amount <= 0 || isNaN(amount)) {
    alert("Please select or enter a valid donation amount.");
    return;
  }

  // Visual success feedback using temporary modal inject
  const articleModal = document.getElementById('blogModal');
  const content = document.getElementById('blogArticleContent');

  content.innerHTML = `
    <div class="text-center" style="padding: 3rem 1.5rem;">
      <div style="font-size: 4rem; color: var(--color-accent); margin-bottom: 1.5rem;"><i class="fas fa-heart-circle-check animate-fade-in"></i></div>
      <h2 style="font-family: var(--font-serif); font-size: 2.25rem; margin-bottom: 1rem;">Thank You for Supporting Us!</h2>
      <p style="font-size: 1.1rem; color: var(--color-text-muted); max-width: 500px; margin: 0 auto 2rem;">
        Your generous contribution of <strong>$${amount}</strong> directly helps Yoga Paadhi Foundation provide free wellness education and healthy meals to underprivileged communities.
      </p>
      <div style="background-color: var(--color-bg-base); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border); max-width: 400px; margin: 0 auto 2rem; font-size: 0.9rem;">
        <p>A receipt has been sent to your default billing address. All transactions are securely processed.</p>
      </div>
      <button onclick="closeBlogModal()" class="btn btn-primary">Return to Sanctuary</button>
    </div>
  `;

  articleModal.classList.add('active');
}

/* ==========================================================================
   Modals & Overlays Controllers
   ========================================================================== */

// Lightbox for Gallery
function openLightbox(src, title) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  lightboxImg.src = src;
  lightboxCaption.textContent = title;
  lightbox.classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

// Booking Modal
function openBookingModal(sessionName) {
  const modal = document.getElementById('bookingModal');
  const sessionSpan = document.getElementById('selectedSessionName');
  const hiddenInput = document.getElementById('modalSessionHidden');
  
  if (sessionSpan) sessionSpan.textContent = sessionName;
  if (hiddenInput) hiddenInput.value = sessionName;

  // Set date input minimum value to today
  const dateInput = document.getElementById('modalDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  modal.classList.add('active');
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
}

// Event Registration Modal
function openEventModal(eventName) {
  const modal = document.getElementById('eventModal');
  const eventSpan = document.getElementById('selectedEventName');
  const hiddenInput = document.getElementById('modalEventHidden');

  if (eventSpan) eventSpan.textContent = eventName;
  if (hiddenInput) hiddenInput.value = eventName;

  modal.classList.add('active');
}

function closeEventModal() {
  document.getElementById('eventModal').classList.remove('active');
}

// Blog Reader Modal
function closeBlogModal() {
  document.getElementById('blogModal').classList.remove('active');
}

/* ==========================================================================
   Form Handling Simulations
   ========================================================================== */

// Free Consultation Form in Contact Section
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('clientName').value;
  const email = document.getElementById('clientEmail').value;
  const phone = document.getElementById('clientPhone').value;
  const program = document.getElementById('programSelect').value;
  const message = document.getElementById('clientMessage').value;

  // Construct mailto link
  const subject = `Yoga Paadhi Consultation - ${name}`;
  const bodyText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Program: ${program}\n\nWellness Goals / Health Notes:\n${message}`;
  
  // Open user mail client prefilled
  window.location.href = `mailto:tejaswi.tejugali@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  // Inject a success message in the contact form wrapper
  const formContainer = document.querySelector('.contact-form-container');
  const initialContent = formContainer.innerHTML;

  formContainer.innerHTML = `
    <div class="text-center animate-fade-in" style="padding: 2rem 0;">
      <div style="font-size: 3.5rem; color: var(--color-secondary); margin-bottom: 1rem;"><i class="fas fa-circle-check"></i></div>
      <h3 style="font-size: 1.75rem; margin-bottom: 1rem;">Consultation Mail Prepared!</h3>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 2rem;">
        Thank you, <strong>${name}</strong>. Your native email client has been launched to send your details directly to <strong>tejaswi.tejugali@gmail.com</strong>.
      </p>
      <button onclick="resetContactForm('${escapeHtml(initialContent)}')" class="btn btn-outline">Send Another Request</button>
    </div>
  `;
}

function resetContactForm(originalHtml) {
  const formContainer = document.querySelector('.contact-form-container');
  formContainer.innerHTML = originalHtml;
}

// Modal booking form
function handleModalBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value;
  const email = document.getElementById('modalEmail').value;
  const session = document.getElementById('modalSessionHidden').value;
  const date = document.getElementById('modalDate').value;
  const time = document.getElementById('modalTime').value;

  const modal = document.getElementById('bookingModal');
  const modalBox = modal.querySelector('.modal');
  const originalContent = modalBox.innerHTML;

  modalBox.innerHTML = `
    <div class="text-center animate-fade-in" style="padding: 1.5rem 0;">
      <div style="font-size: 3.5rem; color: var(--color-secondary); margin-bottom: 1rem;"><i class="fas fa-calendar-check"></i></div>
      <h3 style="font-size: 1.75rem; margin-bottom: 1rem;">Reservation Confirmed!</h3>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Hi <strong>${name}</strong>, your spot for <strong>${session}</strong> is booked on <strong>${date}</strong> at <strong>${time}</strong>.
      </p>
      <p style="font-size: 0.85rem; background-color: var(--color-bg-base); padding: 1rem; border-radius: 6px; border: 1px solid var(--color-border); margin-bottom: 2rem;">
        An invitation link and diagnostic intake questionnaire have been sent to <strong>${email}</strong>.
      </p>
      <button onclick="closeBookingAndReset('${escapeHtml(originalContent)}')" class="btn btn-primary">Close Window</button>
    </div>
  `;
}

function closeBookingAndReset(originalHtml) {
  closeBookingModal();
  setTimeout(() => {
    const modalBox = document.querySelector('#bookingModal .modal');
    modalBox.innerHTML = originalHtml;
  }, 300);
}

// Modal event registration form
function handleModalEventSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('eventRegName').value;
  const email = document.getElementById('eventRegEmail').value;
  const event = document.getElementById('modalEventHidden').value;

  const modal = document.getElementById('eventModal');
  const modalBox = modal.querySelector('.modal');
  const originalContent = modalBox.innerHTML;

  modalBox.innerHTML = `
    <div class="text-center animate-fade-in" style="padding: 1.5rem 0;">
      <div style="font-size: 3.5rem; color: var(--color-secondary); margin-bottom: 1rem;"><i class="fas fa-ticket"></i></div>
      <h3 style="font-size: 1.75rem; margin-bottom: 1rem;">Spot Registered!</h3>
      <p style="font-size: 0.95rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        Thank you <strong>${name}</strong>. You are successfully registered for the <strong>${event}</strong>.
      </p>
      <p style="font-size: 0.85rem; background-color: var(--color-bg-base); padding: 1rem; border-radius: 6px; border: 1px solid var(--color-border); margin-bottom: 2rem;">
        Event schedule, dietary requirements validation, and joining details sent to <strong>${email}</strong>.
      </p>
      <button onclick="closeEventAndReset('${escapeHtml(originalContent)}')" class="btn btn-primary">Close Window</button>
    </div>
  `;
}

function closeEventAndReset(originalHtml) {
  closeEventModal();
  setTimeout(() => {
    const modalBox = document.querySelector('#eventModal .modal');
    modalBox.innerHTML = originalHtml;
  }, 300);
}

// Newsletter subscription
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  
  // Show quick status feedback in form
  const form = document.querySelector('.newsletter-form');
  const originalContent = form.innerHTML;

  form.innerHTML = `
    <div class="animate-fade-in" style="color: var(--color-accent); font-weight: bold; font-size: 0.9rem; padding: 0.5rem 0;">
      <i class="fas fa-circle-check"></i> Subscribed! Thank you for joining us.
    </div>
  `;

  setTimeout(() => {
    form.innerHTML = originalContent;
  }, 4000);
}

/* ==========================================================================
   Wisdom / Blog Content Database
   ========================================================================== */
const blogDatabase = {
  pranayama: {
    title: 'The Art of Breath: Pranayama Basics',
    tag: 'Breathwork',
    date: 'June 15, 2026',
    author: 'Gali Tejaswi',
    img: 'assets/about-grid-1.png',
    content: `
      <div class="blog-reader-header" style="margin-bottom: 2rem;">
        <span class="blog-tag" style="position: static; display: inline-block; margin-bottom: 1rem;">Breathwork</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.5rem; line-height: 1.2; margin-bottom: 1rem;">The Art of Breath: Pranayama Basics</h1>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Published on <strong>June 15, 2026</strong> • Written by <strong>Gali Tejaswi</strong></p>
      </div>
      <div class="blog-reader-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-main);">
        <img src="assets/about-grid-1.png" alt="Incense smoke" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">
        <p style="margin-bottom: 1.5rem;">In our fast-paced modern lives, our breath has become shallow, rapid, and restricted. This shallow breathing signals the nervous system that we are in constant danger, triggering the sympathetic nervous system (fight-or-flight) and elevating stress and cortisol levels.</p>
        <p style="margin-bottom: 1.5rem;"><strong>Pranayama</strong> is the ancient science of yogic breath control. 'Prana' represents our vital life-force energy, and 'Ayama' means to extend or draw out. By practicing conscious control over our inhalation, exhalation, and retention, we can directly alter our state of mind.</p>
        
        <h3 style="font-family: var(--font-serif); font-size: 1.75rem; margin: 2rem 0 1rem; color: var(--color-primary);">Three Basic Breathing Techniques</h3>
        
        <ol style="margin-left: 1.5rem; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
          <li>
            <strong>Nadi Shodhana (Alternate Nostril Breathing):</strong><br>
            Close your right nostril with your thumb, and inhale gently through the left. Close the left nostril with your ring finger, release the right, and exhale. Inhale through the right, close it, and exhale through the left. Repeat for 5-10 rounds to balance both hemispheres of the brain.
          </li>
          <li>
            <strong>Dirga Pranayama (Three-Part Breath):</strong><br>
            Inhale deeply first into the belly, expanding it like a balloon. Continue inhaling to fill the rib cage, and finally fill the upper chest. Exhale in reverse, releasing chest, ribs, then pulling the navel in. This increases oxygenation and calms active anxiety.
          </li>
          <li>
            <strong>Sama Vritti (Box Breathing):</strong><br>
            Inhale for 4 counts, hold the breath for 4 counts, exhale for 4 counts, and hold empty for 4 counts. Excellent for nervous system resets during high-stress work meetings.
          </li>
        </ol>

        <blockquote style="font-family: var(--font-serif); font-style: italic; font-size: 1.25rem; color: var(--color-secondary); padding-left: 1rem; border-left: 3px solid var(--color-accent); margin: 2rem 0;">
          "The mind is the king of the senses, and the breath is the king of the mind." — Hatha Yoga Pradipika
        </blockquote>

        <p style="margin-bottom: 1.5rem;">Start with just five minutes of daily practice every morning, preferably on an empty stomach. You will notice a steady drop in daily stress levels, enhanced lung capacity, and a deep feeling of grounding presence.</p>
      </div>
      <div style="margin-top: 3rem; text-align: center;">
        <button onclick="closeBlogModal()" class="btn btn-primary">Finish Reading</button>
      </div>
    `
  },
  mindfulness: {
    title: 'Mindfulness in Daily Chaos',
    tag: 'Mindfulness',
    date: 'May 28, 2026',
    author: 'Gali Tejaswi',
    img: 'assets/gallery-3.png',
    content: `
      <div class="blog-reader-header" style="margin-bottom: 2rem;">
        <span class="blog-tag" style="position: static; display: inline-block; margin-bottom: 1rem;">Mindfulness</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.5rem; line-height: 1.2; margin-bottom: 1rem;">Mindfulness in Daily Chaos</h1>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Published on <strong>May 28, 2026</strong> • Written by <strong>Gali Tejaswi</strong></p>
      </div>
      <div class="blog-reader-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-main);">
        <img src="assets/gallery-3.png" alt="Meditating in greenery" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">
        <p style="margin-bottom: 1.5rem;">Many people assume that mindfulness requires sitting silently cross-legged on a cushion for hours in a remote mountain temple. While dedicated meditation retreats are incredibly beneficial, the true gift of mindfulness lies in your ability to carry peace directly into daily work challenges.</p>
        <p style="margin-bottom: 1.5rem;">Mindfulness is simply the quality of being fully present, aware of where we are and what we are doing, and not overly reactive or overwhelmed by what’s going on around us.</p>
        
        <h3 style="font-family: var(--font-serif); font-size: 1.75rem; margin: 2rem 0 1rem; color: var(--color-primary);">Four Desk-Friendly Mindfulness Pockets</h3>
        
        <ul style="margin-left: 1.5rem; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem; list-style-type: square;">
          <li>
            <strong>The Three-Breath Reset:</strong><br>
            Whenever you transition between tasks or open a new email window, pause. Take three conscious, deep breaths. Pay attention to the physical sensation of the air filling your chest and the feeling of your feet flat on the floor.
          </li>
          <li>
            <strong>Mindful Sensory Ingestion:</strong><br>
            When drinking your morning tea or coffee, don't look at your phone. For just two minutes, focus entirely on the warmth of the cup, the aroma, and the actual taste of each sip. Ingest the drink with complete focus.
          </li>
          <li>
            <strong>The 5-4-3-2-1 Grounding Method:</strong><br>
            If you feel a sudden surge of anxiety, scan your surroundings. Silently name 5 things you can see, 4 things you can physically touch, 3 things you hear, 2 things you smell, and 1 positive aspect of yourself. This pulls your brain out of anxiety loops.
          </li>
          <li>
            <strong>Walking Meditations to the Fountain:</strong><br>
            When walking to get water or using the restroom, focus entirely on the physical movement of your legs and the lifting of your feet. Let go of active project calculations until you sit back down.
          </li>
        </ul>

        <p style="margin-bottom: 1.5rem;">By integrating these tiny pockets of stillness, you break the cycle of cumulative cognitive fatigue, maintaining creativity, clarity, and physical ease even in high-stress work settings.</p>
      </div>
      <div style="margin-top: 3rem; text-align: center;">
        <button onclick="closeBlogModal()" class="btn btn-primary">Finish Reading</button>
      </div>
    `
  },
  backpain: {
    title: 'Yoga for Back Pain: Gentle Poses',
    tag: 'Therapy',
    date: 'May 12, 2026',
    author: 'Gali Tejaswi',
    img: 'assets/gallery-4.png',
    content: `
      <div class="blog-reader-header" style="margin-bottom: 2rem;">
        <span class="blog-tag" style="position: static; display: inline-block; margin-bottom: 1rem;">Therapy</span>
        <h1 style="font-family: var(--font-serif); font-size: 2.5rem; line-height: 1.2; margin-bottom: 1rem;">Yoga for Back Pain: Gentle Poses</h1>
        <p style="font-size: 0.9rem; color: var(--color-text-muted);">Published on <strong>May 12, 2026</strong> • Written by <strong>Gali Tejaswi</strong></p>
      </div>
      <div class="blog-reader-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-main);">
        <img src="assets/gallery-4.png" alt="Yoga Spine stretching" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem;">
        <p style="margin-bottom: 1.5rem;">Chronic back pain is one of the most common physical ailments globally, often caused by long hours of hunched posture at computers, weakened core stabilizers, and stress-induced muscle tension.</p>
        <p style="margin-bottom: 1.5rem;">Fortunately, targeted therapeutic stretching can relieve compression in the lumbar spine, strengthen stabilizing core abdominal muscles, and gently release tight gluteal muscles and hamstrings that pull on the lower back.</p>
        
        <h3 style="font-family: var(--font-serif); font-size: 1.75rem; margin: 2rem 0 1rem; color: var(--color-primary);">Four Key Restorative Postures</h3>
        
        <ol style="margin-left: 1.5rem; margin-bottom: 2rem; display: flex; flex-direction: column; gap: 1rem;">
          <li>
            <strong>Marjaryasana-Bitilasana (Cat-Cow Pose):</strong><br>
            On all fours, inhale as you drop the belly, lift the chest, and look forward (Cow). Exhale as you round the spine, pull the navel to the backbone, and drop the head (Cat). Repeat for 10 slow breaths to lubricate spinal discs.
          </li>
          <li>
            <strong>Adho Mukha Svanasana (Downward-Facing Dog):</strong><br>
            Lift the hips up and back, creating a inverted V-shape. Keep your knees slightly bent to prioritize lengthening the spine rather than forcing straight legs. This decompresses the vertebrae.
          </li>
          <li>
            <strong>Supta Matsyendrasana (Supine Spinal Twist):</strong><br>
            Lying flat on your back, pull your right knee to the chest and cross it over to the left side of your body. Extend your right arm out to the side and look over the right shoulder. Hold for 5 breaths on each side to mobilize lower lumbar muscles.
          </li>
          <li>
            <strong>Balasana (Child's Pose):</strong><br>
            Kneel on the floor, bring big toes together, sit back on your heels, and reach your arms forward, resting your forehead on the floor. Take deep breaths into your back ribs to release tension.
          </li>
        </ol>

        <p style="margin-bottom: 1.5rem;"><em>Disclaimer:</em> If you suffer from acute herniated discs or severe neurological symptoms, always seek a personalized therapeutic consultation under our certified instructors before executing dynamic flows.</p>
      </div>
      <div style="margin-top: 3rem; text-align: center;">
        <button onclick="closeBlogModal()" class="btn btn-primary">Finish Reading</button>
      </div>
    `
  }
};

function readArticle(articleKey) {
  const modal = document.getElementById('blogModal');
  const contentContainer = document.getElementById('blogArticleContent');
  const article = blogDatabase[articleKey];

  if (article && contentContainer) {
    contentContainer.innerHTML = article.content;
    modal.classList.add('active');
  }
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
