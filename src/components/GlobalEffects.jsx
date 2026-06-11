"use client";
import { useEffect } from 'react';

export default function GlobalEffects() {
  useEffect(() => {
    // 1. Mouse tracking for CSS variables
    const handleMouseMove = (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    document.addEventListener('mousemove', handleMouseMove);

    // 2. Book hover glare logic
    const handleMouseOver = (e) => {
        const bookCover = e.target.closest('.book-cover');
        const bookShowcase = e.target.closest('.book-showcase');
        
        if (bookShowcase && bookCover) {
            const moveHandler = (moveEvent) => {
                const rect = bookShowcase.getBoundingClientRect();
                const x = moveEvent.clientX - rect.left;
                const y = moveEvent.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 18;
                
                const glareX = (x / rect.width) * 100;
                
                bookCover.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                bookCover.style.setProperty('--glare-x', `${glareX}%`);
            };
            
            const leaveHandler = () => {
                bookCover.style.transform = `rotateY(-8deg) rotateX(2deg)`;
                bookCover.style.setProperty('--glare-x', `100%`);
                bookShowcase.removeEventListener('mousemove', moveHandler);
                bookShowcase.removeEventListener('mouseleave', leaveHandler);
            };
            
            bookShowcase.addEventListener('mousemove', moveHandler);
            bookShowcase.addEventListener('mouseleave', leaveHandler);
        }
    };
    document.addEventListener('mouseover', handleMouseOver);

    // 3. Smooth Scroll Progress Bar & Parallax Orbs
    const handleScroll = () => {
      const bar = document.getElementById('scroll-progress');
      if (bar) {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          bar.style.width = progress + '%';
      }
      
      const scrollY = window.scrollY;
      document.querySelectorAll('.orb').forEach((orb, i) => {
        const speed = (i + 1) * 0.03;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);

    // 5. Intersection Observer for Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    // 7. Smooth Counter Animation
    function animateCounters() {
      const counters = document.querySelectorAll('.stat-num');
      counters.forEach(counter => {
        const target = counter.textContent;
        const match = target.match(/(\d+)/);
        if (!match) return;
        
        const num = parseInt(match[1]);
        const suffix = target.replace(match[0], '');
        const prefix = target.substring(0, target.indexOf(match[0]));
        
        let current = 0;
        const duration = 1500;
        const step = Math.max(1, Math.floor(num / (duration / 16)));
        
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          counter.textContent = prefix + String(current).padStart(2, '0') + suffix;
          if (current >= num) {
            counter.textContent = target;
            clearInterval(timer);
          }
        }, 16);
      });
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    // Re-bind observers periodically
    const bindDynamicElements = () => {
      document.querySelectorAll('.reveal:not(.observed)').forEach((el, i) => {
        el.dataset.revealDelay = (i % 5) * 100; // Stagger
        el.classList.add('observed');
        revealObserver.observe(el);
      });
      
      document.querySelectorAll('.btn-primary:not(.bound)').forEach(btn => {
        btn.classList.add('bound');
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });

      const statsBar = document.querySelector('.stats-bar:not(.observed)');
      if (statsBar) {
          statsBar.classList.add('observed');
          statsObserver.observe(statsBar);
      }
    };
    
    bindDynamicElements();
    
    const mutationObserver = new MutationObserver(() => {
        bindDynamicElements();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('scroll', handleScroll);
        mutationObserver.disconnect();
    };
  }, []);

  return null;
}
