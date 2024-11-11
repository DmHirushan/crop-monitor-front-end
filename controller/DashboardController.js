document.querySelectorAll('.nav-icon-list li').forEach(item => {
    item.addEventListener('click', function() {
        const page = this.getAttribute('data-page'); // Get the page from data-page attribute
        document.getElementById('content-frame').src = page; // Set iframe src to load the page
    });
});
