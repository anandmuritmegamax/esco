// Toast Notification System
function showToast(type, title, description = '') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconSVG = type === 'success' 
        ? '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
        : '<svg class="toast-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    
    toast.innerHTML = `
        ${iconSVG}
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            ${description ? `<div class="toast-desc">${description}</div>` : ''}
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Tab Navigation
const tabTriggers = document.querySelectorAll('.tab-trigger');
const tabContents = document.querySelectorAll('.tab-content');

tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const targetTab = trigger.dataset.tab;
        
        // Remove active class from all triggers and contents
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked trigger and corresponding content
        trigger.classList.add('active');
        document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
});

// Password Toggle Visibility
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const targetId = toggle.dataset.target;
        const input = document.getElementById(targetId);
        const eyeIcon = toggle.querySelector('.eye-icon');
        const eyeOffIcon = toggle.querySelector('.eye-off-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            eyeIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
        } else {
            input.type = 'password';
            eyeIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
        }
    });
});

// Profile Form Submission
const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    
    // Update display values
    document.getElementById('user-full-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('user-email').textContent = email;
    document.getElementById('user-phone').textContent = phone;
    document.getElementById('user-location').textContent = `${city}, ${state}`;
    
    showToast('success', 'Profile updated successfully!', 'Your changes have been saved.');
});

// Password Form Submission
const passwordForm = document.getElementById('password-form');
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('error', 'All fields are required!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showToast('error', 'New passwords do not match!');
        return;
    }
    
    if (newPassword.length < 8) {
        showToast('error', 'Password must be at least 8 characters long!');
        return;
    }
    
    // Success
    showToast('success', 'Password changed successfully!', 'Your account is now more secure.');
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
});

// Preferences Form Submission
const preferencesForm = document.getElementById('preferences-form');
preferencesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('success', 'Preferences saved!', 'Your account preferences have been updated.');
});

// Save Notifications
const saveNotificationsBtn = document.getElementById('save-notifications');
saveNotificationsBtn.addEventListener('click', () => {
    showToast('success', 'Notification preferences saved!', 'Your notification settings have been updated.');
});

// Notification Switches State (optional - for demonstration)
const notificationSwitches = document.querySelectorAll('[data-notification]');
notificationSwitches.forEach(switchInput => {
    switchInput.addEventListener('change', (e) => {
        const notificationType = e.target.dataset.notification;
        const isEnabled = e.target.checked;
        console.log(`${notificationType} notifications ${isEnabled ? 'enabled' : 'disabled'}`);
    });
});

// Camera button click handler
const cameraButton = document.querySelector('.camera-button');
cameraButton.addEventListener('click', () => {
    showToast('success', 'Feature coming soon!', 'Profile picture upload will be available soon.');
});

// Enable 2FA button
const enable2FAButtons = document.querySelectorAll('.btn-green');
enable2FAButtons.forEach(btn => {
    if (btn.textContent.includes('Enable 2FA')) {
        btn.addEventListener('click', () => {
            showToast('success', 'Two-Factor Authentication', 'This feature will be available soon.');
        });
    }
});

// Delete Account button
const deleteAccountBtn = document.querySelector('.btn-danger');
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            showToast('error', 'Account deletion is disabled in demo mode');
        }
    });
}

// Cancel button handler
const cancelButtons = document.querySelectorAll('.btn-secondary');
cancelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset form to original values
        const form = btn.closest('form');
        if (form) {
            form.reset();
            showToast('success', 'Changes discarded');
        }
    });
});

// Initialize: Show welcome toast on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        showToast('success', 'Welcome back!', 'Manage your profile and account settings.');
    }, 500);
});
