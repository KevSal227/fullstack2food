// grabbing the icons from the boilerplate by their class
const thumbUp = document.getElementsByClassName('fa-thumbs-up')
const thumbDown = document.getElementsByClassName('fa-thumbs-down')
const trash = document.getElementsByClassName('fa-trash')

// thumbs up
Array.from(thumbUp).forEach(function(element) {
  element.addEventListener('click', function() {
    console.log('thumb up clicked, id is', this.dataset.id)
    fetch('messages/thumbUp', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.dataset.id })
    })
    .then(() => window.location.reload(true))
  })
})

// thumbs down
Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function() {
    console.log('thumb down clicked, id is', this.dataset.id)
    fetch('messages/thumbDown', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.dataset.id })
    })
    .then(() => window.location.reload(true))
  })
})

// click trash to delete
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    console.log('trash clicked, id is', this.dataset.id)
    fetch('messages', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: this.dataset.id })
    })
    .then(() => window.location.reload())
  })
})







