$(document).ready(function() {
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('#hamburger').click(function() {
        $(this).toggleClass('active');
        $('#nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').click(function() {
        $('#hamburger').removeClass('active');
        $('#nav-menu').removeClass('active');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'swing');
        }
    });

    // Active navigation link on scroll
    $(window).scroll(function() {
        let scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            let currLink = $(this);
            let refElement = $(currLink.attr('href'));
            
            if (refElement.length && 
                refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            } else {
                currLink.removeClass('active');
            }
        });
    });

    // Animated counter for stats - Completely rewritten for reliability
    function animateCounters() {
        console.log('Starting counter animation...');
        
        // Animate each stat number
        $('.stat-number').each(function(index) {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'));
            console.log('Animating counter:', index, 'Target:', target);
            
            let current = 0;
            const step = target / 40; // 40 steps for smooth animation
            
            const timer = setInterval(function() {
                current += step;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format based on target value
                if (target === 17) {
                    // Cost reduction - show as range
                    const value = Math.floor(current);
                    $this.text(value + '-' + (value + 5));
                } else {
                    // Regular numbers
                    $this.text(Math.floor(current));
                }
            }, 50); // Update every 50ms (total 2 seconds)
        });
    }

    // Start animation when document is ready
    let hasAnimated = false;
    
    // Trigger animation on page load
    $(window).on('load', function() {
        console.log('Page loaded, starting animation...');
        setTimeout(function() {
            if (!hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        }, 800);
    });
    
    // Also try to animate after DOM is ready (backup)
    setTimeout(function() {
        if (!hasAnimated) {
            console.log('DOM ready, starting animation...');
            animateCounters();
            hasAnimated = true;
        }
    }, 1000);

    // Scroll animations for sections
    function checkVisibility() {
        $('.product-card, .advantage-card, .target-card, .timeline-item, .showcase-image, .about-img').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

    $(window).scroll(checkVisibility);
    checkVisibility(); // Check on page load

    // Product showcase animation
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + $(window).height();
        const showcaseSection = $('.product-showcase').offset();
        
        if (showcaseSection && scrollPos > showcaseSection.top + 100) {
            $('.showcase-text').css({
                'opacity': '1',
                'transform': 'translateX(0)'
            });
            $('.showcase-image').css({
                'opacity': '1',
                'transform': 'translateX(0)'
            });
        }
    });

    // Set initial state for showcase
    $('.showcase-text').css({
        'opacity': '0',
        'transform': 'translateX(-50px)',
        'transition': 'all 0.8s ease'
    });

    $('.showcase-image').css({
        'opacity': '0',
        'transform': 'translateX(50px)',
        'transition': 'all 0.8s ease 0.3s'
    });

    // Product image hover effect
    $('.product-image-container').hover(
        function() {
            $(this).css('box-shadow', '0 15px 40px rgba(0, 102, 255, 0.5)');
        },
        function() {
            $(this).css('box-shadow', 'none');
        }
    );

    // Back to top button
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $('#back-to-top').addClass('show');
        } else {
            $('#back-to-top').removeClass('show');
        }
    });

    $('#back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
        return false;
    });

    // Contact form submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        // Basic validation
        if (name && email && subject && message) {
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Please fill in all fields.', 'error');
        }
    });

    // Notification function
    function showNotification(message, type) {
        const notification = $('<div class="notification"></div>')
            .addClass(type)
            .text(message);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.addClass('show');
        }, 100);
        
        setTimeout(function() {
            notification.removeClass('show');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification styles dynamically
    $('head').append(`
        <style>
            .notification {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background: #1a1f3a;
                color: white;
                padding: 1rem 2rem;
                border-radius: 50px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
                font-weight: 500;
                border: 2px solid #0066ff;
            }
            .notification.success {
                border-color: #00d4ff;
            }
            .notification.error {
                border-color: #ff4444;
            }
            .notification.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        </style>
    `);

    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });

    // Product card hover effects with jQuery
    $('.product-card').hover(
        function() {
            $(this).find('.product-icon').css('transform', 'scale(1.1) rotate(5deg)');
        },
        function() {
            $(this).find('.product-icon').css('transform', 'scale(1) rotate(0deg)');
        }
    );

    // Advantage card sequential animation
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + $(window).height();
        const advantageSection = $('.advantages-grid').offset();
        
        if (advantageSection && scrollPos > advantageSection.top) {
            $('.advantage-card').each(function(index) {
                const card = $(this);
                setTimeout(function() {
                    card.css({
                        'opacity': '1',
                        'transform': 'translateY(0)'
                    });
                }, index * 100);
            });
        }
    });

    // Set initial state for advantage cards
    $('.advantage-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.5s ease'
    });

    // Timeline animation
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + $(window).height();
        
        $('.timeline-item').each(function(index) {
            const itemPos = $(this).offset().top;
            
            if (scrollPos > itemPos + 100) {
                const item = $(this);
                setTimeout(function() {
                    item.css({
                        'opacity': '1',
                        'transform': 'translateX(0)'
                    });
                }, index * 150);
            }
        });
    });

    // Set initial state for timeline items
    $('.timeline-item:nth-child(odd)').css({
        'opacity': '0',
        'transform': 'translateX(-50px)',
        'transition': 'all 0.6s ease'
    });

    $('.timeline-item:nth-child(even)').css({
        'opacity': '0',
        'transform': 'translateX(50px)',
        'transition': 'all 0.6s ease'
    });

    // Form input animations
    $('.form-group input, .form-group textarea').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });

    // Add ripple effect to buttons
    $('.btn').click(function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');
        
        button.append(ripple);
        
        const x = e.pageX - button.offset().left;
        const y = e.pageY - button.offset().top;
        
        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });
        
        ripple.addClass('animate');
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Add ripple effect styles
    $('head').append(`
        <style>
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                pointer-events: none;
            }
            .ripple.animate {
                animation: rippleEffect 0.6s ease-out;
            }
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        </style>
    `);

    // Typing effect for hero subtitle (optional - can be enabled)
    function typeWriter(element, text, speed) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Lazy load images (if images are added later)
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            const img = $(this);
            const scrollPos = $(window).scrollTop() + $(window).height();
            const imgPos = img.offset().top;
            
            if (scrollPos > imgPos) {
                img.attr('src', img.attr('data-src'));
                img.removeAttr('data-src');
            }
        });
    }

    $(window).scroll(lazyLoadImages);

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Interactive hover effect for social links
    $('.social-links a').hover(
        function() {
            $(this).css('box-shadow', '0 10px 25px rgba(0, 102, 255, 0.4)');
        },
        function() {
            $(this).css('box-shadow', 'none');
        }
    );

    // Product specs reveal animation
    $('.product-card').hover(
        function() {
            $(this).find('.product-specs').slideDown(300);
        },
        function() {
            // Keep specs visible on hover
        }
    );

    // Pricing card animations
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + $(window).height();
        const pricingSection = $('.pricing-grid').offset();
        
        if (pricingSection && scrollPos > pricingSection.top) {
            $('.pricing-card').each(function(index) {
                const card = $(this);
                setTimeout(function() {
                    card.addClass('animate-in');
                }, index * 150);
            });
        }
    });

    // Add initial state for pricing cards
    $('.pricing-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });

    // Add animate-in class styles
    $('head').append(`
        <style>
            .pricing-card.animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.6s ease;
            }
            .pricing-card.featured.animate-in {
                transform: scale(1.05) !important;
            }
        </style>
    `);

    // Price counter animation
    function animatePrices() {
        $('.price .amount').each(function() {
            const $this = $(this);
            const finalValue = $this.text().replace(/,/g, '');
            const target = parseInt(finalValue);
            const duration = 1500;
            const increment = target / (duration / 30);
            let current = 0;

            const counter = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                $this.text(Math.floor(current).toLocaleString());
            }, 30);
        });
    }

    // Trigger price animation when pricing section is visible
    let priceAnimated = false;
    $(window).scroll(function() {
        if (!priceAnimated) {
            const pricingOffset = $('.pricing').offset();
            if (pricingOffset) {
                const scrollPos = $(window).scrollTop() + $(window).height();
                
                if (scrollPos > pricingOffset.top + 200) {
                    animatePrices();
                    priceAnimated = true;
                }
            }
        }
    });

    // Bulk pricing hover effect
    $('.bulk-pricing').hover(
        function() {
            $(this).css('box-shadow', '0 20px 60px rgba(0, 102, 255, 0.3)');
        },
        function() {
            $(this).css('box-shadow', 'none');
        }
    );

    // Comparison table row highlight
    $('.comparison-table tbody tr').hover(
        function() {
            $(this).css('background', 'rgba(0, 102, 255, 0.08)');
        },
        function() {
            $(this).css('background', '');
        }
    );

    // Pricing card icon rotation on hover
    $('.pricing-card').hover(
        function() {
            $(this).find('.pricing-icon').css({
                'transform': 'rotate(5deg) scale(1.1)',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).find('.pricing-icon').css({
                'transform': 'rotate(0deg) scale(1)',
                'transition': 'all 0.3s ease'
            });
        }
    );

    // Request quote button interactions
    $('.pricing-card .btn').click(function(e) {
        const productName = $(this).closest('.pricing-card').find('h3').text();
        const price = $(this).closest('.pricing-card').find('.amount').text();
        
        // Scroll to contact form
        $('html, body').animate({
            scrollTop: $('#contact').offset().top - 80
        }, 1000);
        
        // Pre-fill subject line if form is visible
        setTimeout(function() {
            $('#subject').val('Quote Request: ' + productName + ' - EGP ' + price);
            $('#subject').focus();
        }, 1000);
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    $(document).keydown(function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) konamiCode.shift();
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            showNotification('Q.core One: Unlocking the future! 🚀', 'success');
            $('body').addClass('party-mode');
            setTimeout(function() {
                $('body').removeClass('party-mode');
            }, 5000);
        }
    });

    // Console message
    console.log('%c Quantix Silicon ', 'background: linear-gradient(135deg, #0066ff 0%, #00d4ff 100%); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
    console.log('%c Powering Egypt\'s Digital Future 🇪🇬 ', 'color: #00d4ff; font-size: 14px;');
    console.log('Interested in joining our team? Contact us at info@quantixsilicon.com');

});

// Initialize AOS (Animate On Scroll) alternative with jQuery
(function() {
    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('aos-animate');
                }
            });
        }, {
            threshold: 0.1
        });

        $('.product-card, .advantage-card, .target-card, .about-content, .timeline-item').each(function() {
            observer.observe(this);
        });
    }

    if (window.IntersectionObserver) {
        observeElements();
    }

    // Add AOS styles
    $('head').append(`
        <style>
            .aos-animate {
                animation: fadeInUp 0.8s ease-out;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `);
})();
