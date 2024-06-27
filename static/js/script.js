document.addEventListener('DOMContentLoaded', function () {
    const readMoreButtons = document.querySelectorAll('.read-more');
    const specialCardModal = document.getElementById('specialCardModal');
    const specialCardName = document.getElementById('specialCardName');
    const specialCardDetails = document.getElementById('specialCardDetails');
    const specialCardImage = document.getElementById('specialCardImage');
    const specialCardText = document.getElementById('specialCardText');
    const closeSpecialCardModal = document.getElementById('closeSpecialCardModal');

    // JavaScript to toggle mobile menu
    document.getElementById('burgerMenu').addEventListener('click', function () {
        document.getElementById('mobileMenu').classList.toggle('hidden');
    });

    // Check window width on resize
    window.addEventListener('resize', function () {
        // If window width is greater than or equal to md breakpoint (768px in TailwindCSS)
        if (window.innerWidth >= 768) {
            // Ensure mobile menu is hidden
            document.getElementById('mobileMenu').classList.add('hidden');
        }
    });

    readMoreButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const cardData = JSON.parse(this.getAttribute('data-card'));
            console.log("hi")
            specialCardName.textContent = cardData.name;
            specialCardText.textContent = cardData.details;
            specialCardImage.src = "https://t4.ftcdn.net/jpg/05/88/02/09/360_F_588020909_dPO6ZSbe5k3pQ8MZqut4drZWpiOM6Kbz.jpg"

            // Send an Ajax request to the backend to fetch the image source
            fetch(`/get_image_source/${modalId}`)
                .then(response => response.json())
                .then(data => {
                    specialCardImage.src = data.imageSource;
                    console.log(data.imageSource);
                })
                .catch(error => console.error('Error fetching image source:', error));

            specialCardModal.classList.remove('hidden');
        });
    });

    closeSpecialCardModal.addEventListener('click', function () {
        specialCardModal.classList.add('hidden');
    });
});
