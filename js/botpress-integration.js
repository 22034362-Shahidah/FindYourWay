// Enhanced Botpress Integration with Guaranteed Classroom Validation
// This script ensures classroom validation works within the Botpress chatbot

class RobustBotpressValidator {
    constructor() {
        this.validationQueue = [];
        this.botpressReady = false;
        this.validationReady = false;
        this.observers = [];
        this.init();
    }

    init() {
        console.log('🚀 Starting Robust Botpress Validator...');
        this.setupValidationSystem();
        this.setupBotpressIntegration();
        this.setupGlobalMessageInterceptor();
        this.setupDOMObservers();
    }

    // Enhanced validation system setup
    setupValidationSystem() {
        const checkValidation = () => {
            if (typeof ChatbotProcessor !== 'undefined') {
                this.validationReady = true;
                console.log('✅ Validation system ready');
                this.processQueuedValidations();
            } else {
                console.log('⏳ Waiting for validation system...');
                setTimeout(checkValidation, 500);
            }
        };
        checkValidation();
    }

    // Multi-approach Botpress integration
    setupBotpressIntegration() {
        let attempts = 0;
        const maxAttempts = 30;

        const checkBotpress = () => {
            attempts++;
            console.log(`🔍 Checking Botpress... Attempt ${attempts}/${maxAttempts}`);

            // Check multiple ways Botpress might be available
            const indicators = [
                window.botpressWebChat,
                window.bp,
                document.querySelector('#bp-widget'),
                document.querySelector('[data-module-name="channel-web"]'),
                document.querySelector('iframe[src*="botpress"]'),
                document.querySelector('.bpw-'),
                document.querySelector('[class*="botpress"]')
            ];

            const botpressFound = indicators.some(indicator => indicator);

            if (botpressFound) {
                this.botpressReady = true;
                console.log('✅ Botpress detected');
                this.hookIntoBotpress();
                this.processQueuedValidations();
            } else if (attempts < maxAttempts) {
                setTimeout(checkBotpress, 1000);
            } else {
                console.warn('⚠️ Botpress not detected, using fallback methods');
                this.setupFallbackValidation();
            }
        };

        checkBotpress();
    }

    // Hook into Botpress with multiple methods
    hookIntoBotpress() {
        console.log('🔗 Hooking into Botpress...');

        // Method 1: WebChat API
        if (window.botpressWebChat) {
            this.setupWebChatIntegration();
        }

        // Method 2: PostMessage API
        this.setupPostMessageIntegration();

        // Method 3: DOM Event Listening
        this.setupDOMEventListening();

        // Method 4: Mutation Observer on Botpress elements
        this.setupBotpressMutationObserver();
    }

    setupWebChatIntegration() {
        try {
            if (window.botpressWebChat.onEvent) {
                window.botpressWebChat.onEvent((event) => {
                    console.log('📨 Botpress event:', event);
                    if (event.type === 'message' && event.payload && event.payload.text) {
                        this.handleMessage(event.payload.text);
                    }
                });
                console.log('✅ WebChat API integration setup');
            }

            // Override send methods
            const originalSend = window.botpressWebChat.sendMessage;
            if (originalSend) {
                window.botpressWebChat.sendMessage = (message) => {
                    if (this.handleMessage(message)) {
                        return; // Intercept classroom codes
                    }
                    return originalSend.call(window.botpressWebChat, message);
                };
            }
        } catch (error) {
            console.warn('WebChat integration error:', error);
        }
    }

    setupPostMessageIntegration() {
        window.addEventListener('message', (event) => {
            try {
                if (event.data && typeof event.data === 'object') {
                    if (event.data.type === 'webchat' || event.data.from === 'botpress') {
                        if (event.data.payload && event.data.payload.text) {
                            this.handleMessage(event.data.payload.text);
                        }
                    }
                }
            } catch (error) {
                console.warn('PostMessage handling error:', error);
            }
        });
        console.log('✅ PostMessage integration setup');
    }

    setupDOMEventListening() {
        // Listen for form submissions and input events
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (this.isBotpressForm(form)) {
                const input = form.querySelector('input[type="text"], textarea');
                if (input && this.handleMessage(input.value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                }
            }
        }, true);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.matches('input[type="text"], textarea')) {
                const input = e.target;
                if (this.isBotpressInput(input) && this.handleMessage(input.value)) {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                }
            }
        }, true);

        console.log('✅ DOM event listening setup');
    }

    setupBotpressMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check for new input fields
                            const inputs = node.querySelectorAll ? 
                                node.querySelectorAll('input[type="text"], textarea') : [];
                            inputs.forEach(input => this.attachInputListener(input));

                            // Check if the node itself is an input
                            if (node.matches && node.matches('input[type="text"], textarea')) {
                                this.attachInputListener(node);
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.push(observer);
        console.log('✅ Botpress mutation observer setup');
    }

    setupGlobalMessageInterceptor() {
        // Create a global function that can be called to validate classroom codes
        window.validateClassroomCode = (code) => {
            return this.handleMessage(code);
        };

        // Intercept any fetch requests that might be sending messages
        const originalFetch = window.fetch;
        window.fetch = (...args) => {
            const [url, options] = args;
            
            if (options && options.body && typeof options.body === 'string') {
                try {
                    const data = JSON.parse(options.body);
                    if (data.text && this.isClassroomCode(data.text)) {
                        this.handleMessage(data.text);
                        // Still allow the original request but we've handled validation
                    }
                } catch (e) {
                    // Not JSON, ignore
                }
            }
            
            return originalFetch.apply(window, args);
        };

        console.log('✅ Global message interceptor setup');
    }

    setupDOMObservers() {
        // Continuously monitor for Botpress elements
        const observer = new MutationObserver(() => {
            // Look for any input fields that might be from Botpress
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
                if (!input.dataset.validationAttached && this.isBotpressInput(input)) {
                    this.attachInputListener(input);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true
        });

        this.observers.push(observer);
    }

    attachInputListener(input) {
        if (input.dataset.validationAttached) return;
        input.dataset.validationAttached = 'true';

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = input.value.trim();
                if (this.handleMessage(message)) {
                    e.preventDefault();
                    e.stopPropagation();
                    input.value = '';
                }
            }
        });

        console.log('✅ Input listener attached to:', input);
    }

    isBotpressForm(form) {
        const botpressSelectors = [
            '[class*="botpress"]',
            '[class*="bpw-"]',
            '#bp-widget',
            '[data-module-name="channel-web"]'
        ];
        
        return botpressSelectors.some(selector => 
            form.matches(selector) || form.closest(selector)
        );
    }

    isBotpressInput(input) {
        const botpressSelectors = [
            '[class*="botpress"]',
            '[class*="bpw-"]',
            '#bp-widget',
            '[data-module-name="channel-web"]',
            'iframe[src*="botpress"]'
        ];
        
        return botpressSelectors.some(selector => 
            input.matches(selector) || input.closest(selector)
        ) || input.placeholder && input.placeholder.toLowerCase().includes('message');
    }

    handleMessage(message) {
        if (!message || typeof message !== 'string') return false;
        
        const trimmedMessage = message.trim();
        console.log('🔍 Checking message:', trimmedMessage);

        if (this.isClassroomCode(trimmedMessage)) {
            console.log('🏫 Classroom code detected:', trimmedMessage);
            
            if (this.validationReady) {
                this.performValidation(trimmedMessage);
            } else {
                console.log('⏳ Queueing validation for:', trimmedMessage);
                this.validationQueue.push(trimmedMessage);
            }
            return true; // Intercept this message
        }
        return false;
    }

    isClassroomCode(message) {
        // Enhanced pattern matching for classroom codes
        const patterns = [
            /^[WE]\d+[A-Z]$/i,           // W14K, E27A
            /^[WE]\d{1,2}[A-Z]$/i,      // W1K, E2A, W14K
            /^[WE]\d{1,2}-[A-Z]$/i,     // W14-K, E27-A
            /^[WE]\d{1,2}\s[A-Z]$/i     // W14 K, E27 A
        ];
        
        return patterns.some(pattern => pattern.test(message.trim()));
    }

    performValidation(code) {
        try {
            console.log('🔍 Validating classroom code:', code);
            
            // Normalize the code (remove spaces, hyphens)
            const normalizedCode = code.replace(/[\s\-]/g, '').toUpperCase();
            
            if (typeof ChatbotProcessor === 'undefined') {
                console.error('❌ ChatbotProcessor not available');
                this.showValidationError('Validation system not loaded');
                return;
            }

            // Use the existing validation system
            const validation = ChatbotProcessor.processClassroomCode(normalizedCode);
            console.log('✅ Validation result:', validation);

            let responseText = validation.message;

            // Add navigation if valid
            if (validation.isValid) {
                const building = normalizedCode.slice(0, 2).toLowerCase();
                const navigation = ChatbotProcessor.processNavigation(`how to get to ${building}`);
                if (navigation) {
                    responseText += '<br><br>📍 <strong>Navigation:</strong><br>' + navigation;
                }
            }

            // Send the validation response
            this.sendValidationResponse(responseText);

        } catch (error) {
            console.error('❌ Validation error:', error);
            this.showValidationError('Error validating classroom code. Please try again.');
        }
    }

    sendValidationResponse(responseText) {
        console.log('📤 Sending validation response:', responseText);

        // Try multiple methods to send the response
        const methods = [
            () => this.sendViaWebChat(responseText),
            () => this.sendViaPostMessage(responseText),
            () => this.injectDirectly(responseText),
            () => this.showNotification(responseText)
        ];

        let sent = false;
        for (const method of methods) {
            try {
                if (method() && !sent) {
                    sent = true;
                    console.log('✅ Response sent successfully');
                    break;
                }
            } catch (error) {
                console.warn('⚠️ Send method failed:', error);
            }
        }

        if (!sent) {
            console.warn('⚠️ All send methods failed, using notification');
            this.showNotification(responseText);
        }
    }

    sendViaWebChat(responseText) {
        if (window.botpressWebChat) {
            if (window.botpressWebChat.sendPayload) {
                window.botpressWebChat.sendPayload({
                    type: 'text',
                    text: responseText
                });
                return true;
            }
            if (window.botpressWebChat.sendMessage) {
                window.botpressWebChat.sendMessage(responseText);
                return true;
            }
        }
        return false;
    }

    sendViaPostMessage(responseText) {
        const iframe = document.querySelector('iframe[src*="botpress"]');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage({
                type: 'validation_response',
                payload: { text: responseText }
            }, '*');
            return true;
        }
        return false;
    }

    injectDirectly(responseText) {
        const containers = [
            document.querySelector('#bp-widget .bpw-message-list'),
            document.querySelector('[data-module-name="channel-web"] .messages'),
            document.querySelector('.bp-chat-container .messages'),
            document.querySelector('[class*="botpress"] [class*="message"]').parentElement
        ].filter(Boolean);

        if (containers.length > 0) {
            const container = containers[0];
            const messageEl = this.createMessageElement(responseText);
            container.appendChild(messageEl);
            container.scrollTop = container.scrollHeight;
            return true;
        }
        return false;
    }

    createMessageElement(responseText) {
        const messageEl = document.createElement('div');
        messageEl.className = 'validation-response bot-message';
        messageEl.style.cssText = `
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
            border: 2px solid #32cd32;
            border-radius: 12px;
            padding: 16px;
            margin: 12px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #2d5a2d;
            max-width: 85%;
            box-shadow: 0 4px 12px rgba(50, 205, 50, 0.2);
            animation: slideInValidation 0.5s ease-out;
            position: relative;
        `;

        // Add icon
        const icon = document.createElement('div');
        icon.innerHTML = '🏫';
        icon.style.cssText = `
            position: absolute;
            top: -8px;
            left: -8px;
            background: #32cd32;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        `;

        messageEl.appendChild(icon);
        messageEl.innerHTML += `<div style="margin-left: 8px;">${responseText}</div>`;

        // Add animation styles if not present
        if (!document.querySelector('#validation-styles')) {
            const styles = document.createElement('style');
            styles.id = 'validation-styles';
            styles.textContent = `
                @keyframes slideInValidation {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }

        return messageEl;
    }

    showNotification(responseText) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
            border: 2px solid #32cd32;
            border-radius: 12px;
            padding: 20px;
            max-width: 400px;
            font-size: 14px;
            color: #2d5a2d;
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                <span style="font-size: 20px; margin-right: 8px;">🏫</span>
                <strong>Classroom Validation</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-left: auto;
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #666;
                ">×</button>
            </div>
            <div>${responseText}</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 8000);

        console.log('✅ Notification shown');
        return true;
    }

    showValidationError(message) {
        this.showNotification(`❌ ${message}`);
    }

    processQueuedValidations() {
        if (this.validationQueue.length > 0 && this.validationReady) {
            console.log(`📋 Processing ${this.validationQueue.length} queued validations`);
            const queue = [...this.validationQueue];
            this.validationQueue = [];
            queue.forEach(code => this.performValidation(code));
        }
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
        console.log('🧹 Validator destroyed');
    }
}

// Initialize the validator
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing validator...');
    window.botpressValidator = new RobustBotpressValidator();
});

// Backup initialization
window.addEventListener('load', function() {
    if (!window.botpressValidator) {
        console.log('🚀 Window loaded, backup validator initialization...');
        setTimeout(() => {
            window.botpressValidator = new RobustBotpressValidator();
        }, 1000);
    }
});
