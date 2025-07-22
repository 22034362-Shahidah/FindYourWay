// IMMEDIATE CLASSROOM VALIDATION FOR BOTPRESS
// This script intercepts classroom codes INSTANTLY before they reach Botpress

(function() {
    'use strict';

    console.log('🚀 IMMEDIATE CLASSROOM VALIDATOR STARTING...');

    // Validation system inline
    const validator = {
        processClassroomCode: function(code) {
            const validBuildings = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
            const floorLimits = {
                'W1': 7, 'W2': 8, 'W3': 8, 'W4': 8, 'W5': 8, 'W6': 7,
                'E1': 5, 'E2': 7, 'E3': 8, 'E4': 8, 'E5': 7, 'E6': 8
            };
            const validRoomLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R'];

            const building = code.slice(0, 2).toUpperCase();
            const floorStr = code.slice(2, -1);
            const roomLetter = code.slice(-1).toUpperCase();
            const floor = parseInt(floorStr);

            if (!validBuildings.includes(building)) {
                return { isValid: false, message: `❌ Invalid building "${building}". Valid buildings: W1-W6, E1-E6` };
            }
            if (isNaN(floor) || floor < 1 || floor > floorLimits[building]) {
                return { isValid: false, message: `❌ Invalid floor "${floor}" for ${building}. Valid floors: 1-${floorLimits[building]}` };
            }
            if (!validRoomLetters.includes(roomLetter)) {
                return { isValid: false, message: `❌ Invalid room letter "${roomLetter}". Valid letters: A-R (excluding O,P,S,T,U,V,W,X,Y,Z)` };
            }

            return { 
                isValid: true, 
                message: `✅ Valid classroom: ${code}\n📍 Building: ${building}, Floor: ${floor}, Room: ${roomLetter}\n🚶 From main entrance: Go to ${building} building, take elevator/stairs to floor ${floor}, find room ${code}` 
            };
        }
    };

    // Check if text is a classroom code
    function isClassroomCode(text) {
        return /^[WE]\d{1,2}[A-Z]$/i.test(text.trim());
    }

    // Process validation and show result
    function processValidation(code) {
        console.log('🏫 Processing classroom code:', code);
        const result = validator.processClassroomCode(code.toUpperCase());
        
        // Show result immediately
        showValidationResult(result.message);
        
        return true; // Always block the message
    }

    // Show validation result with multiple methods
    function showValidationResult(message) {
        console.log('� VALIDATION RESULT:', message);

        // Method 1: Immediate alert (always works)
        setTimeout(() => {
            alert('🏫 CLASSROOM VALIDATION\n\n' + message);
        }, 100);

        // Method 2: Large modal overlay
        showModal(message);

        // Method 3: Try to inject into Botpress
        injectIntoBotpress(message);
    }

    function showModal(message) {
        // Remove existing modal
        const existing = document.getElementById('classroom-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'classroom-modal';
        modal.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.7) !important;
            z-index: 999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        `;

        modal.innerHTML = `
            <div style="
                background: white !important;
                border: 4px solid #32cd32 !important;
                border-radius: 16px !important;
                padding: 30px !important;
                max-width: 500px !important;
                width: 90% !important;
                text-align: center !important;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3) !important;
            ">
                <h2 style="margin: 0 0 20px 0 !important; color: #228b22 !important; font-size: 24px !important;">
                    🏫 CLASSROOM VALIDATION
                </h2>
                <div style="font-size: 16px !important; line-height: 1.6 !important; color: #333 !important; white-space: pre-line !important;">
                    ${message}
                </div>
                <button onclick="document.getElementById('classroom-modal').remove()" style="
                    margin-top: 20px !important;
                    background: #32cd32 !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 8px !important;
                    padding: 12px 24px !important;
                    font-size: 16px !important;
                    cursor: pointer !important;
                    font-weight: bold !important;
                ">OK</button>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentElement) modal.remove();
        }, 10000);
    }

    function injectIntoBotpress(message) {
        // Try to find Botpress chat and inject message
        const chatSelectors = [
            '.bpw-message-list',
            '.bpw-messages',
            '.bpw-chat-container',
            '#bp-widget'
        ];

        for (const selector of chatSelectors) {
            const container = document.querySelector(selector);
            if (container) {
                const msgDiv = document.createElement('div');
                msgDiv.style.cssText = `
                    background: #f0f8f0 !important;
                    border: 2px solid #32cd32 !important;
                    border-radius: 12px !important;
                    padding: 16px !important;
                    margin: 8px !important;
                    color: #2d5a2d !important;
                    font-weight: bold !important;
                `;
                msgDiv.innerHTML = `🏫 ${message.replace(/\n/g, '<br>')}`;
                container.appendChild(msgDiv);
                container.scrollTop = container.scrollHeight;
                break;
            }
        }
    }

    // IMMEDIATE GLOBAL EVENT CAPTURE
    function setupGlobalCapture() {
        // Capture ALL keydown events
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                // Check all input fields
                const inputs = document.querySelectorAll('input[type="text"], textarea');
                inputs.forEach(input => {
                    const value = input.value.trim();
                    if (isClassroomCode(value)) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        input.value = '';
                        processValidation(value);
                    }
                });
            }
        }, true); // Use capture phase

        // Monitor all form submissions
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const inputs = form.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
                const value = input.value.trim();
                if (isClassroomCode(value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    input.value = '';
                    processValidation(value);
                }
            });
        }, true);

        // Monitor all button clicks
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.type === 'submit') {
                // Check nearby inputs
                const container = e.target.closest('form') || e.target.parentElement;
                if (container) {
                    const inputs = container.querySelectorAll('input[type="text"], textarea');
                    inputs.forEach(input => {
                        const value = input.value.trim();
                        if (isClassroomCode(value)) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            input.value = '';
                            processValidation(value);
                        }
                    });
                }
            }
        }, true);

        console.log('✅ Global capture active');
    }

    // Override network requests
    function overrideNetwork() {
        // Override fetch
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (options && options.body) {
                let bodyText = options.body;
                if (typeof bodyText === 'string') {
                    // Check for classroom codes in request body
                    const match = bodyText.match(/[WE]\d{1,2}[A-Z]/i);
                    if (match && isClassroomCode(match[0])) {
                        console.log('🚫 Blocked fetch with classroom code:', match[0]);
                        processValidation(match[0]);
                        return Promise.resolve(new Response('{}'));
                    }
                }
            }
            return originalFetch.apply(this, arguments);
        };

        // Override XMLHttpRequest
        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(data) {
            if (data && typeof data === 'string') {
                const match = data.match(/[WE]\d{1,2}[A-Z]/i);
                if (match && isClassroomCode(match[0])) {
                    console.log('🚫 Blocked XHR with classroom code:', match[0]);
                    processValidation(match[0]);
                    return;
                }
            }
            return originalSend.apply(this, arguments);
        };

        console.log('✅ Network override active');
    }

    // Monitor input fields continuously
    function monitorInputs() {
        setInterval(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
                const value = input.value.trim();
                if (value && isClassroomCode(value)) {
                    console.log('👀 Found classroom code in input:', value);
                    // Don't clear immediately, wait for user action
                }
            });
        }, 500);
    }

    // Initialize everything IMMEDIATELY
    setupGlobalCapture();
    overrideNetwork();
    monitorInputs();

    console.log('🎯 IMMEDIATE CLASSROOM VALIDATOR READY - Type any classroom code and press Enter!');

})();

    function createInlineValidationSystem() {
        return {
            processClassroomCode: function(code) {
                const validBuildings = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'];
                const floorLimits = {
                    'W1': 7, 'W2': 8, 'W3': 8, 'W4': 8, 'W5': 8, 'W6': 7,
                    'E1': 5, 'E2': 7, 'E3': 8, 'E4': 8, 'E5': 7, 'E6': 8
                };
                const validRoomLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Q', 'R'];

                const building = code.slice(0, 2).toUpperCase();
                const floorStr = code.slice(2, -1);
                const roomLetter = code.slice(-1).toUpperCase();
                const floor = parseInt(floorStr);

                if (!validBuildings.includes(building)) {
                    return { isValid: false, message: `❌ Invalid building "${building}". Valid buildings: W1-W6, E1-E6` };
                }
                if (isNaN(floor) || floor < 1 || floor > floorLimits[building]) {
                    return { isValid: false, message: `❌ Invalid floor "${floor}" for ${building}. Valid floors: 1-${floorLimits[building]}` };
                }
                if (!validRoomLetters.includes(roomLetter)) {
                    return { isValid: false, message: `❌ Invalid room letter "${roomLetter}". Valid letters: A-R (excluding O,P,S,T,U,V,W,X,Y,Z)` };
                }

                return { 
                    isValid: true, 
                    message: `✅ Valid classroom: ${code}<br>📍 Building: ${building}, Floor: ${floor}, Room: ${roomLetter}` 
                };
            },
            processNavigation: function(query) {
                const building = query.match(/[we]\d+/i)?.[0]?.toLowerCase();
                const directions = {
                    'w1': 'From main entrance: Go straight, turn left at the junction, W1 building will be on your right.',
                    'w2': 'From main entrance: Go straight, W2 building will be directly ahead.',
                    'w3': 'From main entrance: Go straight, turn right, W3 building will be on your left.',
                    'w4': 'From main entrance: Go straight, continue past W2, W4 building will be on your right.',
                    'w5': 'From main entrance: Go straight, turn left after W2, W5 building will be ahead.',
                    'w6': 'From main entrance: Go straight, turn right after W3, W6 building will be at the end.',
                    'e1': 'From main entrance: Turn right immediately, E1 building will be on your left.',
                    'e2': 'From main entrance: Turn right, continue straight, E2 building will be ahead.',
                    'e3': 'From main entrance: Turn right, turn left at first junction, E3 building will be on your right.',
                    'e4': 'From main entrance: Turn right, continue past E2, E4 building will be on your left.',
                    'e5': 'From main entrance: Turn right, turn left at second junction, E5 building will be ahead.',
                    'e6': 'From main entrance: Turn right, continue to the end, E6 building will be on your right.'
                };
                return directions[building] || null;
            }
        };
    }

    function setupAllInterceptionMethods() {
        // Method 1: Monitor all inputs globally
        interceptAllInputs();
        
        // Method 2: Override XMLHttpRequest and fetch
        interceptNetworkRequests();
        
        // Method 3: Monitor DOM mutations
        interceptDOMMutations();
        
        // Method 4: Monitor keyboard events globally
        interceptKeyboardEvents();
        
        // Method 5: Override console methods
        interceptConsoleMessages();
        
        // Method 6: Monitor iframe communication
        interceptIframeMessages();
        
        // Method 7: Hook into common chat libraries
        hookIntoCommonChatAPIs();
    }

    function interceptAllInputs() {
        // Monitor ALL input fields on the page
        document.addEventListener('input', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                checkForClassroomCode(e.target.value, e.target);
            }
        }, true);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
                if (checkForClassroomCode(e.target.value, e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.target.value = '';
                }
            }
        }, true);

        // Check all existing inputs every second
        setInterval(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
                if (input.value) {
                    checkForClassroomCode(input.value, input);
                }
            });
        }, 1000);
    }

    function interceptNetworkRequests() {
        // Override XMLHttpRequest
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            this._url = url;
            return originalXHROpen.apply(this, [method, url, ...args]);
        };

        XMLHttpRequest.prototype.send = function(data) {
            if (data && typeof data === 'string' && this._url && this._url.includes('botpress')) {
                if (checkForClassroomCodeInData(data)) {
                    console.log('🚫 Blocked XHR request with classroom code');
                    return;
                }
            }
            return originalXHRSend.apply(this, arguments);
        };

        // Override fetch
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (options && options.body && typeof options.body === 'string') {
                if (checkForClassroomCodeInData(options.body)) {
                    console.log('🚫 Blocked fetch request with classroom code');
                    return Promise.resolve(new Response('{}'));
                }
            }
            return originalFetch.apply(this, arguments);
        };
    }

    function interceptDOMMutations() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) { // Element node
                            // Check for Botpress elements
                            if (node.querySelector && node.querySelector('input, textarea')) {
                                const inputs = node.querySelectorAll('input, textarea');
                                inputs.forEach(attachToInput);
                            }
                            
                            // Check text content for classroom codes
                            if (node.textContent) {
                                checkForClassroomCodeInText(node.textContent);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    function interceptKeyboardEvents() {
        document.addEventListener('keypress', function(e) {
            // Build up typed text
            if (!window.typedText) window.typedText = '';
            window.typedText += e.key;
            
            // Keep only last 10 characters
            if (window.typedText.length > 10) {
                window.typedText = window.typedText.slice(-10);
            }
            
            // Check for classroom codes
            checkForClassroomCodeInText(window.typedText);
        }, true);
    }

    function interceptConsoleMessages() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = function(...args) {
            args.forEach(arg => {
                if (typeof arg === 'string') {
                    checkForClassroomCodeInText(arg);
                }
            });
            return originalLog.apply(this, args);
        };

        console.error = function(...args) {
            args.forEach(arg => {
                if (typeof arg === 'string') {
                    checkForClassroomCodeInText(arg);
                }
            });
            return originalError.apply(this, args);
        };

        console.warn = function(...args) {
            args.forEach(arg => {
                if (typeof arg === 'string') {
                    checkForClassroomCodeInText(arg);
                }
            });
            return originalWarn.apply(this, args);
        };
    }

    function interceptIframeMessages() {
        window.addEventListener('message', function(e) {
            if (e.data && typeof e.data === 'string') {
                checkForClassroomCodeInText(e.data);
            } else if (e.data && e.data.text) {
                checkForClassroomCodeInText(e.data.text);
            }
        });
    }

    function hookIntoCommonChatAPIs() {
        // Wait for Botpress
        const checkForBotpress = () => {
            if (window.botpressWebChat) {
                console.log('🎯 Botpress detected - hooking in...');
                
                // Override sendMessage
                if (window.botpressWebChat.sendMessage) {
                    const original = window.botpressWebChat.sendMessage;
                    window.botpressWebChat.sendMessage = function(message) {
                        if (checkForClassroomCodeInText(message)) {
                            return Promise.resolve();
                        }
                        return original.apply(this, arguments);
                    };
                }

                // Override sendEvent
                if (window.botpressWebChat.sendEvent) {
                    const original = window.botpressWebChat.sendEvent;
                    window.botpressWebChat.sendEvent = function(event) {
                        if (event && event.payload && event.payload.text) {
                            if (checkForClassroomCodeInText(event.payload.text)) {
                                return Promise.resolve();
                            }
                        }
                        return original.apply(this, arguments);
                    };
                }

                // Hook into events
                if (window.botpressWebChat.onEvent) {
                    window.botpressWebChat.onEvent(function(event) {
                        if (event && event.payload && event.payload.text) {
                            checkForClassroomCodeInText(event.payload.text);
                        }
                    });
                }
            } else {
                setTimeout(checkForBotpress, 500);
            }
        };
        
        checkForBotpress();
    }

    function attachToInput(input) {
        if (input.dataset.classroomAttached) return;
        input.dataset.classroomAttached = 'true';

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (checkForClassroomCode(input.value, input)) {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                }
            }
        }, true);

        input.addEventListener('input', function(e) {
            checkForClassroomCode(input.value, input);
        }, true);
    }

    function checkForClassroomCode(text, inputElement = null) {
        if (!text) return false;
        
        const trimmed = text.trim().toUpperCase();
        
        if (isClassroomCode(trimmed)) {
            console.log('🎯 CLASSROOM CODE DETECTED:', trimmed);
            
            // Prevent duplicates
            if (interceptedCodes.has(trimmed)) return true;
            interceptedCodes.add(trimmed);
            
            // Clear input if provided
            if (inputElement) {
                inputElement.value = '';
            }
            
            // Process validation
            performValidation(trimmed);
            
            return true;
        }
        
        return false;
    }

    function checkForClassroomCodeInText(text) {
        if (!text) return false;
        
        // Look for classroom code patterns in any text
        const patterns = [/\b[WE]\d{1,2}[A-Z]\b/gi];
        
        for (const pattern of patterns) {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    checkForClassroomCode(match);
                });
                return true;
            }
        }
        
        return false;
    }

    function checkForClassroomCodeInData(data) {
        try {
            let text = data;
            
            // If it's JSON, parse it
            if (data.startsWith('{') || data.startsWith('[')) {
                const parsed = JSON.parse(data);
                text = JSON.stringify(parsed);
            }
            
            return checkForClassroomCodeInText(text);
        } catch (e) {
            return checkForClassroomCodeInText(data);
        }
    }

    function isClassroomCode(message) {
        // Check if message matches classroom code format
        const patterns = [
            /^[WE]\d+[A-Z]$/i,
            /^[WE]\d{1,2}[A-Z]$/i
        ];

        return patterns.some(pattern => pattern.test(message));
    }

    function performValidation(code) {
        try {
            console.log('🔍 Validating classroom code:', code);
            
            // Normalize code
            const normalizedCode = code.replace(/[\s\-]/g, '').toUpperCase();
            
            // Use the validation system
            const validation = validationSystem.processClassroomCode(normalizedCode);
            
            let responseText = validation.message;

            // Add navigation if valid
            if (validation.isValid) {
                const building = normalizedCode.slice(0, 2).toLowerCase();
                const navigation = validationSystem.processNavigation(`how to get to ${building}`);
                if (navigation) {
                    responseText += '<br><br>📍 <strong>Navigation:</strong><br>' + navigation;
                }
            }

            // Display the result EVERYWHERE
            displayValidationEverywhere(responseText);
            
            console.log('✅ Validation completed:', validation);

        } catch (error) {
            console.error('❌ Validation error:', error);
            displayValidationEverywhere('❌ Error validating classroom code. Please try again.');
        }
    }

    function displayValidationEverywhere(responseText) {
        console.log('📢 Displaying validation result:', responseText);
        
        // Method 1: Try to inject into Botpress
        displayInBotpress(responseText);
        
        // Method 2: Show as large overlay notification
        showLargeNotification(responseText);
        
        // Method 3: Alert (guaranteed to work)
        setTimeout(() => {
            alert('🏫 Classroom Validation:\n\n' + responseText.replace(/<[^>]*>/g, ''));
        }, 500);
        
        // Method 4: Console log
        console.log('🏫 CLASSROOM VALIDATION RESULT:', responseText);
    }

    function displayInBotpress(responseText) {
        // Try to find and inject into Botpress chat
        const chatSelectors = [
            '#bp-widget .bpw-message-list',
            '#bp-widget .bpw-messages',
            '[data-module-name="channel-web"] .messages',
            '.bpw-chat-container .bpw-message-list',
            '.bpw-layout .bpw-message-list',
            '.bpw-chat-container',
            '#bp-widget'
        ];

        for (const selector of chatSelectors) {
            const container = document.querySelector(selector);
            if (container) {
                console.log('💬 Injecting into Botpress:', selector);
                injectMessageIntoBotpress(container, responseText);
                break;
            }
        }
    }

    function injectMessageIntoBotpress(container, responseText) {
        const messageElement = document.createElement('div');
        messageElement.className = 'classroom-validation-message';
        messageElement.style.cssText = `
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8) !important;
            border: 3px solid #32cd32 !important;
            border-radius: 12px !important;
            padding: 20px !important;
            margin: 16px 8px !important;
            color: #2d5a2d !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            box-shadow: 0 4px 12px rgba(50, 205, 50, 0.3) !important;
            position: relative !important;
            z-index: 999999 !important;
            animation: slideIn 0.5s ease-out !important;
        `;

        messageElement.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 12px; font-weight: bold;">
                <span style="font-size: 20px; margin-right: 8px;">🏫</span>
                <span style="color: #228b22;">CLASSROOM VALIDATION RESULT</span>
            </div>
            <div style="font-size: 15px; line-height: 1.6;">
                ${responseText}
            </div>
        `;

        // Add animation styles
        if (!document.querySelector('#validation-animation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'validation-animation-styles';
            styles.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-20px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }

        container.appendChild(messageElement);
        
        // Scroll to show the message
        setTimeout(() => {
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);

        console.log('✅ Message injected into Botpress');
    }

    function showLargeNotification(responseText) {
        // Remove any existing notification
        const existing = document.querySelector('#classroom-validation-notification');
        if (existing) existing.remove();

        // Create large notification overlay
        const notification = document.createElement('div');
        notification.id = 'classroom-validation-notification';
        notification.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8) !important;
            border: 4px solid #32cd32 !important;
            border-radius: 16px !important;
            padding: 30px !important;
            max-width: 500px !important;
            width: 90% !important;
            z-index: 999999 !important;
            box-shadow: 0 12px 36px rgba(0,0,0,0.3) !important;
            animation: popIn 0.4s ease-out !important;
            font-family: Arial, sans-serif !important;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
                <div style="display: flex; align-items: center;">
                    <span style="font-size: 24px; margin-right: 12px;">🏫</span>
                    <h3 style="margin: 0; color: #228b22; font-size: 18px; font-weight: bold;">CLASSROOM VALIDATION</h3>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #ff4757 !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 50% !important;
                    width: 32px !important;
                    height: 32px !important;
                    cursor: pointer !important;
                    font-size: 18px !important;
                    font-weight: bold !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                ">×</button>
            </div>
            <div style="color: #2d5a2d; font-size: 16px; line-height: 1.6;">
                ${responseText}
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: #32cd32 !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 8px !important;
                    padding: 12px 24px !important;
                    cursor: pointer !important;
                    font-size: 14px !important;
                    font-weight: bold !important;
                ">OK</button>
            </div>
        `;

        // Add animation styles
        if (!document.querySelector('#validation-popup-styles')) {
            const styles = document.createElement('style');
            styles.id = 'validation-popup-styles';
            styles.textContent = `
                @keyframes popIn {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto-remove after 15 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'popIn 0.3s reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 15000);

        console.log('✅ Large notification displayed');
    }

    // Initialize everything IMMEDIATELY
    init();

    // Also initialize on various events
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    }
    
    window.addEventListener('load', init);
    
    // Keep trying every 2 seconds
    setInterval(init, 2000);

    console.log('🚀 ULTRA AGGRESSIVE VALIDATION SYSTEM ACTIVATED');

})();
