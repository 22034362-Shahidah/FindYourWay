// Campus Navigation App
document.addEventListener('DOMContentLoaded', function () {
  // Remove any leftover header or facility links if present
  const oldHeader = document.getElementById('campus-header');
  if (oldHeader) oldHeader.remove();
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

  // Welcome overlay logic (if present)
>>>>>>> 006788e0e2816a273ce9808bbb4f070511b9b93e
>>>>>>> de3aedfa154d469ac290f57e4222e9e6081b08b9

  // Expanded data for locations based on the campus map
  const locations = {
    "main entrance": {
      name: "Main Entrance",
      description: "Located at Woodlands Avenue 9, this is the primary entry point for all visitors and students.",
      map_ref: "Bottom center of the campus map, near the bus stop and taxi stand.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Main+Entrance"
    },
    "w1": {
      name: "W1",
      description: "School of Engineering (SEG) - W1 is the first building on the west row, near the main entrance.",
      map_ref: "Green block labeled W1, left of the Lawn.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W1"
    },
    "w2": {
      name: "W2",
      description: "School of Engineering (SEG) - W2 is the second building on the west row.",
      map_ref: "Green block labeled W2, above W1.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W2"
    },
    "w3": {
      name: "W3",
      description: "School of Engineering (SEG) - W3 is the third building on the west row.",
      map_ref: "Green block labeled W3, above W2.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W3"
    },
    "w4": {
      name: "W4",
      description: "School of Engineering (SEG) - W4 is the fourth building on the west row.",
      map_ref: "Green block labeled W4, above W3.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W4"
    },
    "w5": {
      name: "W5",
      description: "School of Engineering (SEG) - W5 is the fifth building on the west row.",
      map_ref: "Green block labeled W5, above W4.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W5"
    },
    "w6": {
      name: "W6",
      description: "School of Engineering (SEG) - W6 is the last building on the west row, near the North Canteen.",
      map_ref: "Green block labeled W6, top left of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+W6"
    },
    "e1": {
      name: "E1",
      description: "School of Applied Science (SAS) - E1 is the first building on the east row, near the Lawn.",
      map_ref: "Blue block labeled E1, right of the Lawn.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E1"
    },
    "e2": {
      name: "E2",
      description: "School of Applied Science (SAS) - E2 is the second building on the east row.",
      map_ref: "Blue block labeled E2, above E1.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E2"
    },
    "e3": {
      name: "E3",
      description: "School of Applied Science (SAS) - E3 is the third building on the east row.",
      map_ref: "Blue block labeled E3, above E2.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E3"
    },
    "e4": {
      name: "E4",
      description: "School of Applied Science (SAS) - E4 is the fourth building on the east row.",
      map_ref: "Blue block labeled E4, above E3.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E4"
    },
    "e5": {
      name: "E5",
      description: "School of Applied Science (SAS) - E5 is the fifth building on the east row.",
      map_ref: "Blue block labeled E5, above E4.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E5"
    },
    "e6": {
      name: "E6",
      description: "School of Applied Science (SAS) - E6 is the last building on the east row, near the North Canteen.",
      map_ref: "Blue block labeled E6, top right of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+E6"
    },
    "south canteen": {
      name: "South Food Court (South Canteen)",
      description: "Main canteen near the main entrance, serving a variety of food.",
      map_ref: "Yellow block labeled South Food Court, bottom center of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+South+Food+Court"
    },
    "north canteen": {
      name: "North Food Court (North Canteen)",
      description: "Canteen at the north end of campus, near W6 and E6.",
      map_ref: "Yellow block labeled North Food Court, top center of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+North+Food+Court"
    },
    "lawn canteen": {
      name: "Lawn Canteen",
      description: "Canteen located at the edge of the Lawn, near the E buildings.",
      map_ref: "Yellow block labeled Lawn Canteen, center right of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Lawn+Canteen"
    },
    "library": {
      name: "Library",
      description: "Located near the main entrance, next to the Admin building.",
      map_ref: "White block labeled Library, bottom left of the Lawn.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Library"
    },
    "admin": {
      name: "Admin Office",
      description: "Located at the front of the campus, next to the Library.",
      map_ref: "White block labeled Admin, bottom left of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Admin+Office"
    },
    "sports complex": {
      name: "Sports Complex",
      description: "Facilities for sports and recreation, including a field and courts.",
      map_ref: "Purple block labeled Sports Complex, top left of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Sports+Complex"
    },
    "the agora": {
      name: "The Agora",
      description: "Multi-purpose hall for events and activities.",
      map_ref: "Purple block labeled The Agora, far left of the map.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+The+Agora"
    },
    "artease trcc": {
      name: "Artease TRCC",
      description: "Food outlet at the Training & Research Competency Centre.",
      map_ref: "Located at the TRCC building.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+TRCC"
    },
    "artease library": {
      name: "Artease Library",
      description: "Food outlet near the Library area.",
      map_ref: "Located near the Library building.",
      gmap: "https://maps.google.com/?q=Republic+Polytechnic+Library"
    }
  };

  // Sample opening hours
  const openingHours = {
    "cafeteria": "7:30am - 7:00pm",
    "south food court": "7:30am - 7:00pm",
    "north canteen": "8:00am - 6:00pm",
    "lawn canteen": "8:00am - 5:00pm",
    "artease trcc": "8:00am - 6:00pm",
    "artease library": "8:00am - 6:00pm",
    "library": "8:30am - 9:00pm",
    "admin": "8:00am - 6:00pm"
  };

  // --- Chatbot Sidebar Toggle Logic ---
  const toggleBtn = document.getElementById('chatbot-toggle');
  const sidebar = document.getElementById('chatbot-sidebar');
  
  // Change chatbot toggle button background to lighter green
  if (toggleBtn) {
    toggleBtn.style.background = '#90ee90'; // Lighter green
    toggleBtn.style.boxShadow = '0 0 0 8px #eafbe6'; // Softer glow
    toggleBtn.style.width = '48px';
    toggleBtn.style.height = '48px';
    toggleBtn.style.minWidth = '48px';
    toggleBtn.style.minHeight = '48px';
    toggleBtn.style.maxWidth = '48px';
    toggleBtn.style.maxHeight = '48px';
    toggleBtn.style.padding = '0';
    // Make chatbot input wider for better visibility
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
      chatbotInput.style.width = '320px';
      chatbotInput.style.maxWidth = '100%';
      chatbotInput.style.fontSize = '1.05em'; // Slightly smaller font
      chatbotInput.placeholder = 'How do I get to...';
    }
  }

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('active');
      toggleBtn.classList.toggle('active');
      if (sidebar.classList.contains('active')) {
        document.getElementById('chatbot-input').focus();
        // Move toggleBtn to top left inside sidebar
        toggleBtn.style.position = 'absolute';
        toggleBtn.style.top = '18px';
        toggleBtn.style.left = '18px';
        toggleBtn.style.zIndex = '1001';
        sidebar.appendChild(toggleBtn);
      } else {
        // Reset toggleBtn position when sidebar closes
        toggleBtn.style.position = '';
        toggleBtn.style.top = '';
        toggleBtn.style.left = '';
        toggleBtn.style.zIndex = '';
        document.body.appendChild(toggleBtn);
      }
    });
    // Close on outside click
    window.addEventListener('click', function (e) {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('active');
      }
    });
    // Close on Escape
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        sidebar.classList.remove('active');
        toggleBtn.classList.remove('active');
      }
    });
  }

  // --- Chatbot Close Button Logic ---
  const closeBtn = document.getElementById('chatbot-close');
  if (closeBtn && sidebar && toggleBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.remove('active');
      toggleBtn.classList.remove('active');
      // Reset toggleBtn position when sidebar closes
      toggleBtn.style.position = '';
      toggleBtn.style.top = '';
      toggleBtn.style.left = '';
      toggleBtn.style.zIndex = '';
      document.body.appendChild(toggleBtn);
    });
  }

  // --- Chatbot UI & Messaging ---
  function addMessage(text, sender = 'bot', html = false) {
    const messages = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    if (html) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    msgDiv.appendChild(bubble);
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  // Welcome message
  window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    const btn = document.getElementById('welcome-btn');
    if (overlay && btn) {
      btn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 500);
      });
    }
    

    // Feature: Chatbot button opens sidebar and scrolls to chatbot
    const chatbotBtn = document.getElementById('chatbot-btn');
    const chatbotSidebar = document.getElementById('chatbot-sidebar');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    if (chatbotBtn && chatbotSidebar && chatbotToggle) {
      chatbotBtn.addEventListener('click', () => {
        chatbotSidebar.classList.add('active');
        chatbotToggle.classList.add('active');
        document.getElementById('chatbot-input').focus();
        setTimeout(() => {
          chatbotSidebar.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' });
        }, 100);
      });
    }
    // Welcome message
    addMessage('<span style="font-size:1.3em;">👋</span> Hi! I\'m your campus assistant. <br>I can help you with:<ul style="margin:0.5em 0 0 1.2em;padding:0;list-style:none;color:#228b22;font-size:0.98em;"><li>🗺️ <b>Navigation:</b> "How do I get to E4?"</li><li>🏫 <b>Classroom codes:</b> "W14K", "E27A"</li><li>📋 <b>Campus guides:</b> "How to print", "How to book a room"</li><li>📶 <b>WiFi help, parking info, library hours</b></li></ul><div style="margin-top:0.5em;font-size:0.95em;color:#666;">💡 Just type your question or say "hello" to get started!</div>', 'bot', true);
    // Remove intro section if present
    const intro = document.getElementById('intro');
    if (intro) intro.parentNode.removeChild(intro);
  });


  // Typing indicator
  function showTyping() {
    const messages = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.id = 'chatbot-typing';
    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    bubble.style.background = '#b2e5b2';
    bubble.style.color = '#228b22';
    typingDiv.appendChild(bubble);
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  function hideTyping() {
    const typing = document.getElementById('chatbot-typing');
    if (typing) typing.remove();
  }

  // --- Step-by-step Navigation Logic ---
  const navigationData = {
    'e1': [
      'Enter Republic Polytechnic through the main entrance at Woodlands Avenue 9.',
      'Walk straight ahead into the Atrium (the large open area with the information counter).',
      'From the Atrium, look for signs pointing to Block E.',
      'Proceed past the central garden, keeping the garden on your left.',
      'Block E1 will be the first building on your right as you enter the E block.',
      'Look for the E1 signage above the entrance.'
    ],
    'e2': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1, continue straight. E2 is the next building on your right.',
      'Look for the E2 signage above the entrance.'
    ],
    'e3': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1 and E2, continue straight. E3 is the third building on your right.',
      'Look for the E3 signage above the entrance.'
    ],
    'e4': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1, E2, and E3, continue straight. E4 is on your left, just before E5.',
      'Look for the E4 signage above the entrance.'
    ],
    'e5': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'Walk past E1, E2, E3, and E4. E5 is the fifth building in Block E, on your left.',
      'Look for the E5 signage above the entrance.'
    ],
    'w1': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'W1 is the first building on your left in the W block.',
      'Look for the W1 signage above the entrance.'
    ],
    'w2': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1, continue straight. W2 is the next building on your left.',
      'Look for the W2 signage above the entrance.'
    ],
    'w3': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1 and W2, continue straight. W3 is the third building on your left.',
      'Look for the W3 signage above the entrance.'
    ],
    'w4': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1, W2, and W3, continue straight. W4 is the fourth building on your left.',
      'Look for the W4 signage above the entrance.'
    ],
    'w5': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'Walk past W1, W2, W3, and W4. W5 is the fifth building on your left.',
      'Look for the W5 signage above the entrance.'
    ],
    'w6': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'Walk past W1, W2, W3, W4, and W5. W6 is the last building at the end of Block W, near the North Canteen.',
      'Look for the W6 signage above the entrance.'
    ],
    'e6': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'Walk past E1, E2, E3, E4, and E5. E6 is the last building at the end of Block E, near the North Canteen.',
      'Look for the E6 signage above the entrance.'
    ],
    'library': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Take the escalator or stairs to Level 2.',
      'The library is directly ahead, beside the study area and above the information counter.',
      'Look for the "Library" signage at the entrance.'
    ],
    'admin': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'The Admin Office is located to the left of the information counter.',
      'Look for the "Admin Office" signage.'
    ],
    'south canteen': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'The South Food Court is located on your right as you enter the main entrance area.',
      'It\'s the large dining area near the main entrance with multiple food stalls.',
      'Look for the "South Food Court" signage.'
    ],
    'south food court': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'The South Food Court is located on your right as you enter the main entrance area.',
      'It\'s the large dining area near the main entrance with multiple food stalls.',
      'Look for the "South Food Court" signage.'
    ],
    'north canteen': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Follow signs to Block W or Block E and head towards the far end of campus.',
      'Walk past all the W and E buildings until you reach the north end.',
      'The North Food Court is located between W6 and E6 buildings.',
      'Look for the "North Food Court" signage.'
    ],
    'north food court': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Follow signs to Block W or Block E and head towards the far end of campus.',
      'Walk past all the W and E buildings until you reach the north end.',
      'The North Food Court is located between W6 and E6 buildings.',
      'Look for the "North Food Court" signage.'
    ],
    'lawn canteen': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Head towards the central Lawn area (the large open green space).',
      'The Lawn Canteen is located on the eastern side of the Lawn, near the E buildings.',
      'It\'s a smaller dining area with outdoor seating overlooking the Lawn.',
      'Look for the "Lawn Canteen" signage.'
    ],
    'cafeteria': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'The main cafeteria (South Food Court) is located on your right as you enter.',
      'It\'s the large dining area near the main entrance with multiple food stalls.',
      'Look for the "South Food Court" signage.'
    ],
    'artease trcc': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Head towards the TRCC (Training & Research Competency Centre) building.',
      'Artease TRCC is located within the TRCC building.',
      'Look for the "Artease" signage at the food outlet.'
    ],
    'artease library': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Take the escalator or stairs to Level 2 towards the Library.',
      'Artease Library is located near the Library entrance.',
      'Look for the "Artease" signage at the food outlet.'
    ]
  };

  // Helper: get closest match for a location
  function findLocationKey(text) {
    text = text.toLowerCase();
    let best = null;
    let bestLen = 0;
    
    console.log('Searching for location in text:', text); // Debug log
    
    // Check for exact matches first (including compound terms like "lawn canteen")
    for (const key in navigationData) {
      if (text.includes(key) && key.length > bestLen) {
        best = key;
        bestLen = key.length;
        console.log('Found exact match in navigationData:', key); // Debug log
      }
    }
    
    for (const key in locations) {
      if (text.includes(key) && key.length > bestLen) {
        best = key;
        bestLen = key.length;
        console.log('Found exact match in locations:', key); // Debug log
      }
    }
    
    // If we found an exact match, return it
    if (best) {
      console.log('Returning exact match:', best); // Debug log
      return best;
    }
    
    // Create aliases for common search terms (only used when no exact match found)
    const aliases = {
      'canteen': ['south canteen', 'south food court', 'north canteen', 'lawn canteen'],
      'food court': ['south food court', 'north food court'],
      'cafeteria': ['south canteen', 'south food court'],
      'dining': ['south canteen', 'north canteen', 'lawn canteen', 'artease trcc', 'artease library'],
      'food': ['south canteen', 'north canteen', 'lawn canteen', 'artease trcc', 'artease library'],
      'eating': ['south canteen', 'north canteen', 'lawn canteen', 'artease trcc', 'artease library'],
      'artease': ['artease trcc', 'artease library']
    };
    
    // Check aliases only if no exact match was found
    for (const [alias, targets] of Object.entries(aliases)) {
      if (text.includes(alias)) {
        // Return the first target that has navigation data
        for (const target of targets) {
          if (navigationData[target]) {
            console.log('Found via alias:', alias, '->', target); // Debug log
            return target;
          }
        }
      }
    }
    
    console.log('Final best match:', best); // Debug log
    return best;
  }

  function getNavigationSteps(text) {
    // Check for "from X to Y" pattern
    const fromTo = text.match(/(?:from|start(?:ing)? at|begin(?:ning)? at)\s+([\w\s]+?)\s+(?:to|towards|and go to|go to|heading to|until)\s+([\w\s]+)/i);
    if (fromTo) {
      const fromRaw = fromTo[1].trim().toLowerCase();
      const toRaw = fromTo[2].trim().toLowerCase();
      const from = findLocationKey(fromRaw);
      const to = findLocationKey(toRaw);
      if (from && to) {
        // If from and to are the same
        if (from === to) {
          return [`You are already at ${from.toUpperCase()}.`];
        }
        // Step 1: Get from's last step (as a starting point)
        let steps = [];
        if (from === 'main entrance' || from === 'atrium') {
          steps = navigationData[to] || [];
        } else {
          // Guide to main entrance/atrium first, then to destination
          if (navigationData[from]) {
            steps = [...navigationData[from]];
          }
          if (to !== 'main entrance' && to !== 'atrium' && navigationData[to]) {
            steps.push('Then, from there:');
            steps = steps.concat(navigationData[to]);
          }
        }
        return steps;
      }
    }
    // Fallback: single location
    const single = findLocationKey(text);
    if (single) return navigationData[single];
    return null;
  }

  // --- Cross-Site Navigation Links ---
  const foodieFinderLinks = {
    'south canteen': '#south-food-court',
    'south food court': '#south-food-court',
    'north canteen': '#north-food-court',
    'north food court': '#north-food-court',
    'lawn canteen': '#lawn-canteen',
    'artease trcc': '#artease-trcc',
    'artease library': '#artease-library',
    'cafeteria': '#south-food-court'
  };

  // Function to create Foodie Finder link
  function createFoodieLink(locationName) {
    const hash = foodieFinderLinks[locationName.toLowerCase()];
    if (hash) {
      return `<div style="margin-top:0.8em;padding:0.6em;background:#f0fff0;border:1px solid #90ee90;border-radius:6px;"><span style="font-size:1.1em;">🍽️</span> <b>Want to see food options?</b><br><a href="https://c240-fa.onrender.com/${hash}" target="_blank" style="color:#228b22;text-decoration:underline;font-weight:600;">View ${locationName} in Foodie Finder →</a></div>`;
    }
    return '';
  }

  // --- Step-by-step Guides Data ---
  const stepByStepGuides = {
    'printing': {
      keywords: ['print', 'printing', 'printer', 'how to print'],
      title: 'How to Print Documents',
      steps: [
        'Go to any computer lab in W or E buildings (e.g., W1, W2, E1, E2).',
        'Log in to the computer using your student ID and password.',
        'Open your document and select "Print" from the File menu.',
        'Choose "FollowMe Printing" from the printer list.',
        'Click "Print" and your job will be queued.',
        'Go to any FollowMe printer station around campus.',
        'Tap your student card on the printer\'s card reader.',
        'Select your print job from the list and confirm printing.',
        'Collect your printed documents from the output tray.'
      ]
    },
    'booking': {
      keywords: ['book', 'booking', 'reserve', 'room booking', 'book a room', 'how to book'],
      title: 'How to Book a Room',
      steps: [
        'Access the RP Portal through your web browser.',
        'Log in using your student ID and password.',
        'Navigate to "Facilities" or "Room Booking" section.',
        'Select the type of room you need (study room, meeting room, etc.).',
        'Choose your preferred date and time slot.',
        'Check room availability and select an available slot.',
        'Fill in the booking details and purpose.',
        'Submit your booking request.',
        'Wait for confirmation email (usually within 1-2 hours).',
        'Bring your student ID to access the booked room.'
      ]
    },
    'wifi': {
      keywords: ['wifi', 'wi-fi', 'internet', 'connect wifi', 'wireless', 'network'],
      title: 'How to Connect to Campus WiFi',
      steps: [
        'Open your device\'s WiFi settings.',
        'Look for "RP-Student" network and select it.',
        'Enter your student ID as the username.',
        'Enter your student portal password.',
        'Accept any security certificates if prompted.',
        'You should now be connected to the campus WiFi.',
        'If you have issues, try "RP-Guest" for temporary access.',
        'For persistent problems, visit IT Help Desk at Level 1, Admin building.'
      ]
    },
    'library': {
      keywords: ['library access', 'borrow book', 'library hours', 'study area'],
      title: 'How to Use the Library',
      steps: [
        'Go to the Library on Level 2 (near the main entrance).',
        'Tap your student card at the entrance turnstiles.',
        'For borrowing books: locate the book using the online catalog.',
        'Bring books to the self-service kiosks or counter.',
        'Scan your student card and the book barcode.',
        'Books are typically due in 2 weeks (renewable online).',
        'For study areas: find available seats in quiet or discussion zones.',
        'Library hours: 8:30am - 9:00pm (check for holiday schedules).'
      ]
    },
    'parking': {
      keywords: ['parking', 'park car', 'car park', 'vehicle', 'parking lots'],
      title: 'Campus Parking Information',
      steps: [
        'Enter the campus through the main entrance at Woodlands Avenue 9.',
        'Follow signs to the multi-story car park on your right.',
        'Take a parking ticket at the entrance gantry.',
        'Find an available lot (green lots are for short-term parking).',
        'Note your parking location for easy retrieval.',
        'Pay at the parking machines before returning to your car.',
        'Payment methods: NETS, credit card, or cash.',
        'Parking rates: $1.20/hour, max $8/day for students.',
        'Validate your ticket within 15 minutes of payment.'
      ]
    }
  };

  // --- Chatbot Task Detection and Processing ---
  const ChatbotProcessor = {
    // Detect what type of task the user is asking about
    detectTaskType: function(input) {
      try {
        const cleanInput = input.toLowerCase().trim();
        
        // Check if it's a classroom code
        if (this.isClassroomCode(input)) {
          return 'classroom_code';
        }
        
        // Check if it's a navigation request
        if (this.isNavigationRequest(cleanInput)) {
          return 'navigation';
        }
        
        // Check if it's a step-by-step guide request
        const guideType = this.getGuideType(cleanInput);
        if (guideType) {
          return { type: 'guide', subtype: guideType };
        }
        
        // Check for greetings
        if (this.isGreeting(cleanInput)) {
          return 'greeting';
        }
        
        return 'unknown';
      } catch (error) {
        console.error('Error detecting task type:', error);
        return 'error';
      }
    },

    // Check if input is a classroom code format
    isClassroomCode: function(input) {
      const codeRegex = /^[WE]\d+[A-Z]$/i;
      return codeRegex.test(input.trim());
    },

    // Check if input is a navigation request
    isNavigationRequest: function(input) {
      const navigationKeywords = [
        'how do i get to', 'where is', 'direction to', 'way to', 'find',
        'location of', 'how to go to', 'navigate to', 'go to', 'get to'
      ];
      
      // Also check if the input contains any known location names
      const locationTerms = [
        'canteen', 'cafeteria', 'food court', 'dining', 'library', 'admin', 'artease',
        'w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6',
        'sports complex', 'agora', 'main entrance', 'trcc'
      ];
      
      const hasNavigationKeyword = navigationKeywords.some(keyword => input.includes(keyword));
      const hasLocationTerm = locationTerms.some(term => input.includes(term));
      
      // If it has a location term, treat it as navigation request
      return hasNavigationKeyword || hasLocationTerm;
    },

    // Check if input is asking for a step-by-step guide
    getGuideType: function(input) {
      for (const [guideKey, guide] of Object.entries(stepByStepGuides)) {
        if (guide.keywords.some(keyword => input.includes(keyword))) {
          return guideKey;
        }
      }
      return null;
    },

    // Check if input is a greeting
    isGreeting: function(input) {
      return /\b(hello|hi|hey|good morning|good afternoon|good evening)\b/.test(input);
    },

    // Process classroom code validation
    processClassroomCode: function(code) {
      try {
        const validBuildings = ["W1", "W2", "W3", "W4", "W5", "W6", "E1", "E2", "E3", "E4", "E5", "E6"];
        const maxFloors = {
          "W1": 7, "W2": 7, "W3": 7, "W4": 8, "W5": 7, "W6": 8,
          "E1": 5, "E2": 7, "E3": 8, "E4": 7, "E5": 7, "E6": 7
        };
        const validRoomLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Q", "R"];

        const building = code.slice(0, 2).toUpperCase();
        const floor = parseInt(code.slice(2, -1), 10);
        const roomLetter = code.slice(-1).toUpperCase();

        // Validate building
        if (!validBuildings.includes(building)) {
          return {
            isValid: false,
            message: `❌ <b>Invalid building "${building}"</b><br>Valid buildings: ${validBuildings.join(', ')}`
          };
        }

        // Validate floor
        if (!maxFloors[building] || floor < 1 || floor > maxFloors[building]) {
          return {
            isValid: false,
            message: `❌ <b>Invalid floor "${floor}" for building ${building}</b><br>Valid floors for ${building}: 1-${maxFloors[building]}`
          };
        }

        // Validate room letter
        if (!validRoomLetters.includes(roomLetter)) {
          return {
            isValid: false,
            message: `❌ <b>Invalid room letter "${roomLetter}"</b><br>Valid letters: ${validRoomLetters.join(', ')}`
          };
        }

        return {
          isValid: true,
          message: `✅ <b>Valid classroom code: ${code.toUpperCase()}</b><br>Building: ${building}, Floor: ${floor}, Room: ${roomLetter}`
        };
      } catch (error) {
        console.error('Error validating classroom code:', error);
        return {
          isValid: false,
          message: '❌ Error validating classroom code. Please try again.'
        };
      }
    },

    // Process step-by-step guide request
    processGuide: function(guideType) {
      try {
        const guide = stepByStepGuides[guideType];
        if (!guide) {
          return 'Guide not found.';
        }

        let html = `<b>📋 ${guide.title}</b><ol style="margin:0.5em 0 0 1.2em;color:#228b22;font-size:1em;">`;
        guide.steps.forEach(step => html += `<li>${step}</li>`);
        html += '</ol>';
        html += '<div style="margin-top:0.5em;font-size:0.95em;color:#666;">💡 Need more help? Visit the IT Help Desk or ask campus staff.</div>';
        return html;
      } catch (error) {
        console.error('Error processing guide:', error);
        return '❌ Error loading guide. Please try again.';
      }
    },

    // Process navigation request
    processNavigation: function(input) {
      try {
        const steps = getNavigationSteps(input);
        if (steps) {
          let html = '<b>🗺️ Here\'s how to get there:</b><ol style="margin:0.5em 0 0 1.2em;color:#228b22;font-size:1em;">';
          steps.forEach(step => html += `<li>${step}</li>`);
          html += '</ol>';
          html += '<div style="margin-top:0.5em;font-size:0.95em;">📍 Refer to the <b>campus map</b> or <a href="https://maps.google.com/?q=Republic+Polytechnic" target="_blank" style="color:#228b22;text-decoration:underline;">Google Maps</a> for more details.</div>';
          
          // Check if this is a food-related location and add Foodie Finder link
          const locationKey = findLocationKey(input);
          console.log('Found location key:', locationKey); // Debug log
          console.log('Available foodie links:', Object.keys(foodieFinderLinks)); // Debug log
          
          if (locationKey && foodieFinderLinks[locationKey]) {
            const locationName = locations[locationKey]?.name || locationKey;
            console.log('Creating foodie link for:', locationName); // Debug log
            html += createFoodieLink(locationName);
          }
          
          return html;
        }
        return null;
      } catch (error) {
        console.error('Error processing navigation:', error);
        return '❌ Error getting directions. Please try again.';
      }
    },

    // Main response processor
    getResponse: function(input) {
      try {
        const taskType = this.detectTaskType(input);

        switch (taskType) {
          case 'classroom_code':
            const validation = this.processClassroomCode(input);
            if (validation.isValid) {
              // Also provide navigation to the building
              const building = input.slice(0, 2).toLowerCase();
              const navigation = this.processNavigation(`how to get to ${building}`);
              return validation.message + (navigation ? '<br><br>' + navigation : '');
            }
            return validation.message;

          case 'navigation':
            const navResponse = this.processNavigation(input);
            return navResponse || 'Sorry, I couldn\'t find directions for that location. Try asking for specific buildings like "E4" or "library".';

          case 'greeting':
            return '👋 Hello! I\'m your campus assistant. I can help you with:<br>• <b>Navigation</b>: "How do I get to E4?"<br>• <b>Classroom codes</b>: "W14K"<br>• <b>Campus guides</b>: "How to print", "How to book a room"<br>• <b>WiFi help</b>, <b>Library info</b>, <b>Parking</b>, and more!';

          default:
            if (typeof taskType === 'object' && taskType.type === 'guide') {
              return this.processGuide(taskType.subtype);
            }
            return '🤔 I\'m not sure how to help with that. Try asking about:<br>• Building locations (e.g., "Where is E4?")<br>• Classroom codes (e.g., "W14K")<br>• Campus services: "How to print", "How to book a room", "WiFi help"<br>• Or just say "hello" to see all my features!';
        }
      } catch (error) {
        console.error('Error getting chatbot response:', error);
        return '❌ Sorry, something went wrong. Please try again or contact IT support if the problem persists.';
      }
    }
  };

  // Legacy function for backward compatibility
  function getChatbotResponse(input) {
    return ChatbotProcessor.getResponse(input);
  }

  // --- Save all user queries to historyPaths for history.html ---
  let historyPaths = JSON.parse(localStorage.getItem('historyPaths') || '[]');
  
  if (chatbotForm) {
    chatbotForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('chatbot-input');
      const text = input.value.trim();
      if (!text) return;
      
      addMessage(text, 'user');
      input.value = '';

      try {
        // Save to history for non-greeting queries
        const taskType = ChatbotProcessor.detectTaskType(text);
        if (taskType !== 'greeting' && taskType !== 'error') {
          // For classroom codes, save both the query and response for history
          if (taskType === 'classroom_code') {
            const validation = ChatbotProcessor.processClassroomCode(text);
            if (validation.isValid) {
              // Save the valid classroom code query
              if (!historyPaths.includes(text)) {
                historyPaths.push(text);
                localStorage.setItem('historyPaths', JSON.stringify(historyPaths));
              }
            }
          } else {
            // Save other valid queries
            if (!historyPaths.includes(text)) {
              historyPaths.push(text);
              localStorage.setItem('historyPaths', JSON.stringify(historyPaths));
            }
          }
        }

        // Show typing indicator
        showTyping();
        
        // Process the message and get response
        setTimeout(() => {
          try {
            hideTyping();
            const response = getChatbotResponse(text);
            addMessage(response, 'bot', true);
          } catch (error) {
            console.error('Error processing chatbot response:', error);
            hideTyping();
            addMessage('❌ Sorry, I encountered an error. Please try again or rephrase your question.', 'bot', true);
          }
        }, 500 + Math.random() * 400);

      } catch (error) {
        console.error('Error in form submission:', error);
        addMessage('❌ Sorry, something went wrong. Please try again.', 'bot', true);
      }
    });
  }

  // --- Typing Dots Animation ---
  const style = document.createElement('style');
  style.innerHTML = `.dot { display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#32cd32;animation:dotty 1s infinite alternate; }
  .dot:nth-child(2){animation-delay:0.2s;}.dot:nth-child(3){animation-delay:0.4s;}@keyframes dotty{from{opacity:0.3;}to{opacity:1;}}`;
  document.head.appendChild(style);

  // --- Fun Sound Effect on Send ---
  function playSendSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = 660;
      g.gain.value = 0.08;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); ctx.close(); }, 120);
    } catch (e) {
      console.log('Audio not supported');
    }
  }
  if (chatbotForm) chatbotForm.addEventListener('submit', playSendSound);


  // Remove Back to Home Button if present
  const oldBackBtn = document.querySelector('a[href="http://127.0.0.1:5500/index.html"]');
  if (oldBackBtn) oldBackBtn.remove();
});