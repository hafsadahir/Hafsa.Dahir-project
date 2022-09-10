db.collection("events").onSnapshot(snapshot => {
    // Handle the latest event
    const newestEvent = snapshot.docChanges()[0].doc.data()
    const id = snapshot.docChanges()[0].doc.id
    showLatestEvent(newestEvent, id)
  
    // delete the latest event element
    snapshot.docChanges().shift()
  
    snapshot.docChanges().forEach(event => {
      showEvents(event.doc.data(), event.doc.id)
    })
  })


  const addNewEvent = () => {
    const event = {
      name: form.name.value,
      attendee: form.attendee.value,
      booked: 0,
      description: form.description.value,
      status: parseInt(form.status.value, 10),
    }
    db.collection("events")
      .add(event)
      .then(() => {
        // Reset the form values
        ;(form.name.value = ""),
          (form.attendee.value = ""),
          (form.description.value = ""),
          (form.status.value = "")
  
        alert("Your event has been successfully saved")
      })
      .catch(err => console.log(err))
  }