(function(){

  const Status = Object.freeze({
    INTERESTED: 0,
    APPLIED: 1,
    INTERVIEWING: 2,
    REJECTED: 3,
    OFFERED: 4
  });


  let myDataExample1 = {
    Job: "Software Engineer",
    Company: "Google",
    Location: "Mountain View, CA",
    Status: 4,
    DateApplied: "2024-09-22",
    Tags: [
      {
        Content: "Top Choice",
        Color: "purple"
      },
      {
        Content: "Extra Planning Required",
        Color: "Orange"
      }
    ],
    Notes: ["Note 1", "Note 2", "Note 3"],
    Resume: "../files/StephenEnder2025.pdf"
  }

  let myDataExample2 = {
    Job: "Application Developer",
    Company: "St. Luke's University Health Network",
    Location: "Allentown, PA",
    Status: 2,
    DateApplied: "2024-10-02",
    Tags: [
      {
        Content: "Need to Research",
        Color: "Red"
      }
    ],
    Notes: ["Note 1", "Note 2", "Note 3"],
    Resume: "../files/StephenEnder2025.pdf"
  }

  let myDataExample3 = {
    Job: "Application Developer",
    Company: "St. Luke's University Health Network",
    Location: "Allentown, PA",
    Status: 1,
    DateApplied: "2024-10-02",
    Tags: [
      {
        Content: "Need to Research",
        Color: "Red"
      }
    ],
    Notes: ["Note 1", "Note 2", "Note 3"],
    Resume: "../files/StephenEnder2025.pdf"
  }

  let myApplications = [myDataExample1, myDataExample2, myDataExample3];

  // Get clone set up for template work
  const mainSection = document.querySelector('main');
  const template = document.getElementById('job-card-template');
  myApplications.forEach(application => {
    const clone = template.content.cloneNode(true);

    // Start filling out fields based on user data
    let jobTitleH3 = document.createElement('h3');
    jobTitleH3.textContent = application.Job;
    clone.getElementById('job-title-box').append(jobTitleH3);
    let dateP = document.createElement('p');
    dateP.textContent = application.DateApplied;
    clone.getElementById('job-info-box').append(dateP); // TODO: Write helper function to make date pretty
    let companyP = document.createElement('p');
    companyP.textContent = application.Company;
    let locationP = document.createElement('p');
    locationP.textContent = application.Location;
    clone.getElementById('job-info-subbox').append(companyP);
    clone.getElementById('job-info-subbox').append(locationP);

    let notes = application.Notes;
    notes.forEach(note => {
      let noteLi = document.createElement('li');
      noteLi.textContent = note;
      clone.getElementById('notes-box-ul').append(noteLi);
    });

    let tags = application.Tags;
    tags.forEach(tag => {
      let tagContent = tag.Content;
      let tagColor = tag.Color;
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
    switch (application.Status) {
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

    mainSection.append(clone);
  });

  // Button for new Application Button
  let button = document.createElement('a');
  button.classList.add('new-app-button');
  button.textContent = 'Add New Application';
  button.setAttribute('data-bs-toggle', 'modal');
  button.setAttribute('data-bs-target', '#addApplicationModal');
  mainSection.append(button);

}());