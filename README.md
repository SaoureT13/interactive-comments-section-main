# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./design/desktop-preview.jpg)

### Links

- Solution URL: <https://github.com/SaoureT13/interactive-comments-section-main>
- Live Site URL: <https://saouret13.github.io/interactive-comments-section-main/>

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Styled Components](https://styled-components.com/) - For styles

### What I learned
In this project, I learned to use efficiency react,  useContext hook combined with useRecuder hook. I also learned to use useLocalStorage Hook from react-use to handle the localStorage piece.

To see how you can add code snippets, see below:

```useLocalStorage to create usePersistReducer custom hook
const usePersistReducer = () => {
    const [savedState, setSavedState] = useLocalStorage(
        LOCAL_STORAGE_KEY,
        data.comments
    );

    const reducerLocalStorage = useCallback(
        (state, action) => {
            const newState = reducer(state, action);

            setSavedState(newState);

            return newState;
        },
        [setSavedState]
    );

    return useReducer(reducerLocalStorage, savedState);
};
```

### Useful resources

- [https://www.benmvp.com/blog/sync-localstorage-react-usereducer-hook/] - This helped me for sync to localStorage with useReducer Hook. I really liked this pattern and will use it going forward.
- [https://savvywombat.com.au/tailwind-css/grid-areas] - This is an amazing article which helped me finally understand tailwind patterns in grid areas. I'd recommend it to anyone still learning this concept.

## Author

- Frontend Mentor - [@SaoureT13](https://www.frontendmentor.io/profile/SaoureT13)
- Github - [@SaoureT13](https://github.com/SaoureT13)