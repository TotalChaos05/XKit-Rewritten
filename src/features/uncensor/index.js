import { getPreferences } from '../../utils/preferences.js';


const config = { attributes: true, childList: true, subtree: true };


const replaceCensors = (mutationList, observer) => {
    const censoredAvatars = document.getElementsByClassName('lRcb3');
    for (let avatar of censoredAvatars) {
	const blogUrl = avatar.closest(".BSUG4").getAttribute('href');
	const img = document.createElement('img');
	img.src = `https://api.tumblr.com/v2/blog${blogUrl}/avatar`;
	img.alt = "Avatar";
	avatar.parentNode.appendChild(img);
	img.width = avatar.parentNode.clientWidth;
	avatar.remove();
    };


};
const observer = new MutationObserver(replaceCensors);
export const main = async function () {
    const { hiddenAvatars } = await getPreferences('uncensor');
    replaceCensors();
    observer.observe(document.documentElement, config);


};




export const clean = async function () {
    observer.disconnect();

};
