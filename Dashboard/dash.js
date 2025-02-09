let title =document.querySelector('#title');
let description = document.querySelector('#description');
let publishBtn = document.querySelector('.publish')

publishBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (!title.value ||!description.value) {
        alert('Please fill in all fields');
        return;
    }

    console.log(title.value, description.value);
    description.value = ''
    title.value = ''

})
