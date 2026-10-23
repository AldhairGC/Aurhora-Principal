/** Inline script for <head>: applies the stored theme before the first paint (no flash). */
export const THEME_SCRIPT = `try{var t=localStorage.getItem("aurhora-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;
