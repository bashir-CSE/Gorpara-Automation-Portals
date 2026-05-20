// ── AAF Gorpara Automation Hub JavaScript ──

// Global error handling
window.addEventListener('error', function(e) {
	console.error('Global error:', e.error);
	showError('A resource failed to load. Some features may not work properly.');
});

// Resource loading tracking
let resourcesLoaded = {
	css: false,
	js: false,
	fonts: false
};

function checkAllResourcesLoaded() {
	const allLoaded = Object.values(resourcesLoaded).every(loaded => loaded);
	if (allLoaded) {
		hideLoading();
	}
}

function showError(message) {
	const notification = document.getElementById('error-notification');
	const messageEl = document.getElementById('error-message');
	messageEl.textContent = message;
	notification.style.display = 'block';
	
	// Auto-hide after 5 seconds
	setTimeout(() => {
		notification.style.display = 'none';
	}, 5000);
}

function hideLoading() {
	const loadingOverlay = document.getElementById('loading-overlay');
	loadingOverlay.style.opacity = '0';
	setTimeout(() => {
		loadingOverlay.style.display = 'none';
	}, 300);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	// Track CSS loading (external CSS file is loaded)
	resourcesLoaded.css = true;
	
	// Track Bootstrap JS loading
	const bootstrapScript = document.querySelector('script[src*="bootstrap"]');
	if (bootstrapScript) {
		bootstrapScript.onload = function() {
			resourcesLoaded.js = true;
			checkAllResourcesLoaded();
		};
		bootstrapScript.onerror = function() {
			resourcesLoaded.js = false;
			showError('Bootstrap library failed to load');
			checkAllResourcesLoaded();
		};
	} else {
		resourcesLoaded.js = true;
	}

	// Track font loading
	const fontLoadTest = new FontFace('Playfair Display', 'local("Playfair Display")');
	fontLoadTest.load().then(function() {
		resourcesLoaded.fonts = true;
		checkAllResourcesLoaded();
	}).catch(function() {
		resourcesLoaded.fonts = true; // Continue even if font fails
		checkAllResourcesLoaded();
	});

	// Set timeout to ensure loading completes
	setTimeout(checkAllResourcesLoaded, 3000);

	// Initialize scroll animations
	initializeScrollAnimations();

	// Initialize smooth scrolling
	initializeSmoothScrolling();

	// Initialize performance monitoring
	initializePerformanceMonitoring();
});

// ── Scroll Animations ──
function initializeScrollAnimations() {
	const fadeEls = document.querySelectorAll('.fade-up');
	const obs = new IntersectionObserver((entries) => {
		entries.forEach(e => { 
			if (e.isIntersecting) { 
				e.target.style.opacity = '1';
				// Unobserve after animation
				obs.unobserve(e.target);
			}
		});
	}, { threshold: 0.1 });
	
	fadeEls.forEach(el => {
		el.style.opacity = '0';
		obs.observe(el);
	});
}

// ── Smooth Scrolling ──
function initializeSmoothScrolling() {
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', e => {
			const target = document.querySelector(a.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
}

// ── Performance Monitoring ──
function initializePerformanceMonitoring() {
	window.addEventListener('load', function() {
		const navigationTiming = performance.getEntriesByType('navigation')[0];
		const loadTime = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
		
		console.log(`Page load time: ${loadTime}ms`);
		
		// Log performance metrics if available
		if ('performance' in window) {
			const perfData = {
				loadTime: loadTime,
				domain: window.location.hostname,
				timestamp: new Date().toISOString()
			};
			
			// You can send this to an analytics service if needed
			console.log('Performance data:', perfData);
		}
	});
}

// ── Utility Functions ──
// Helper function to safely query elements
function safeQuerySelector(selector, context = document) {
	const element = context.querySelector(selector);
	if (!element) {
		console.warn(`Element not found: ${selector}`);
	}
	return element;
}

// Helper function to safely query multiple elements
function safeQuerySelectorAll(selector, context = document) {
	const elements = context.querySelectorAll(selector);
	if (elements.length === 0) {
		console.warn(`No elements found: ${selector}`);
	}
	return elements;
}

// ── Export for external use ──
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		showError,
		hideLoading,
		checkAllResourcesLoaded,
		initializeScrollAnimations,
		initializeSmoothScrolling,
		initializePerformanceMonitoring
	};
}