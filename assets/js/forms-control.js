

selectFormOptionsControl();
formSubmissionControl();

function selectFormOptionsControl() {
    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        const nativeSelect = wrapper.querySelector('.native-select');
        const customDisplay = wrapper.querySelector('.custom-select-display');
        const customList = wrapper.querySelector('.custom-options-list');
        const customOptions = wrapper.querySelectorAll('.custom-options-list li');

        // Initial setup
        customDisplay.textContent = nativeSelect.options[nativeSelect.selectedIndex].text;

        // --- 1. Toggle Dropdown ---
        customDisplay.addEventListener('click', () => {
            const isOpen = customList.classList.toggle('open');
            customDisplay.classList.toggle('open', isOpen);
            customDisplay.setAttribute('aria-expanded', isOpen);
        });

        // --- 2. Select Option and Sync ---
        customOptions.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                const text = option.textContent;

                // Sync the native select value
                nativeSelect.value = value;

                // Update the visible display text
                customDisplay.textContent = text;

                // Close and update accessibility state
                customList.classList.remove('open');
                customDisplay.classList.remove('open');
                customDisplay.setAttribute('aria-expanded', 'false');

                // Update selected classes
                customOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Trigger change event on native select for frameworks/listeners
                nativeSelect.dispatchEvent(new Event('change'));
            });
        });

        // --- 3. Close on Outside Click ---
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                customList.classList.remove('open');
                customDisplay.classList.remove('open');
                customDisplay.setAttribute('aria-expanded', 'false');
            }
        });

        // --- 4. Keyboard Navigation (Essential for Accessibility) ---
        customDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                // Opens or focuses the first item
                customList.classList.add('open');
                customDisplay.classList.add('open');
                customDisplay.setAttribute('aria-expanded', 'true');
                if (customOptions.length > 0) {
                    customOptions[0].focus();
                }
            }
        });

        // Add more keyboard logic for customOptions (e.g., Tab, ArrowDown/Up)
    });
}
// Select form options Control





/* ---------------------------------------------------- */
/* 3. Form Submission Controls  */
/* ---------------------------------------------------- */
function formSubmissionControl() {
    const form = document.getElementById('form');
    const formAlertMessage = document.getElementById('form-alert-meassage');

    if (form) {
        form.addEventListener('submit', function (event) {
            // prevent browser's submission which causes a page reload
            event.preventDefault();

            if (!form.checkValidity()) {
                formAlertMessage.textContent = "Please Fill All Required Fields";
                formAlertMessage.className = 'message-area error';
                formAlertMessage.style.display = 'block';
                return;
            }
            const formRequiredData = {
                mobile: document.getElementById('mobile').value,
                location: document.getElementById('location').value,
                service: form.querySelector('input[name="serviceType"]:checked')?.value || 'Service Not Selected',
                details: document.getElementById('description').value,
            };
            console.log("Form Required Data:", formRequiredData);
            form.reset();
            formAlertMessage.textContent = "Thank You! Your Quotation Request Has been Sent. We Will Contact You Shortly.";
            formAlertMessage.className = 'message-area success';
            formAlertMessage.style.display = 'block';

            // Hide the Success Message After awhile
            setTimeout(() => {
                formAlertMessage.style.display = 'none';
            }, 7000);
        });
    }

}



