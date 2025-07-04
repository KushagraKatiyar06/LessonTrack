// LessonTrack Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add hover effects
    addHoverEffects();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add loading states
    addLoadingStates();
});

function initializeDashboard() {
    console.log('LessonTrack Dashboard initialized');
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.bg-white');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Add pulse effect to active status indicators
    const activeStatuses = document.querySelectorAll('.bg-green-100');
    activeStatuses.forEach(status => {
        status.classList.add('pulse');
    });
}

function addSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function addHoverEffects() {
    // Enhanced hover effects for table rows
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.backgroundColor = '#f8fafc';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.bg-white');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

function initializeTooltips() {
    // Add tooltips to elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.classList.add('tooltip');
    });
}

function addLoadingStates() {
    // Add loading spinner functionality
    const buttons = document.querySelectorAll('button, a');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('loading')) {
                return; // Prevent multiple clicks
            }
            
            // Add loading state
            this.classList.add('loading');
            const originalText = this.textContent;
            this.innerHTML = '<div class="spinner inline-block mr-2"></div>Loading...';
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = originalText;
            }, 2000);
        });
    });
}

// Real-time statistics updates (simulated)
function updateStatistics() {
    const statsElements = document.querySelectorAll('[data-stat]');
    statsElements.forEach(element => {
        const currentValue = parseInt(element.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 5);
        
        // Animate the number change
        animateNumber(element, currentValue, newValue);
    });
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-tutors');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            const tutorName = row.querySelector('td:first-child').textContent.toLowerCase();
            const tutorEmail = row.querySelector('td:first-child .text-gray-500').textContent.toLowerCase();
            const tutorSchool = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            
            const matches = tutorName.includes(searchTerm) || 
                           tutorEmail.includes(searchTerm) || 
                           tutorSchool.includes(searchTerm);
            
            row.style.display = matches ? '' : 'none';
        });
    });
}

// Filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            const tableRows = document.querySelectorAll('tbody tr');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            // Add active class to clicked button
            this.classList.add('bg-blue-600', 'text-white');
            
            tableRows.forEach(row => {
                if (filterValue === 'all') {
                    row.style.display = '';
                } else {
                    const tutorSchool = row.querySelector('td:nth-child(2)').textContent.trim();
                    row.style.display = tutorSchool === filterValue ? '' : 'none';
                }
            });
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification bg-${type === 'success' ? 'green' : 'blue'}-50 border border-${type === 'success' ? 'green' : 'blue'}-200 text-${type === 'success' ? 'green' : 'blue'}-800`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} mr-2"></i>
            <span>${message}</span>
            <button class="ml-auto text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Export functionality
function exportData(format = 'csv') {
    const tutors = Array.from(document.querySelectorAll('tbody tr')).map(row => {
        const cells = row.querySelectorAll('td');
        return {
            name: cells[0].textContent.trim(),
            school: cells[1].textContent.trim(),
            weeklyHours: cells[2].textContent.trim(),
            total: cells[3].textContent.trim(),
            status: cells[4].textContent.trim()
        };
    });
    
    if (format === 'csv') {
        const csvContent = 'data:text/csv;charset=utf-8,' + 
            'Name,School,Weekly Hours,Total,Status\n' +
            tutors.map(tutor => 
                `"${tutor.name}","${tutor.school}","${tutor.weeklyHours}","${tutor.total}","${tutor.status}"`
            ).join('\n');
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'lessontrack_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    showNotification('Data exported successfully!', 'success');
}

// Chart functionality (if Chart.js is available)
function initializeCharts() {
    if (typeof Chart === 'undefined') return;
    
    // Hours by school chart
    const ctx = document.getElementById('hours-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['UF', 'Mostar', 'RBC'],
                datasets: [{
                    data: [12.5, 8.5, 6.0],
                    backgroundColor: [
                        '#3b82f6',
                        '#10b981',
                        '#8b5cf6'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Auto-refresh functionality
function startAutoRefresh(interval = 30000) {
    setInterval(() => {
        // Simulate data refresh
        updateStatistics();
        showNotification('Data refreshed', 'info');
    }, interval);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    initializeCharts();
    
    // Start auto-refresh after 30 seconds
    setTimeout(() => {
        startAutoRefresh();
    }, 30000);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('search-tutors');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportData();
        }
    });
}); 