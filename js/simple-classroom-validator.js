// Active Classroom Validation - Direct Input Monitoring
(function() {
    'use strict';

    console.log('🏫 Active Classroom Validator Loading...');

    // Validation logic - Updated to match campus-chatbot-knowledge.txt patterns
    function validateClassroom(code) {
        const normalizedCode = code.toUpperCase().trim();
        
        // Pattern 1: W67E style (Building + Floor + Room Letter)
        const pattern1 = normalizedCode.match(/^([WE])(\d)(\d)([A-Z])$/);
        if (pattern1) {
            const [, buildingLetter, buildingNum, floor, roomLetter] = pattern1;
            const building = buildingLetter + buildingNum;
            
            const validBuildings = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
            const floorLimits = {
                'W1': 7, 'W2': 8, 'W3': 8, 'W4': 8, 'W5': 8, 'W6': 7,
                'E1': 5, 'E2': 7, 'E3': 8, 'E4': 8, 'E5': 7, 'E6': 8
            };
            const validRoomLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R'];
            
            if (!validBuildings.includes(building)) {
                return `❌ Invalid building "${building}". Valid buildings: W1-W6, E1-E6`;
            }
            if (parseInt(floor) < 1 || parseInt(floor) > floorLimits[building]) {
                return `❌ Invalid floor "${floor}" for ${building}. Valid floors: 1-${floorLimits[building]}`;
            }
            if (!validRoomLetters.includes(roomLetter)) {
                return `❌ Invalid room letter "${roomLetter}". Valid letters: A-R (excluding O,P,S,T,U,V,W,X,Y,Z)`;
            }
            
            return `✅ Valid classroom code: ${normalizedCode}
Building: ${building}, Floor: ${floor}, Room: ${roomLetter}

🗺️ Here's how to get there:
${getDirections(building, normalizedCode)}`;
        }
        
        // Pattern 2: E62 style (Building Letter + Floor + Room Number)
        const pattern2 = normalizedCode.match(/^([WE])(\d)(\d+)$/);
        if (pattern2) {
            const [, buildingLetter, floor, roomNum] = pattern2;
            
            if (buildingLetter === 'W') {
                return `❌ W buildings use format like W67E (W + building# + floor + room letter)`;
            }
            
            if (parseInt(floor) < 1 || parseInt(floor) > 8) {
                return `❌ Invalid floor "${floor}" for E buildings. Valid floors: 1-8`;
            }
            
            return `✅ Valid classroom code: ${normalizedCode}
Building: Block E, Floor: ${floor}, Classroom: ${roomNum}

🧭 Directions to classroom ${normalizedCode}:
1. Enter through the main entrance and walk past the Atrium.
2. Look for signs leading to Block E.
3. Use the lift or stairs to go to Floor ${floor}.
4. Classroom ${roomNum} will be clearly labelled along the corridor.`;
        }
        
        // Pattern 3: Standard format like W1A, E2B, etc.
        const pattern3 = normalizedCode.match(/^([WE])(\d{1,2})([A-Z])$/);
        if (pattern3) {
            const [, buildingPrefix, buildingNum, roomLetter] = pattern3;
            const building = buildingPrefix + buildingNum;
            
            const validBuildings = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
            const validRoomLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R'];
            
            if (!validBuildings.includes(building)) {
                return `❌ Invalid building "${building}". Valid buildings: W1-W6, E1-E6`;
            }
            if (!validRoomLetters.includes(roomLetter)) {
                return `❌ Invalid room letter "${roomLetter}". Valid letters: A-R (excluding O,P,S,T,U,V,W,X,Y,Z)`;
            }
            
            return `✅ Valid classroom code: ${normalizedCode}
Building: ${building}, Room: ${roomLetter}

🗺️ Navigation:
${getDirections(building, normalizedCode)}`;
        }
        
        return `❌ Invalid classroom code format. 
Valid formats:
• W67E (W building + floor + room letter)
• E62 (E building + floor + room number)  
• W1A (W/E + building number + room letter)`;
    }

    // Get directions based on building
    function getDirections(building, classroom) {
        const directions = {
            'W1': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W. W1 is the first building in Block W.',
            'W2': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W. W2 is the second building in Block W.',
            'W3': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W. W3 is the third building in Block W.',
            'W4': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W. W4 is the fourth building in Block W.',
            'W5': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W. W5 is the fifth building in Block W.',
            'W6': '1. Enter through the main entrance and turn left at the information counter in the Atrium.\n2. Follow the signs to Block W, passing the Student Hub and the central garden on your right.\n3. Walk past W1, W2, W3, W4, and W5. W6 is the last building at the end of Block W, near the North Canteen.\n4. Look for the W6 signage above the entrance.',
            'E1': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E1 is the first building in Block E.',
            'E2': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E2 is the second building in Block E.',
            'E3': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E3 is the third building in Block E.',
            'E4': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E4 is the fourth building in Block E.',
            'E5': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E5 is the fifth building in Block E.',
            'E6': '1. Enter through the main entrance and walk past the Atrium.\n2. Look for signs leading to Block E. E6 is the sixth building in Block E.'
        };
        
        return directions[building] || '1. Enter through the main entrance.\n2. Follow campus signs to the appropriate block.\n3. Use lifts or stairs to reach your floor.\n4. Look for room signage along the corridors.';
    }

    // Updated pattern matching for all formats
    function isClassroomCode(text) {
        const trimmed = text.trim().toUpperCase();
        return /^[WE]\d{1,2}[A-Z]$/.test(trimmed) ||  // W1A, E2B format
               /^[WE]\d\d[A-Z]$/.test(trimmed) ||     // W67E format  
               /^[WE]\d\d+$/.test(trimmed);           // E62 format
    }

    // Show validation result
    function showResult(message) {
        console.log('🏫 SHOWING VALIDATION RESULT:', message);
        
        // Remove any existing notification
        const existing = document.getElementById('classroom-notification');
        if (existing) existing.remove();

        // Create a prominent notification
        const notification = document.createElement('div');
        notification.id = 'classroom-notification';
        notification.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: white !important;
            border: 4px solid #32cd32 !important;
            border-radius: 16px !important;
            padding: 30px !important;
            max-width: 500px !important;
            width: 90% !important;
            z-index: 999999 !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4) !important;
            font-family: Arial, sans-serif !important;
            text-align: center !important;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 24px; margin-right: 12px;">🏫</span>
                <h2 style="margin: 0; color: #228b22; font-size: 20px;">CLASSROOM VALIDATION</h2>
            </div>
            <div style="color: #333; font-size: 16px; line-height: 1.6; white-space: pre-line; margin-bottom: 20px;">
                ${message}
            </div>
            <button onclick="document.getElementById('classroom-notification').remove()" style="
                background: #32cd32 !important;
                color: white !important;
                border: none !important;
                border-radius: 8px !important;
                padding: 12px 24px !important;
                font-size: 16px !important;
                cursor: pointer !important;
                font-weight: bold !important;
            ">OK</button>
        `;

        document.body.appendChild(notification);

        // Also show alert as backup
        setTimeout(() => {
            alert('🏫 CLASSROOM VALIDATION\n\n' + message);
        }, 500);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    // Process validation
    function processValidation(code) {
        console.log('🔍 Processing classroom code:', code);
        const result = validateClassroom(code);
        showResult(result);
    }

    // Active monitoring with multiple methods
    function setupActiveMonitoring() {
        console.log('🔍 Setting up active monitoring...');

        // Method 1: Direct input event listeners
        function attachToInputs() {
            const inputs = document.querySelectorAll('input[type="text"], textarea, input:not([type])');
            inputs.forEach(input => {
                if (!input.dataset.validatorAttached) {
                    input.dataset.validatorAttached = 'true';
                    
                    // Listen for input changes
                    input.addEventListener('input', function(e) {
                        const value = e.target.value.trim();
                        if (isClassroomCode(value)) {
                            console.log('📝 Classroom code detected in input:', value);
                            setTimeout(() => processValidation(value), 100);
                        }
                    });

                    // Listen for Enter key
                    input.addEventListener('keydown', function(e) {
                        if (e.key === 'Enter') {
                            const value = e.target.value.trim();
                            if (isClassroomCode(value)) {
                                console.log('⏎ Classroom code submitted:', value);
                                processValidation(value);
                            }
                        }
                    });

                    console.log('✅ Attached to input:', input);
                }
            });
        }

        // Method 2: Continuous scanning
        function continuousScanning() {
            const inputs = document.querySelectorAll('input[type="text"], textarea, input:not([type])');
            inputs.forEach(input => {
                const value = input.value.trim();
                if (value && isClassroomCode(value)) {
                    const lastProcessed = input.dataset.lastProcessed;
                    if (lastProcessed !== value) {
                        input.dataset.lastProcessed = value;
                        console.log('🔄 Continuous scan found:', value);
                        processValidation(value);
                    }
                }
            });
        }

        // Method 3: Global keypress monitoring
        function setupGlobalKeypress() {
            let typedSequence = '';
            
            document.addEventListener('keydown', function(e) {
                // Build sequence of typed characters
                if (e.key.length === 1) { // Single character
                    typedSequence += e.key;
                    
                    // Keep only last 10 characters
                    if (typedSequence.length > 10) {
                        typedSequence = typedSequence.slice(-10);
                    }
                    
                    // Check for classroom codes in the sequence
                    const matches = typedSequence.match(/[WE]\d{1,2}[A-Z]/gi);
                    if (matches) {
                        const lastMatch = matches[matches.length - 1];
                        if (isClassroomCode(lastMatch)) {
                            console.log('⌨️ Global keypress detected:', lastMatch);
                            processValidation(lastMatch);
                            typedSequence = ''; // Reset
                        }
                    }
                } else if (e.key === 'Enter') {
                    // Check if sequence ends with classroom code
                    const trimmed = typedSequence.trim();
                    if (isClassroomCode(trimmed)) {
                        console.log('� Enter pressed with classroom code:', trimmed);
                        processValidation(trimmed);
                    }
                    typedSequence = ''; // Reset on Enter
                }
            });
        }

        // Initialize all methods
        attachToInputs();
        setupGlobalKeypress();

        // Run attachment and scanning regularly
        setInterval(attachToInputs, 2000);
        setInterval(continuousScanning, 1000);

        console.log('✅ All monitoring methods active');
    }

    // Test function - can be called from console
    window.testClassroomValidation = function(code) {
        console.log('🧪 Testing validation for:', code);
        if (isClassroomCode(code)) {
            processValidation(code);
        } else {
            console.log('❌ Not a valid classroom code format');
        }
    };

    // Initialize
    function init() {
        setupActiveMonitoring();
        console.log('✅ Active Classroom Validator Ready');
        console.log('💡 Test with: testClassroomValidation("W1A")');
        
        // Show ready notification
        setTimeout(() => {
            console.log('🎯 Validator is now monitoring all inputs. Type a classroom code like W1A, E2B, etc.');
        }, 1000);
    }

    // Start immediately and also on DOM ready
    init();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
