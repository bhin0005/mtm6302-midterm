window.addEventListener("load", e => {
    // get elements by ids
    const chooseStory = document.getElementById("choose-story");
    const inputStory = document.getElementById("input-words");
    const container = document.getElementById("stories");
    const form = document.getElementById("form");
    const readStory = document.getElementById("read-story");
    const newStory = document.getElementById("createStoryBtn");
    const myStory = document.getElementById("my-story");

    const words = {};

    // populate the titles from the stories
    displayAllStoriesByTitle(container);
    // get the child nodes of the container
    const children = container.children;
    let id;
    // add event to the child nodes
    for (const div of children) {
        div.addEventListener("click", e => {
            // get the element id
            id = div.id;
            showInputsForGivenStory(chooseStory, inputStory, id, form);
        });
    }

    // submit form
    form.addEventListener("submit", e => {
        e.preventDefault();

        const formInputs = form.children;
        // get input value from each input field
        for (const input of formInputs) {
            words[`${input.name}`] = input.value;
        }

        showFormedStory(inputStory, readStory, id, words);
    });

    newStory.addEventListener("click", e => {
        myStory.innerHTML = "";
        readStory.classList.remove("show");
        readStory.classList.add("hide");
        inputStory.classList.remove("show");
        inputStory.classList.add("hide");
        chooseStory.classList.remove("hide");
        chooseStory.classList.add("show");
    });
});

/**
 * Fetches all the stories and creates div elements to display the stories
 * @param container
 */
function displayAllStoriesByTitle(container) {
    let index = 0;
    for (const story of stories) {
        let div = document.createElement("div");
        let h3 = document.createElement("h3");
        // set attributes
        div.setAttribute("class", "story");
        div.setAttribute("id", index);
        div.appendChild(h3);
        h3.innerHTML = story.title;

        container.appendChild(div);

        index += 1;
    }
}

/**
 * Retrieve the words from the story where the index == id passed
 * @param id
 */
function showInputsForGivenStory(container, inputStory, id, form) {
    const story = stories[id];
    const words = story.words;
    // hide the choose story div / show inputs div
    container.classList.add("hide");
    container.classList.remove("show");
    inputStory.classList.remove("hide");
    inputStory.classList.add("show");

    // create the input fields
    for (const wd of words) {
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", wd);
        input.setAttribute("name", wd);
        input.setAttribute("required", "required");
        form.appendChild(input);
    }

    let btn = document.createElement("button");
    btn.setAttribute("type", "submit");
    btn.setAttribute("class", "btn");
    btn.innerHTML = "Sumit";

    form.appendChild(btn);
}

function showFormedStory(inputStory, readStory, id, words) {
    const myStory = document.getElementById("my-story");
    // hide the inputs div
    form.innerHTML = "";
    inputStory.classList.add("hide");
    inputStory.classList.remove("show");
    readStory.classList.remove("hide");

    const title = stories[id].title;
    const p = stories[id].output(words);
    // create a h3
    const h3 = document.createElement("h3");
    h3.innerHTML = title;
    // create a paragraph containing the story
    const par = document.createElement("p");
    par.innerHTML = p;

    console.log(words);
    // append to div
    myStory.appendChild(h3);
    myStory.appendChild(par);
}