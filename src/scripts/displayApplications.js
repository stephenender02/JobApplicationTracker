class Job {
  title;
  company;
  location;
  status;
  date;
  tags = [];
  notes = [];
  resumeFile;

  constructor(title, company, location, status, date) {
    this.title = title;
    this.company = company;
    this.location = location;
    this.status = parseInt(status);
    this.date = date;
  }
  
  addTag(tag) {
    this.tags.push(tag);
  }

  addNote(note) {
    this.notes.push(note);
  }
  
}

class Tag {
  constructor(content, color) {
    this.content = content;
    this.color = color;
  }
}

(function(){
  const Status = Object.freeze({
    INTERESTED: 0,
    APPLIED: 1,
    INTERVIEWING: 2,
    REJECTED: 3,
    OFFERED: 4
  });

  const mainSection = document.querySelector('main');
  let myApplications = JSON.parse(localStorage.getItem('jobs'));
  if (!myApplications || myApplications.length == 0) {
    let tip = document.createElement('h3');
    tip.textContent = 'It looks like you haven\'t created any jobs to track yet. Try adding one now!';
    mainSection.append(tip);
    myApplications = [];
  }

  // Get clone set up for template work
  const template = document.getElementById('job-card-template');
  myApplications.forEach((application, index) => {
    const clone = template.content.cloneNode(true);

    // Start filling out fields based on user data
    let jobTitleH3 = document.createElement('h3');
    jobTitleH3.textContent = application.title;
    clone.getElementById('job-title-box').append(jobTitleH3);
    let dateP = document.createElement('p');
    dateP.textContent = application.date;
    clone.getElementById('job-info-box').append(dateP); // TODO: Write helper function to make date pretty
    let companyP = document.createElement('p');
    companyP.textContent = application.company;
    let locationP = document.createElement('p');
    locationP.textContent = application.location;
    clone.getElementById('job-info-subbox').append(companyP);
    clone.getElementById('job-info-subbox').append(locationP);

    let notes = application.notes;
    notes.forEach(note => {
      let noteLi = document.createElement('li');
      noteLi.textContent = note;
      clone.getElementById('notes-box-ul').append(noteLi);
    });

    let tags = application.tags;
    tags.forEach(tag => {
      let tagContent = tag.content;
      let tagColor = tag.color;
      let tagP = document.createElement('p');
      tagP.textContent = tagContent;
      if(CSS.supports('color', tagColor)) {
        tagP.style = `background-color: ${tagColor}; color: white; border-color: ${tagColor};`
      } else {
        console.log(`CSS doesn't know ${tagColor}`);
      }
      clone.getElementById('tags-subbox').append(tagP);
    });

    let mainInfoCard = clone.getElementById('main-info');
    let subInfoCard = clone.getElementById('sub-info');
    switch (application.status) {
      case Status.INTERESTED:
        mainInfoCard.classList.add('interested-card');
        subInfoCard.classList.add('interested-info');
        break;
      case Status.APPLIED:
        mainInfoCard.classList.add('applied-card');
        subInfoCard.classList.add('applied-info');
        break;
      case Status.INTERVIEWING:
        mainInfoCard.classList.add('interviewing-card');
        subInfoCard.classList.add('interviewing-info');
        break;
      case Status.REJECTED:
        mainInfoCard.classList.add('rejected-card');
        subInfoCard.classList.add('rejected-info');
        break;
      case Status.OFFERED:
        mainInfoCard.classList.add('offered-card');
        subInfoCard.classList.add('offered-info');
        break;
      default:
        break;
    }
    let deleteButton = clone.getElementById('delete-job-button');
    deleteButton.addEventListener('click', () => {
      myApplications.splice(index, 1);
      localStorage.setItem('jobs', JSON.stringify(myApplications));
      window.location.reload();
    });
    mainSection.append(clone);
  });


  // Button for new Application Button
  let button = document.createElement('a');
  button.classList.add('new-app-button');
  button.textContent = 'Add New Application';
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#addApplicationModal');
  mainSection.append(button);

  // Handle New Application Form tags
  let tagDiv = document.getElementById('tags-section');
  let newTagButton = document.getElementById('new-tag-button');
  let tagCounter = 1;
  // New tag is added
  newTagButton.addEventListener('click', (event) => {
    event.preventDefault();
    tagCounter++;
    let newTagField = document.createElement('input');
    newTagField.setAttribute('type', 'text');
    newTagField.setAttribute('name', 'tags');
    newTagField.setAttribute('id', `tag${tagCounter}`);
    let newTagColor = document.createElement('input');
    newTagColor.setAttribute('type', 'color');
    newTagColor.setAttribute('name', 'tags-color');
    newTagColor.setAttribute('id', `tag-color${tagCounter}`);
    let newTagDelete = document.createElement('button');
    newTagDelete.textContent = '-';
    // New tag is removed
    newTagDelete.addEventListener('click', (deleteEvent) => {
      deleteEvent.preventDefault;
      newTagField.remove();
      newTagColor.remove();
      newTagDelete.remove();
    });
    tagDiv.append(newTagField);
    tagDiv.append(newTagColor);
    tagDiv.append(newTagDelete);
  });

  // Handle New Application Form Notes
  let notesDiv = document.getElementById('notes-section');
  let newNoteButton = document.getElementById('new-note-button');
  let noteCounter = 1;
  // New note is added
  newNoteButton.addEventListener('click', (event) => {
    event.preventDefault();
    noteCounter++;
    let newNoteField = document.createElement('input');
    newNoteField.setAttribute('type', 'text');
    newNoteField.setAttribute('name', 'notes');
    newNoteField.setAttribute('id', `note${noteCounter}`);
    let newNoteDelete = document.createElement('button');
    newNoteDelete.textContent = '-';
    // New note is removed
    newNoteDelete.addEventListener('click', (deleteEvent) => {
      deleteEvent.preventDefault;
      newNoteField.remove();
      newNoteDelete.remove();
    });
    notesDiv.append(newNoteField);
    notesDiv.append(newNoteDelete);
  });

  // Get data from New Application Form and add it to local storage
  const newAppSaveBttn = document.getElementById('new-application-save-button');
  newAppSaveBttn.addEventListener('click',(event) => {
    event.preventDefault();

    // Get info from fields
    let title = document.getElementById('title').value;
    let company = document.getElementById('company').value;
    let location = document.getElementById('location').value;
    let status = document.querySelector('input[name="status"]:checked').value;
    let date = document.getElementById('date').value;
    const newJob = new Job(title, company, location, status, date);

    let hasTags = document.getElementById('tag1').value;
    if(hasTags) {
      for(let i = 1; i < tagCounter + 1; i++) {
        let currentTagContent = document.getElementById(`tag${i}`).value;
        let currentTagColor = document.getElementById(`tag-color${i}`).value;
        let newTag = new Tag(currentTagContent, currentTagColor);
        newJob.addTag(newTag);
      }
    }
    let hasNotes = document.getElementById('note1').value;
    if(hasNotes) {
      for(let i = 1; i < noteCounter + 1; i++) {
        let currentNote = document.getElementById(`note${i}`).value;
        newJob.addNote(currentNote);
      }
    }

    // Add and save job to local storage
    let data = localStorage.getItem('jobs');
    if(!data) {
      localStorage.setItem('jobs', JSON.stringify(new Array()));
      data = localStorage.getItem('jobs');
    }
    let parsedData = JSON.parse(data);
    parsedData.push(newJob);
    localStorage.setItem('jobs', JSON.stringify(parsedData));
    window.location.reload();
  });

}());