// Aggressive Botpress Message Interceptor for Classroom Validation
// This script intercepts ALL messages before they reach Botpress

class AggressiveMessageInterceptor {
    constructor() {
        this.isActive = false;
        this.validationReady = false;
        this.interceptedElements = new WeakSet();
        this.init();
    }

    init() {
        console.log('🚀 AGGRESSIVE INTERCEPTOR STARTING...');
        this.setupValidationSystem();
        this.interceptEverything();
        this.startContinuousMonitoring();
    }

    setupValidationSystem() {
        const checkValidation = () => {
            if (typeof ChatbotProcessor !== 'undefined') {
                this.validationReady = true;
                console.log('✅ Validation system ready');
            } else {
                console.log('⏳ Waiting for validation system...');
                setTimeout(checkValidation, 200);
            }
        };
        checkValidation();
    }

    interceptEverything() {
        console.log('🔥 INTERCEPTING EVERYTHING...');
        
        // 1. Intercept ALL form submissions globally
        document.addEventListener('submit', (e) => {
            console.log('📝 FORM SUBMIT DETECTED:', e.target);
            const inputs = e.target.querySelectorAll('input[type="text"], textarea, input[type="search"]');
            inputs.forEach(input => {
                const message = input.value.trim();
                if (message && this.handleMessage(message)) {
                    console.log('✋ FORM SUBMISSION BLOCKED');
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    input.value = '';
                }
            });
        }, true);

        // 2. Intercept ALL keydown events globally
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.matches('input, textarea')) {
                const message = e.target.value.trim();
                console.log('⌨️ ENTER KEY WITH MESSAGE:', message);
                if (message && this.handleMessage(message)) {
                    console.log('✋ ENTER KEY BLOCKED');
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.target.value = '';
                }
            }
        }, true);

        // 3. Intercept ALL click events on buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, [role="button"], input[type="submit"], .send-button, [class*="send"]')) {
                console.log('🖱️ BUTTON CLICK DETECTED:', e.target);
                
                // Find nearest form or input
                const form = e.target.closest('form') || e.target.parentElement;
                const input = form?.querySelector('input[type="text"], textarea') || 
                            document.querySelector('input[type="text"]:focus, textarea:focus');
                
                if (input) {
                    const message = input.value.trim();
                    console.log('🖱️ BUTTON CLICK WITH MESSAGE:', message);
                    if (message && this.handleMessage(message)) {
                        console.log('✋ BUTTON CLICK BLOCKED');
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        input.value = '';
                    }
                }
            }
        }, true);

        // 4. Override ALL possible send methods
        this.overrideNetworkMethods();

        // 5. Monitor for new elements continuously
        this.setupContinuousElementMonitoring();
    }

    overrideNetworkMethods() {
        console.log('🌐 OVERRIDING NETWORK METHODS...');

        // Override fetch
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            const [url, options] = args;
            
            if (options?.body) {
                let messageText = '';
                
                try {
                    if (typeof options.body === 'string') {
                        const data = JSON.parse(options.body);
                        messageText = data.text || data.message || data.content || '';
                    }
                } catch (e) {
                    messageText = options.body.toString();
                }
                
                if (messageText && this.handleMessage(messageText)) {
                    console.log('✋ FETCH REQUEST BLOCKED');
                    return Promise.resolve(new Response(JSON.stringify({success: true}), {
                        status: 200,
                        headers: {'Content-Type': 'application/json'}
                    }));
                }
            }
            
            return originalFetch.apply(window, args);
        };

        // Override XMLHttpRequest
        const originalXHRSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(data) {
            if (data) {
                let messageText = '';
                
                try {
                    const parsedData = JSON.parse(data);
                    messageText = parsedData.text || parsedData.message || parsedData.content || '';
                } catch (e) {
                    messageText = data.toString();
                }
                
                if (messageText && window.aggressiveInterceptor?.handleMessage(messageText)) {
                    console.log('✋ XHR REQUEST BLOCKED');
                    setTimeout(() => {
                        this.readyState = 4;
                        this.status = 200;
                        this.responseText = JSON.stringify({success: true});
                        if (this.onreadystatechange) this.onreadystatechange();
                        if (this.onload) this.onload();
                    }, 10);
                    return;
                }
            }
            
            return originalXHRSend.call(this, data);
        };

        // Wait for Botpress and override its methods
        this.waitForBotpressAndOverride();
    }

    waitForBotpressAndOverride() {
        const checkAndOverride = () => {
            if (window.botpressWebChat) {
                console.log('🎯 OVERRIDING BOTPRESS METHODS...');
                
                // Override sendMessage
                if (window.botpressWebChat.sendMessage) {
                    const original = window.botpressWebChat.sendMessage;
                    window.botpressWebChat.sendMessage = (message) => {
                        console.log('🔍 BOTPRESS SEND MESSAGE:', message);
                        if (this.handleMessage(message)) {
                            console.log('✋ BOTPRESS MESSAGE BLOCKED');
                            return Promise.resolve();
                        }
                        return original.call(window.botpressWebChat, message);
                    };
                }

                // Override sendEvent
                if (window.botpressWebChat.sendEvent) {
                    const original = window.botpressWebChat.sendEvent;
                    window.botpressWebChat.sendEvent = (event) => {
                        console.log('🔍 BOTPRESS SEND EVENT:', event);
                        if (event?.text && this.handleMessage(event.text)) {
                            console.log('✋ BOTPRESS EVENT BLOCKED');
                            return Promise.resolve();
                        }
                        return original.call(window.botpressWebChat, event);
                    };
                }

                // Override sendPayload
                if (window.botpressWebChat.sendPayload) {
                    const original = window.botpressWebChat.sendPayload;
                    window.botpressWebChat.sendPayload = (payload) => {
                        console.log('🔍 BOTPRESS SEND PAYLOAD:', payload);
                        if (payload?.text && this.handleMessage(payload.text)) {
                            console.log('✋ BOTPRESS PAYLOAD BLOCKED');
                            return Promise.resolve();
                        }
                        return original.call(window.botpressWebChat, payload);
                    };
                }

                console.log('✅ BOTPRESS METHODS OVERRIDDEN');
            } else {
                setTimeout(checkAndOverride, 500);
            }
        };

        checkAndOverride();
    }

    setupContinuousElementMonitoring() {
        // Monitor every 100ms for new inputs
        setInterval(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="search"]');
            inputs.forEach(input => {
                if (!this.interceptedElements.has(input)) {
                    this.attachAggressiveListeners(input);
                    this.interceptedElements.add(input);
                }
            });
        }, 100);

        // Also use mutation observer
        const observer = new MutationObserver(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea, input[type="search"]');
            inputs.forEach(input => {
                if (!this.interceptedElements.has(input)) {
                    this.attachAggressiveListeners(input);
                    this.interceptedElements.add(input);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });
    }

    attachAggressiveListeners(input) {
        console.log('🎯 ATTACHING AGGRESSIVE LISTENERS TO:', input);

        // Multiple listeners with highest priority
        ['keydown', 'keypress', 'input', 'change', 'blur'].forEach(eventType => {
            input.addEventListener(eventType, (e) => {
                if (eventType === 'keydown' && e.key === 'Enter') {
                    const message = input.value.trim();
                    if (message && this.handleMessage(message)) {
                        console.log(`✋ ${eventType.toUpperCase()} BLOCKED`);
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        input.value = '';
                    }
                }
            }, true);
        });

        // Also monitor value changes directly
        let lastValue = input.value;
        const valueWatcher = () => {
            if (input.value !== lastValue) {
                lastValue = input.value;
                const message = input.value.trim();
                if (message && this.isClassroomCode(message)) {
                    console.log('📝 CLASSROOM CODE DETECTED IN INPUT:', message);
                    // Don't handle here, wait for submit/enter
                }
            }
        };

        setInterval(valueWatcher, 50);
    }

    startContinuousMonitoring() {
        // Log activity every second
        setInterval(() => {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            console.log(`🔍 MONITORING: ${inputs.length} inputs found`);
        }, 5000);
    }

    handleMessage(message) {
        if (!message || typeof message !== 'string') return false;
        
        const trimmedMessage = message.trim();
        console.log('🔍 ANALYZING MESSAGE:', trimmedMessage);

        if (this.isClassroomCode(trimmedMessage)) {
            console.log('🏫 CLASSROOM CODE DETECTED!!! 🎯', trimmedMessage);
            
            if (this.validationReady) {
                this.performValidation(trimmedMessage);
            } else {
                console.log('⏳ Validation not ready, showing loading message');
                this.showValidationResult('⏳ Validation system loading... Please try again in a moment.');
            }
            return true; // ALWAYS intercept classroom codes
        }
        
        return false;
    }

    isClassroomCode(message) {
        const patterns = [
            /^[WE]\d+[A-Z]$/i,           // W14K, E27A
            /^[WE]\d{1,2}[A-Z]$/i,      // W1K, E2A
            /^[WE]\d{1,2}-[A-Z]$/i,     // W14-K, E27-A
            /^[WE]\d{1,2}\s+[A-Z]$/i,   // W14 K, E27 A
        ];
        
        const isMatch = patterns.some(pattern => pattern.test(message));
        console.log(`🔍 CLASSROOM CODE CHECK "${message}": ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);
        return isMatch;
    }

    performValidation(code) {
        try {
            console.log('🔍 PERFORMING VALIDATION FOR:', code);
            
            const normalizedCode = code.replace(/[\s\-]/g, '').toUpperCase();
            
            if (typeof ChatbotProcessor === 'undefined') {
                console.error('❌ ChatbotProcessor not available');
                this.showValidationResult('❌ Validation system not loaded');
                return;
            }

            const validation = ChatbotProcessor.processClassroomCode(normalizedCode);
            console.log('✅ VALIDATION COMPLETE:', validation);

            let responseText = `🏫 <strong>Classroom Validation Result</strong><br><br>${validation.message}`;

            if (validation.isValid) {
                const building = normalizedCode.slice(0, 2).toLowerCase();
                const navigation = ChatbotProcessor.processNavigation(`how to get to ${building}`);
                if (navigation) {
                    responseText += '<br><br>📍 <strong>Navigation:</strong><br>' + navigation;
                }
            }

            this.showValidationResult(responseText);

        } catch (error) {
            console.error('❌ VALIDATION ERROR:', error);
            this.showValidationResult('❌ Error validating classroom code. Please try again.');
        }
    }

    showValidationResult(responseText) {
        console.log('📤 SHOWING VALIDATION RESULT');

        // Remove any existing result
        const existing = document.getElementById('aggressive-validation-result');
        if (existing) existing.remove();

        // Create prominent overlay
        const overlay = document.createElement('div');
        overlay.id = 'aggressive-validation-result';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            animation: fadeIn 0.3s ease-out;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
            border: 4px solid #32cd32;
            border-radius: 20px;
            padding: 30px;
            max-width: 600px;
            min-width: 400px;
            font-size: 16px;
            line-height: 1.6;
            color: #2d5a2d;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-family: Arial, sans-serif;
            text-align: center;
        `;

        modal.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                <span style="font-size: 40px; margin-right: 15px;">🏫</span>
                <h2 style="margin: 0; color: #228b22;">Classroom Validation</h2>
            </div>
            <div style="margin-bottom: 25px; text-align: left;">${responseText}</div>
            <button onclick="document.getElementById('aggressive-validation-result').remove()" style="
                background: #32cd32;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(50, 205, 50, 0.3);
                transition: all 0.2s;
            " onmouseover="this.style.background='#228b22'" onmouseout="this.style.background='#32cd32'">
                ✅ Close
            </button>
        `;

        overlay.appendChild(modal);

        // Add animation styles
        if (!document.querySelector('#aggressive-validation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'aggressive-validation-styles';
            styles.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popIn {
                    0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
                    100% { opacity: 1; transform: scale(1) rotate(0deg); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(overlay);

        // Auto-close after 20 seconds
        setTimeout(() => {
            if (overlay.parentElement) {
                overlay.style.animation = 'fadeIn 0.3s reverse';
                setTimeout(() => overlay.remove(), 300);
            }
        }, 20000);

        console.log('✅ VALIDATION RESULT DISPLAYED');
    }
}

// Initialize IMMEDIATELY
console.log('🚀 INITIALIZING AGGRESSIVE INTERCEPTOR IMMEDIATELY...');
window.aggressiveInterceptor = new AggressiveMessageInterceptor();

// Also initialize on DOM ready and window load as backup
document.addEventListener('DOMContentLoaded', function() {
    if (!window.aggressiveInterceptor) {
        console.log('🚀 DOM READY - BACKUP INITIALIZATION...');
        window.aggressiveInterceptor = new AggressiveMessageInterceptor();
    }
});

window.addEventListener('load', function() {
    if (!window.aggressiveInterceptor) {
        console.log('🚀 WINDOW LOAD - BACKUP INITIALIZATION...');
        window.aggressiveInterceptor = new AggressiveMessageInterceptor();
    }
});
