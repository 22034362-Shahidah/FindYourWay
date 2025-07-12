// Campus Navigation App
document.addEventListener('DOMContentLoaded', function () {
  // Remove any leftover header or facility links if present
  const oldHeader = document.getElementById('campus-header');
  if (oldHeader) oldHeader.remove();
  
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');

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
    }
  };

  // Sample opening hours
  const openingHours = {
    "cafeteria": "7:30am - 7:00pm",
    "south food court": "7:30am - 7:00pm",
    "north canteen": "8:00am - 6:00pm",
    "lawn canteen": "8:00am - 5:00pm",
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
    // Welcome overlay logic
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
    addMessage('<span style="font-size:1.3em;">👋</span> Hi! I\'m your campus guide. <br>Try asking:<ul style="margin:0.5em 0 0 1.2em;padding:0;list-style:square;color:#228b22;font-size:0.98em;"><li>How do I get to E4?</li><li>How do I go to the library?</li><li>Classroom codes like W14K</li></ul>', 'bot', true);
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
      'Block E1 will be the first building on your right as you enter the E block (yellow section on the map).',
      'Look for the E1 signage above the entrance.'
    ],
    'e2': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1, continue straight. E2 is the next building on your right (yellow section on the map).',
      'Look for the E2 signage above the entrance.'
    ],
    'e3': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1 and E2, continue straight. E3 is the third building on your right (yellow section on the map).',
      'Look for the E3 signage above the entrance.'
    ],
    'e4': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'After passing E1, E2, and E3, continue straight. E4 is on your left (green section on the map), just before E5.',
      'Look for the E4 signage above the entrance.'
    ],
    'e5': [
      'Enter through the main entrance and walk straight into the Atrium.',
      'Continue past the information counter and central garden, following signs to Block E.',
      'Walk past E1, E2, E3, and E4. E5 is the last building at the end of Block E (orange section on the map), on your left.',
      'Look for the E5 signage above the entrance.'
    ],
    'w1': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'W1 is the first building on your left in the W block (blue section on the map).',
      'Look for the W1 signage above the entrance.'
    ],
    'w2': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1, continue straight. W2 is the next building on your left (blue section on the map).',
      'Look for the W2 signage above the entrance.'
    ],
    'w3': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1 and W2, continue straight. W3 is the third building on your left (blue section on the map).',
      'Look for the W3 signage above the entrance.'
    ],
    'w4': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'After passing W1, W2, and W3, continue straight. W4 is the fourth building on your left (blue section on the map).',
      'Look for the W4 signage above the entrance.'
    ],
    'w5': [
      'Enter through the main entrance and turn left at the information counter in the Atrium.',
      'Follow the signs to Block W, passing the Student Hub and the central garden on your right.',
      'Walk past W1, W2, W3, and W4. W5 is the last building at the end of Block W (purple section on the map), on your left.',
      'Look for the W5 signage above the entrance.'
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
    ]
  };

  // Helper: get closest match for a location
  function findLocationKey(text) {
    text = text.toLowerCase();
    let best = null;
    let bestLen = 0;
    for (const key in navigationData) {
      if (text.includes(key) && key.length > bestLen) {
        best = key;
        bestLen = key.length;
      }
    }
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

  // --- Classroom Code Validation Logic ---
  function validateClassroomCode(code) {
    const validBuildings = ["W1", "W2", "W3", "W4", "W5", "W6", "E1", "E2", "E3", "E4", "E5", "E6"];
    const maxFloors = {
      "W1": 7, "W2": 7, "W3": 7, "W4": 8, "W5": 7, "W6": 8,
      "E1": 5, "E2": 7, "E3": 8, "E4": 7, "E5": 7, "E6": 7
    };
    const validRoomLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Q", "R"]; // Excludes O, P, S, T, U, V, W, X, Y, Z

    // Check if input matches classroom code format (e.g., W14K)
    const codeRegex = /^[WE]\d+[A-Z]$/i;
    if (!codeRegex.test(code)) {
      return null; // Not a classroom code format
    }

    const building = code.slice(0, 2).toUpperCase();
    const floor = parseInt(code.slice(2, -1), 10);
    const roomLetter = code.slice(-1).toUpperCase();

    console.log("Validating classroom code:", code);
    console.log("Extracted building:", building);
    console.log("Extracted floor:", floor);
    console.log("Extracted room letter:", roomLetter);

    if (!validBuildings.includes(building)) {
      console.log("Invalid building detected:", building);
      return "Building invalid, try again.";
    }

    if (!maxFloors[building] || floor < 1 || floor > maxFloors[building]) {
      console.log("Invalid floor detected for building:", building, "Floor:", floor);
      return "Floor invalid, try again.";
    }

    if (!validRoomLetters.includes(roomLetter)) {
      console.log("Invalid room letter detected:", roomLetter);
      return "Room letter invalid, try again.";
    }

    console.log("Code validated successfully:", code);
    return "Valid classroom code.";
  }

  function getChatbotResponse(input) {
    const steps = getNavigationSteps(input);
    if (steps) {
      let html = '<b>Here\'s how to get there:</b><ol style="margin:0.5em 0 0 1.2em;color:#228b22;font-size:1em;">';
      steps.forEach(step => html += `<li>${step}</li>`);
      html += '</ol>';
      html += '<div style="margin-top:0.5em;font-size:0.95em;">Refer to the <b>campus map</b> on the left or <a href="https://maps.google.com/?q=Republic+Polytechnic" target="_blank" style="color:#228b22;text-decoration:underline;">Google Maps</a> for more details.</div>';
      return html;
    }
    if (/hello|hi|hey/.test(input.toLowerCase())) {
      return 'Hello! How can I help you find your way around campus?';
    }
    return 'Sorry, I didn\'t get that. Try asking "How do I get to E4?" or enter a classroom code like "W14K".';
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

      // Check if input is a classroom code
      const validationResult = validateClassroomCode(text);
      if (validationResult) {
        if (validationResult === "Valid classroom code.") {
          addMessage(validationResult, 'bot');
          // Generate directions for valid classroom codes
          setTimeout(() => {
            const response = getChatbotResponse(text);
            addMessage(response, 'bot', true);
          }, 500);
        } else {
          // Invalid classroom code
          addMessage(validationResult, 'bot');
          return;
        }
      } else {
        // Regular chatbot response for non-classroom queries
        // Save to history
        if (!historyPaths.includes(text)) {
          historyPaths.push(text);
          localStorage.setItem('historyPaths', JSON.stringify(historyPaths));
        }
        showTyping();
        setTimeout(() => {
          hideTyping();
          const response = getChatbotResponse(text);
          addMessage(response, 'bot', true);
        }, 700 + Math.random() * 600);
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